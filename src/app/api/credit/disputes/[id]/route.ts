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
    "status",
    "round_number",
    "reason",
    "method",
    "sent_at",
    "response_due_at",
    "resolved_at",
    "notes",
  ] as const;

  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) updates[key] = body[key];
  }

  if (Object.keys(updates).length === 0) {
    return jsonError("No valid fields to update");
  }

  const { data, error } = await supabase
    .from("disputes")
    .update(updates)
    .eq("id", id)
    .select("*, negative_item:negative_items(*)")
    .single();

  if (error) return jsonError(error.message, 500);

  if (updates.status === "removed") {
    await supabase
      .from("negative_items")
      .update({ status: "removed" })
      .eq("id", data.negative_item_id);
  }

  if (updates.status === "verified") {
    await supabase
      .from("negative_items")
      .update({ status: "verified" })
      .eq("id", data.negative_item_id);
  }

  await writeAuditLog({
    clientId: data.client_id,
    entityType: "dispute",
    entityId: data.id,
    action: "dispute_updated",
    actor: body.actor ?? "admin",
    metadata: updates,
  });

  return jsonOk(data);
}
