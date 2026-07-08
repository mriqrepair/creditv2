"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { ClientDetail } from "@/lib/credit-repair/types";

type Props = {
  client: ClientDetail;
  viewMode?: "admin" | "client";
};

export function ClientCreditProfile({ client, viewMode = "admin" }: Props) {
  const latestReport = client.credit_reports[0];
  const signedConsent = client.consent_forms.some((c) => c.status === "signed");
  const openDisputes = client.disputes.filter(
    (d) => !["removed", "verified"].includes(d.status)
  ).length;
  const removedItems = client.disputes.filter((d) => d.status === "removed").length;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <p className="text-xs font-medium uppercase tracking-wide text-muted">Client</p>
        <p className="mt-1 text-lg font-bold text-navy">
          {client.first_name} {client.last_name}
        </p>
        <p className="text-sm text-muted">{client.email}</p>
        {viewMode === "admin" && client.phone && (
          <p className="text-sm text-muted">{client.phone}</p>
        )}
      </Card>

      <Card>
        <p className="text-xs font-medium uppercase tracking-wide text-muted">Consent</p>
        <div className="mt-2">
          <Badge
            className={
              signedConsent
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }
          >
            {signedConsent ? "Signed" : "Pending"}
          </Badge>
        </div>
      </Card>

      <Card>
        <p className="text-xs font-medium uppercase tracking-wide text-muted">Credit Report</p>
        <p className="mt-1 text-lg font-bold text-navy">
          {latestReport ? latestReport.bureau : "Not uploaded"}
        </p>
        {latestReport && (
          <p className="text-sm text-muted">
            Status: {latestReport.status.replace("_", " ")}
          </p>
        )}
      </Card>

      <Card>
        <p className="text-xs font-medium uppercase tracking-wide text-muted">Dispute Progress</p>
        <p className="mt-1 text-lg font-bold text-navy">
          {openDisputes} open · {removedItems} removed
        </p>
        <p className="text-sm text-muted">
          {client.negative_items.length} negative items tracked
        </p>
      </Card>
    </div>
  );
}
