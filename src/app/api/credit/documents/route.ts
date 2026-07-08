import { createAdminClient } from "@/lib/supabase/admin";
import { writeAuditLog } from "@/lib/credit-repair/audit";
import { jsonError, jsonOk, isSupabaseConfigured } from "@/lib/credit-repair/api";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return jsonError("Supabase is not configured", 503);
  }

  const body = await request.json();
  const { client_id, document_type, file_name } = body;

  if (!client_id || !document_type || !file_name) {
    return jsonError("client_id, document_type, and file_name are required");
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("client_documents")
    .insert({
      client_id,
      document_type,
      file_name,
      file_url: body.file_url ?? null,
      uploaded_by: body.uploaded_by ?? "client",
    })
    .select()
    .single();

  if (error) return jsonError(error.message, 500);

  await writeAuditLog({
    clientId: client_id,
    entityType: "client_document",
    entityId: data.id,
    action: "document_uploaded",
    actor: body.uploaded_by ?? "client",
    metadata: { document_type, file_name },
  });

  return jsonOk(data, 201);
}
