import { createAdminClient } from "@/lib/supabase/admin";
import { writeAuditLog } from "@/lib/credit-repair/audit";
import { jsonError, jsonOk, isSupabaseConfigured } from "@/lib/credit-repair/api";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  if (!isSupabaseConfigured()) {
    return jsonError("Supabase is not configured", 503);
  }

  const { id } = await context.params;
  const body = await request.json();
  const supabase = createAdminClient();

  const allowed = [
    "creditor_name",
    "account_number",
    "bureau",
    "item_type",
    "status",
    "balance",
    "date_opened",
    "date_of_last_activity",
    "notes",
    "credit_report_id",
  ] as const;

  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) updates[key] = body[key];
  }

  if (Object.keys(updates).length === 0) {
    return jsonError("No valid fields to update");
  }

  const { data, error } = await supabase
    .from("negative_items")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return jsonError(error.message, 500);

  await writeAuditLog({
    clientId: data.client_id,
    entityType: "negative_item",
    entityId: data.id,
    action: "negative_item_updated",
    actor: body.actor ?? "admin",
    metadata: updates,
  });

  return jsonOk(data);
}
