import { createAdminClient } from "@/lib/supabase/admin";
import { writeAuditLog } from "@/lib/credit-repair/audit";
import { jsonError, jsonOk, isSupabaseConfigured } from "@/lib/credit-repair/api";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return jsonError("Supabase is not configured", 503);
  }

  const body = await request.json();
  const { client_id, creditor_name, bureau } = body;

  if (!client_id || !creditor_name || !bureau) {
    return jsonError("client_id, creditor_name, and bureau are required");
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("negative_items")
    .insert({
      client_id,
      credit_report_id: body.credit_report_id ?? null,
      creditor_name,
      bureau,
      account_number: body.account_number ?? null,
      item_type: body.item_type ?? "other",
      status: body.status ?? "identified",
      balance: body.balance ?? null,
      date_opened: body.date_opened ?? null,
      date_of_last_activity: body.date_of_last_activity ?? null,
      notes: body.notes ?? null,
    })
    .select()
    .single();

  if (error) return jsonError(error.message, 500);

  await writeAuditLog({
    clientId: client_id,
    entityType: "negative_item",
    entityId: data.id,
    action: "negative_item_added",
    actor: "admin",
    metadata: { creditor_name, bureau },
  });

  return jsonOk(data, 201);
}
