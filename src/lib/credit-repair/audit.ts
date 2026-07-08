import { createAdminClient } from "@/lib/supabase/admin";

type AuditInput = {
  clientId?: string | null;
  entityType: string;
  entityId?: string | null;
  action: string;
  actor?: string;
  metadata?: Record<string, unknown>;
};

export async function writeAuditLog(input: AuditInput) {
  const supabase = createAdminClient();

  const { error } = await supabase.from("audit_logs").insert({
    client_id: input.clientId ?? null,
    entity_type: input.entityType,
    entity_id: input.entityId ?? null,
    action: input.action,
    actor: input.actor ?? "admin",
    metadata: input.metadata ?? {},
  });

  if (error) {
    console.error("Audit log failed:", error.message);
  }
}
