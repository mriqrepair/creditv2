import type { Client } from "@/lib/credit-repair/types";

export async function fetchClients(): Promise<Client[]> {
  const res = await fetch("/api/credit/clients");
  const json = await res.json();
  if (!json.ok) throw new Error(json.error ?? "Failed to load clients");
  return json.data;
}

export async function fetchClientDetail(id: string) {
  const res = await fetch(`/api/credit/clients/${id}`);
  const json = await res.json();
  if (!json.ok) throw new Error(json.error ?? "Failed to load client");
  return json.data;
}

export async function apiPost<T>(url: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error ?? "Request failed");
  return json.data as T;
}

export async function apiPatch<T>(url: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error ?? "Request failed");
  return json.data as T;
}
