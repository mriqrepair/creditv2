"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutDashboard, RefreshCw, UserCog, Users } from "lucide-react";
import { ActionButton } from "@/components/ui/ActionButton";
import { Card } from "@/components/ui/Card";
import { ClientIntakeForm } from "./ClientIntakeForm";
import { ClientList } from "./ClientList";
import { ClientCreditProfile } from "./ClientCreditProfile";
import { ConsentFormCard } from "./ConsentFormCard";
import { DocumentUploadCard } from "./DocumentUploadCard";
import { NegativeItemsTable } from "./NegativeItemsTable";
import { DisputePipeline } from "./DisputePipeline";
import { DisputeLetterGenerator } from "./DisputeLetterGenerator";
import {
  fetchClientDetail,
  fetchClients,
} from "@/lib/credit-repair/client-api";
import type { Client, ClientDetail } from "@/lib/credit-repair/types";

type ViewMode = "admin" | "client";

export function CreditRepairDashboard() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>("admin");
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showIntake, setShowIntake] = useState(false);

  const loadClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchClients();
      setClients(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load clients");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadClientDetail = useCallback(async (id: string) => {
    setError(null);
    try {
      const data = await fetchClientDetail(id);
      setSelectedClient(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load client");
    }
  }, []);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  useEffect(() => {
    const clientId = searchParams.get("clientId");
    if (!clientId) return;

    setViewMode("client");
    loadClientDetail(clientId);
  }, [searchParams, loadClientDetail]);

  async function handleSelectClient(client: Client) {
    await loadClientDetail(client.id);
    setShowIntake(false);
  }

  async function handleClientCreated(client: Client) {
    await loadClients();
    await loadClientDetail(client.id);
    setShowIntake(false);
  }

  async function refreshSelected() {
    if (selectedClient) {
      await loadClientDetail(selectedClient.id);
      await loadClients();
    }
  }

  const isClientView = viewMode === "client";
  const readOnly = isClientView;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">
            Credit Repair OS
          </p>
          <h1 className="text-2xl font-bold text-navy sm:text-3xl">
            Workflow Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manual simulator — intake, consent, reports, disputes, and letters.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ActionButton
            size="sm"
            variant={viewMode === "admin" ? "primary" : "outline"}
            onClick={() => setViewMode("admin")}
          >
            <UserCog className="h-4 w-4" />
            Admin
          </ActionButton>
          <ActionButton
            size="sm"
            variant={viewMode === "client" ? "primary" : "outline"}
            onClick={() => setViewMode("client")}
          >
            <Users className="h-4 w-4" />
            Client View
          </ActionButton>
          <ActionButton size="sm" variant="outline" onClick={loadClients}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </ActionButton>
          {!isClientView && (
            <ActionButton size="sm" onClick={() => setShowIntake((v) => !v)}>
              <LayoutDashboard className="h-4 w-4" />
              {showIntake ? "Hide Intake" : "New Client"}
            </ActionButton>
          )}
        </div>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <p className="text-sm text-red-700">{error}</p>
          {error.includes("Supabase") && (
            <p className="mt-2 text-xs text-red-600">
              Add Supabase env vars and run <code>supabase/schema.sql</code> to
              enable the workflow.
            </p>
          )}
        </Card>
      )}

      {loading ? (
        <p className="text-sm text-muted">Loading clients...</p>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
          <ClientList
            clients={clients}
            selectedId={selectedClient?.id ?? null}
            onSelect={handleSelectClient}
          />

          <div className="space-y-6">
            {!isClientView && showIntake && (
              <ClientIntakeForm onCreated={handleClientCreated} />
            )}

            {selectedClient ? (
              <>
                <ClientCreditProfile client={selectedClient} viewMode={viewMode} />

                <ConsentFormCard
                  clientId={selectedClient.id}
                  consentForms={selectedClient.consent_forms}
                  onSigned={refreshSelected}
                  readOnly={readOnly}
                />

                <DocumentUploadCard
                  clientId={selectedClient.id}
                  documents={selectedClient.client_documents}
                  creditReports={selectedClient.credit_reports}
                  onUploaded={refreshSelected}
                  readOnly={readOnly}
                />

                {!readOnly && (
                  <>
                    <NegativeItemsTable
                      clientId={selectedClient.id}
                      items={selectedClient.negative_items}
                      onChange={refreshSelected}
                    />

                    <DisputePipeline
                      clientId={selectedClient.id}
                      disputes={selectedClient.disputes}
                      negativeItems={selectedClient.negative_items}
                      onChange={refreshSelected}
                    />

                    <DisputeLetterGenerator
                      clientId={selectedClient.id}
                      disputes={selectedClient.disputes}
                      letters={selectedClient.dispute_letters}
                      onChange={refreshSelected}
                    />
                  </>
                )}

                {readOnly && (
                  <>
                    <NegativeItemsTable
                      clientId={selectedClient.id}
                      items={selectedClient.negative_items}
                      onChange={refreshSelected}
                      readOnly
                    />
                    <DisputePipeline
                      clientId={selectedClient.id}
                      disputes={selectedClient.disputes}
                      negativeItems={selectedClient.negative_items}
                      onChange={refreshSelected}
                      readOnly
                    />
                    <DisputeLetterGenerator
                      clientId={selectedClient.id}
                      disputes={selectedClient.disputes}
                      letters={selectedClient.dispute_letters}
                      onChange={refreshSelected}
                      readOnly
                    />
                  </>
                )}

                {selectedClient.audit_logs.length > 0 && (
                  <Card title="Recent Activity" description="Audit trail for major actions.">
                    <ul className="max-h-64 space-y-2 overflow-y-auto text-sm">
                      {selectedClient.audit_logs.map((log) => (
                        <li
                          key={log.id}
                          className="rounded-lg border border-border bg-surface px-3 py-2"
                        >
                          <span className="font-medium text-navy">{log.action}</span>
                          <span className="text-muted">
                            {" "}
                            · {log.entity_type} · {log.actor}
                          </span>
                          <p className="text-xs text-muted">
                            {new Date(log.created_at).toLocaleString()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
              </>
            ) : (
              <Card>
                <p className="text-sm text-muted">
                  Select a client from the list to manage their credit repair workflow.
                </p>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
