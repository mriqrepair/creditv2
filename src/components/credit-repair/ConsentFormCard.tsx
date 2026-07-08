"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ActionButton } from "@/components/ui/ActionButton";
import { Badge } from "@/components/ui/Badge";
import { apiPost } from "@/lib/credit-repair/client-api";
import type { ConsentForm } from "@/lib/credit-repair/types";

type Props = {
  clientId: string;
  consentForms: ConsentForm[];
  onSigned: () => void;
  readOnly?: boolean;
};

export function ConsentFormCard({ clientId, consentForms, onSigned, readOnly }: Props) {
  const [signatureName, setSignatureName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const latest = consentForms[0];
  const isSigned = consentForms.some((c) => c.status === "signed");

  async function handleSign() {
    if (!signatureName.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await apiPost("/api/credit/consent", {
        client_id: clientId,
        signature_name: signatureName.trim(),
        form_type: "credit_repair_authorization",
      });
      setSignatureName("");
      onSigned();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign consent");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      title="Consent Form"
      description="Client authorizes credit repair services before disputes begin."
    >
      <div className="mb-4 rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-foreground/80">
        <p className="font-semibold text-navy">Credit Repair Authorization</p>
        <p className="mt-2">
          I authorize MR. IQ to review my credit reports, identify inaccurate
          information, and submit disputes on my behalf. I understand this is a
          manual workflow and no bureau APIs are connected at this time.
        </p>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm text-muted">Status:</span>
        <Badge
          className={
            isSigned
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }
        >
          {isSigned ? "Signed" : "Pending"}
        </Badge>
        {latest?.signed_at && (
          <span className="text-xs text-muted">
            {new Date(latest.signed_at).toLocaleString()}
            {latest.signature_name ? ` · ${latest.signature_name}` : ""}
          </span>
        )}
      </div>

      {!readOnly && !isSigned && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <Input
            label="Type full name to sign"
            value={signatureName}
            onChange={(e) => setSignatureName(e.target.value)}
            className="flex-1"
          />
          <ActionButton onClick={handleSign} disabled={loading || !signatureName.trim()}>
            {loading ? "Signing..." : "Sign Consent"}
          </ActionButton>
        </div>
      )}

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </Card>
  );
}
