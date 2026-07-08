import { createAdminClient } from "@/lib/supabase/admin";
import { writeAuditLog } from "@/lib/credit-repair/audit";
import { jsonError, jsonOk, isSupabaseConfigured } from "@/lib/credit-repair/api";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return jsonError("Supabase is not configured", 503);
  }

  const body = await request.json();
  const { entity_type, action } = body;

  if (!entity_type || !action) {
    return jsonError("entity_type and action are required");
  }

  await writeAuditLog({
    clientId: body.client_id ?? null,
    entityType: entity_type,
    entityId: body.entity_id ?? null,
    action,
    actor: body.actor ?? "admin",
    metadata: body.metadata ?? {},
  });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) return jsonError(error.message, 500);
  return jsonOk(data, 201);
}
