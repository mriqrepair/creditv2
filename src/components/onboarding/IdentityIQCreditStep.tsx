"use client";

import { useState } from "react";
import { ExternalLink, Gauge, RefreshCw } from "lucide-react";
import { ActionButton } from "@/components/ui/ActionButton";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { apiPost } from "@/lib/credit-repair/client-api";
import type { IdentityIQCreditSummary } from "@/lib/integrations/identityiq/types";
import { cn } from "@/lib/utils";

type Props = {
  clientId: string;
  onComplete: (summary: IdentityIQCreditSummary) => void;
  onBack: () => void;
};

const ratingColors = {
  poor: "bg-red-100 text-red-700",
  fair: "bg-amber-100 text-amber-700",
  good: "bg-blue-100 text-blue-700",
  excellent: "bg-green-100 text-green-700",
};

export function IdentityIQCreditStep({ clientId, onComplete, onBack }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enrollmentUrl, setEnrollmentUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<string>("simulator");
  const [summary, setSummary] = useState<IdentityIQCreditSummary | null>(null);
  const [importedCount, setImportedCount] = useState(0);

  async function startEnrollment() {
    setLoading(true);
    setError(null);
    try {
      const data = await apiPost<{
        enrollmentUrl: string;
        mode: string;
      }>("/api/credit/identityiq/enroll", {
        client_id: clientId,
        source: "onboarding",
      });
      setEnrollmentUrl(data.enrollmentUrl);
      setMode(data.mode);
      window.open(data.enrollmentUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Enrollment failed");
    } finally {
      setLoading(false);
    }
  }

  async function pullCreditProfile() {
    setLoading(true);
    setError(null);
    try {
      const data = await apiPost<{
        summary: IdentityIQCreditSummary;
        mode: string;
        importedNegativeItemIds: string[];
      }>("/api/credit/identityiq/pull", {
        client_id: clientId,
        actor: "onboarding",
      });
      setSummary(data.summary);
      setMode(data.mode);
      setImportedCount(data.importedNegativeItemIds.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Credit pull failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      title="Credit Profile via IdentityIQ"
      description="Pull 3-bureau scores and import negative items into your repair workflow."
    >
      <div className="rounded-xl border border-border bg-surface p-4 text-sm text-foreground/80">
        <p>
          IdentityIQ provides Experian, Equifax, and TransUnion monitoring. This step
          enrolls you and imports your credit profile into {`MR. IQ's`} dispute pipeline.
        </p>
        <p className="mt-2 text-xs text-muted">
          Mode: <span className="font-medium text-navy">{mode}</span>
          {mode === "simulator" &&
            " — using simulated data until live IdentityIQ partner API credentials are configured."}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <ActionButton
          variant="outline"
          size="sm"
          onClick={startEnrollment}
          disabled={loading}
        >
          <ExternalLink className="h-4 w-4" />
          Enroll on IdentityIQ
        </ActionButton>
        <ActionButton size="sm" onClick={pullCreditProfile} disabled={loading}>
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Pulling...
            </>
          ) : (
            <>
              <Gauge className="h-4 w-4" />
              Pull Credit Profile
            </>
          )}
        </ActionButton>
      </div>

      {enrollmentUrl && (
        <p className="mt-3 text-xs text-muted">
          Enrollment opened in a new tab.{" "}
          <a
            href={enrollmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-orange hover:underline"
          >
            Re-open IdentityIQ
          </a>
        </p>
      )}

      {summary && (
        <div className="mt-6 space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {summary.scores.map((score) => (
              <div
                key={score.bureau}
                className="rounded-xl border border-border bg-white p-4 text-center"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  {score.bureau}
                </p>
                <p className="mt-1 text-3xl font-bold text-navy">{score.score}</p>
                <Badge className={cn("mt-2", ratingColors[score.rating])}>
                  {score.rating}
                </Badge>
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Avg Score", value: summary.averageScore },
              { label: "Open Accounts", value: summary.openAccounts },
              { label: "Hard Inquiries", value: summary.hardInquiries },
              { label: "Negative Items", value: summary.negativeAccounts },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-surface px-4 py-3"
              >
                <p className="text-xs text-muted">{stat.label}</p>
                <p className="text-lg font-bold text-navy">{stat.value}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted">
            Imported {importedCount} negative item{importedCount === 1 ? "" : "s"} into
            your credit repair file.
          </p>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <div className="mt-6 flex flex-wrap gap-3">
        <ActionButton type="button" variant="outline" onClick={onBack}>
          Back
        </ActionButton>
        <ActionButton
          onClick={() => summary && onComplete(summary)}
          disabled={!summary}
        >
          Continue
        </ActionButton>
      </div>
    </Card>
  );
}
