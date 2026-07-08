import { createAdminClient } from "@/lib/supabase/admin";
import { writeAuditLog } from "@/lib/credit-repair/audit";
import { jsonError, jsonOk, isSupabaseConfigured } from "@/lib/credit-repair/api";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return jsonError("Supabase is not configured", 503);
  }

  const body = await request.json();
  const { client_id, signature_name } = body;

  if (!client_id || !signature_name) {
    return jsonError("client_id and signature_name are required");
  }

  const supabase = createAdminClient();

  const { data: existing } = await supabase
    .from("consent_forms")
    .select("*")
    .eq("client_id", client_id)
    .eq("form_type", body.form_type ?? "credit_repair_authorization")
    .eq("status", "pending")
    .maybeSingle();

  let data;
  let error;

  if (existing) {
    ({ data, error } = await supabase
      .from("consent_forms")
      .update({
        signed_at: new Date().toISOString(),
        signature_name,
        ip_address: body.ip_address ?? null,
        status: "signed",
      })
      .eq("id", existing.id)
      .select()
      .single());
  } else {
    ({ data, error } = await supabase
      .from("consent_forms")
      .insert({
        client_id,
        form_type: body.form_type ?? "credit_repair_authorization",
        signed_at: new Date().toISOString(),
        signature_name,
        ip_address: body.ip_address ?? null,
        document_url: body.document_url ?? null,
        status: "signed",
      })
      .select()
      .single());
  }

  if (error) return jsonError(error.message, 500);

  await writeAuditLog({
    clientId: client_id,
    entityType: "consent_form",
    entityId: data.id,
    action: "consent_signed",
    actor: body.actor ?? "client",
    metadata: { form_type: data.form_type, signature_name },
  });

  return jsonOk(data, existing ? 200 : 201);
}
