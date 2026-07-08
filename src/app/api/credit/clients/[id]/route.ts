import { createAdminClient } from "@/lib/supabase/admin";
import { jsonError, jsonOk, isSupabaseConfigured } from "@/lib/credit-repair/api";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  if (!isSupabaseConfigured()) {
    return jsonError("Supabase is not configured", 503);
  }

  const { id } = await context.params;
  const supabase = createAdminClient();

  const { data: client, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return jsonError(error.message, error.code === "PGRST116" ? 404 : 500);

  const [
    credit_reports,
    negative_items,
    disputes,
    dispute_letters,
    client_documents,
    consent_forms,
    audit_logs,
  ] = await Promise.all([
    supabase.from("credit_reports").select("*").eq("client_id", id).order("uploaded_at", { ascending: false }),
    supabase.from("negative_items").select("*").eq("client_id", id).order("created_at", { ascending: false }),
    supabase.from("disputes").select("*, negative_item:negative_items(*)").eq("client_id", id).order("created_at", { ascending: false }),
    supabase.from("dispute_letters").select("*").eq("client_id", id).order("generated_at", { ascending: false }),
    supabase.from("client_documents").select("*").eq("client_id", id).order("uploaded_at", { ascending: false }),
    supabase.from("consent_forms").select("*").eq("client_id", id).order("created_at", { ascending: false }),
    supabase.from("audit_logs").select("*").eq("client_id", id).order("created_at", { ascending: false }).limit(50),
  ]);

  return jsonOk({
    ...client,
    credit_reports: credit_reports.data ?? [],
    negative_items: negative_items.data ?? [],
    disputes: disputes.data ?? [],
    dispute_letters: dispute_letters.data ?? [],
    client_documents: client_documents.data ?? [],
    consent_forms: consent_forms.data ?? [],
    audit_logs: audit_logs.data ?? [],
  });
}
