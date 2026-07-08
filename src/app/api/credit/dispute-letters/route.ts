import { createAdminClient } from "@/lib/supabase/admin";
import { writeAuditLog } from "@/lib/credit-repair/audit";
import { generateLetterContent } from "@/lib/credit-repair/letter-templates";
import { jsonError, jsonOk, isSupabaseConfigured } from "@/lib/credit-repair/api";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return jsonError("Supabase is not configured", 503);
  }

  const body = await request.json();
  const { dispute_id, client_id, template_type } = body;

  if (!dispute_id || !client_id || !template_type) {
    return jsonError("dispute_id, client_id, and template_type are required");
  }

  const supabase = createAdminClient();

  const [{ data: client, error: clientError }, { data: dispute, error: disputeError }] =
    await Promise.all([
      supabase.from("clients").select("*").eq("id", client_id).single(),
      supabase
        .from("disputes")
        .select("*, negative_item:negative_items(*)")
        .eq("id", dispute_id)
        .single(),
    ]);

  if (clientError || !client) return jsonError(clientError?.message ?? "Client not found", 404);
  if (disputeError || !dispute) return jsonError(disputeError?.message ?? "Dispute not found", 404);

  const negativeItem = dispute.negative_item;
  if (!negativeItem) return jsonError("Negative item not found for dispute", 404);

  const content =
    body.content ??
    generateLetterContent(template_type, {
      client,
      negativeItem,
      dispute,
      today: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    });

  const { data, error } = await supabase
    .from("dispute_letters")
    .insert({
      dispute_id,
      client_id,
      template_type,
      content,
      delivery_method: body.delivery_method ?? "mail",
      sent_at: body.sent_at ?? null,
    })
    .select()
    .single();

  if (error) return jsonError(error.message, 500);

  await supabase
    .from("disputes")
    .update({ status: body.sent_at ? "sent" : "drafted" })
    .eq("id", dispute_id);

  await writeAuditLog({
    clientId: client_id,
    entityType: "dispute_letter",
    entityId: data.id,
    action: "dispute_letter_generated",
    actor: body.actor ?? "admin",
    metadata: { template_type, dispute_id },
  });

  return jsonOk(data, 201);
}
