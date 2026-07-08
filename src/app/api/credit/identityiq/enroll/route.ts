import { createAdminClient } from "@/lib/supabase/admin";
import { writeAuditLog } from "@/lib/credit-repair/audit";
import {
  getIdentityIQEnrollmentUrl,
  getIdentityIQMode,
} from "@/lib/integrations/identityiq/client";
import { jsonError, jsonOk, isSupabaseConfigured } from "@/lib/credit-repair/api";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return jsonError("Supabase is not configured", 503);
  }

  const body = await request.json();
  const { client_id } = body;

  if (!client_id) {
    return jsonError("client_id is required");
  }

  const supabase = createAdminClient();
  const enrollmentUrl = getIdentityIQEnrollmentUrl(client_id);
  const mode = getIdentityIQMode();

  const { data, error } = await supabase
    .from("identityiq_enrollments")
    .upsert(
      {
        client_id,
        status: "pending",
        member_reference: client_id,
        enrollment_url: enrollmentUrl,
        metadata: { mode, initiated_from: body.source ?? "onboarding" },
      },
      { onConflict: "client_id" }
    )
    .select()
    .single();

  if (error) return jsonError(error.message, 500);

  await writeAuditLog({
    clientId: client_id,
    entityType: "identityiq_enrollment",
    entityId: data.id,
    action: "identityiq_enrollment_started",
    actor: body.actor ?? "client",
    metadata: { mode, enrollmentUrl },
  });

  return jsonOk(
    {
      enrollment: data,
      enrollmentUrl,
      mode,
    },
    201
  );
}

export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return jsonError("Supabase is not configured", 503);
  }

  const clientId = new URL(request.url).searchParams.get("clientId");
  if (!clientId) return jsonError("clientId query param is required");

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("identityiq_enrollments")
    .select("*")
    .eq("client_id", clientId)
    .maybeSingle();

  if (error) return jsonError(error.message, 500);

  return jsonOk({
    enrollment: data,
    mode: getIdentityIQMode(),
    enrollmentUrl: data?.enrollment_url ?? getIdentityIQEnrollmentUrl(clientId),
  });
}
