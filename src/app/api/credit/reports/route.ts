import { createAdminClient } from "@/lib/supabase/admin";
import { writeAuditLog } from "@/lib/credit-repair/audit";
import { jsonError, jsonOk, isSupabaseConfigured } from "@/lib/credit-repair/api";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return jsonError("Supabase is not configured", 503);
  }

  const body = await request.json();
  const { client_id, bureau } = body;

  if (!client_id || !bureau) {
    return jsonError("client_id and bureau are required");
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("credit_reports")
    .insert({
      client_id,
      bureau,
      file_url: body.file_url ?? null,
      file_name: body.file_name ?? null,
      uploaded_by: body.uploaded_by ?? "client",
      status: body.status ?? "pending_review",
      review_notes: body.review_notes ?? null,
      score_experian: body.score_experian ?? null,
      score_equifax: body.score_equifax ?? null,
      score_transunion: body.score_transunion ?? null,
    })
    .select()
    .single();

  if (error) return jsonError(error.message, 500);

  await writeAuditLog({
    clientId: client_id,
    entityType: "credit_report",
    entityId: data.id,
    action: "credit_report_uploaded",
    actor: body.uploaded_by ?? "client",
    metadata: { bureau, file_name: data.file_name },
  });

  return jsonOk(data, 201);
}
