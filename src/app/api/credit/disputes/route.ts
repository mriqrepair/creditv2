import { createAdminClient } from "@/lib/supabase/admin";
import { writeAuditLog } from "@/lib/credit-repair/audit";
import { jsonError, jsonOk, isSupabaseConfigured } from "@/lib/credit-repair/api";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return jsonError("Supabase is not configured", 503);
  }

  const body = await request.json();
  const { client_id, negative_item_id } = body;

  if (!client_id || !negative_item_id) {
    return jsonError("client_id and negative_item_id are required");
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("disputes")
    .insert({
      client_id,
      negative_item_id,
      status: body.status ?? "not_started",
      round_number: body.round_number ?? 1,
      reason: body.reason ?? null,
      method: body.method ?? "mail",
      notes: body.notes ?? null,
    })
    .select("*, negative_item:negative_items(*)")
    .single();

  if (error) return jsonError(error.message, 500);

  await supabase
    .from("negative_items")
    .update({ status: "disputing" })
    .eq("id", negative_item_id);

  await writeAuditLog({
    clientId: client_id,
    entityType: "dispute",
    entityId: data.id,
    action: "dispute_created",
    actor: body.actor ?? "admin",
    metadata: { negative_item_id, status: data.status },
  });

  return jsonOk(data, 201);
}
