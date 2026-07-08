import { createAdminClient } from "@/lib/supabase/admin";
import { writeAuditLog } from "@/lib/credit-repair/audit";
import { jsonError, jsonOk, isSupabaseConfigured } from "@/lib/credit-repair/api";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return jsonError("Supabase is not configured", 503);
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return jsonError(error.message, 500);
  return jsonOk(data);
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return jsonError("Supabase is not configured", 503);
  }

  const body = await request.json();
  const { first_name, last_name, email } = body;

  if (!first_name || !last_name || !email) {
    return jsonError("first_name, last_name, and email are required");
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("clients")
    .insert({
      first_name,
      last_name,
      email,
      phone: body.phone ?? null,
      date_of_birth: body.date_of_birth ?? null,
      ssn_last4: body.ssn_last4 ?? null,
      address_line1: body.address_line1 ?? null,
      address_line2: body.address_line2 ?? null,
      city: body.city ?? null,
      state: body.state ?? null,
      zip: body.zip ?? null,
      notes: body.notes ?? null,
      status: body.status ?? "active",
      created_by: body.created_by ?? "admin",
    })
    .select()
    .single();

  if (error) return jsonError(error.message, 500);

  await writeAuditLog({
    clientId: data.id,
    entityType: "client",
    entityId: data.id,
    action: "client_created",
    actor: body.created_by ?? "admin",
    metadata: { email: data.email },
  });

  return jsonOk(data, 201);
}
