import { createAdminClient } from "@/lib/supabase/admin";
import { writeAuditLog } from "@/lib/credit-repair/audit";
import {
  getIdentityIQEnrollmentUrl,
  getIdentityIQMode,
  pullIdentityIQCreditProfile,
} from "@/lib/integrations/identityiq/client";
import type { IdentityIQPullResult } from "@/lib/integrations/identityiq/types";
import { jsonError, jsonOk, isSupabaseConfigured } from "@/lib/credit-repair/api";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return jsonError("Supabase is not configured", 503);
  }

  const body = await request.json();
  const { client_id } = body;

  if (!client_id) {
    return jsonError("client_id is required");
  }

  const supabase = createAdminClient();

  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("*")
    .eq("id", client_id)
    .single();

  if (clientError || !client) {
    return jsonError(clientError?.message ?? "Client not found", 404);
  }

  try {
    const { summary, negativeItems } = await pullIdentityIQCreditProfile(client);

    const { data: report, error: reportError } = await supabase
      .from("credit_reports")
      .insert({
        client_id,
        bureau: "merged",
        file_name: `identityiq-pull-${new Date().toISOString().slice(0, 10)}.json`,
        file_url: `identityiq://${summary.source}`,
        uploaded_by: "identityiq",
        status: "reviewed",
        review_notes: `IdentityIQ ${summary.source} pull`,
        score_experian:
          summary.scores.find((s) => s.bureau === "experian")?.score ?? null,
        score_equifax:
          summary.scores.find((s) => s.bureau === "equifax")?.score ?? null,
        score_transunion:
          summary.scores.find((s) => s.bureau === "transunion")?.score ?? null,
      })
      .select()
      .single();

    if (reportError) return jsonError(reportError.message, 500);

    const importedNegativeItemIds: string[] = [];

    for (const item of negativeItems) {
      const { data: negative, error } = await supabase
        .from("negative_items")
        .insert({
          client_id,
          credit_report_id: report.id,
          creditor_name: item.creditor_name,
          account_number: item.account_number,
          bureau: item.bureau,
          item_type: item.item_type,
          status: "identified",
          balance: item.balance,
          notes: item.notes ?? "Imported from IdentityIQ",
        })
        .select("id")
        .single();

      if (error) return jsonError(error.message, 500);
      importedNegativeItemIds.push(negative.id);
    }

    const enrollmentUrl = getIdentityIQEnrollmentUrl(client_id);
    const mode = getIdentityIQMode();

    await supabase.from("identityiq_enrollments").upsert(
      {
        client_id,
        status: mode === "live" ? "active" : "enrolled",
        member_reference: client_id,
        enrollment_url: enrollmentUrl,
        enrolled_at: new Date().toISOString(),
        last_sync_at: new Date().toISOString(),
        last_summary: summary,
        metadata: { mode, negative_items_imported: importedNegativeItemIds.length },
      },
      { onConflict: "client_id" }
    );

    await writeAuditLog({
      clientId: client_id,
      entityType: "identityiq_pull",
      entityId: report.id,
      action: "identityiq_credit_pull",
      actor: body.actor ?? "onboarding",
      metadata: {
        mode,
        average_score: summary.averageScore,
        negative_items: importedNegativeItemIds.length,
      },
    });

    const result: IdentityIQPullResult = {
      summary,
      negativeItems,
      creditReportId: report.id,
      importedNegativeItemIds,
    };

    return jsonOk({ ...result, mode, enrollmentUrl }, 201);
  } catch (err) {
    return jsonError(
      err instanceof Error ? err.message : "IdentityIQ pull failed",
      500
    );
  }
}
