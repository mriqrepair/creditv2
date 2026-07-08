"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Select, Textarea } from "@/components/ui/Input";
import { ActionButton } from "@/components/ui/ActionButton";
import { LETTER_TEMPLATES } from "@/lib/credit-repair/constants";
import { apiPost } from "@/lib/credit-repair/client-api";
import type { Dispute, DisputeLetter } from "@/lib/credit-repair/types";

type Props = {
  clientId: string;
  disputes: Dispute[];
  letters: DisputeLetter[];
  onChange: () => void;
  readOnly?: boolean;
};

export function DisputeLetterGenerator({
  clientId,
  disputes,
  letters,
  onChange,
  readOnly,
}: Props) {
  const [disputeId, setDisputeId] = useState("");
  const [templateType, setTemplateType] = useState("initial_dispute");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeDisputes = disputes.filter(
    (d) => !["removed", "verified"].includes(d.status)
  );

  async function generateLetter(markSent = false) {
    if (!disputeId) return;
    setLoading(true);
    setError(null);
    try {
      const letter = await apiPost<DisputeLetter>("/api/credit/dispute-letters", {
        client_id: clientId,
        dispute_id: disputeId,
        template_type: templateType,
        content: content || undefined,
        sent_at: markSent ? new Date().toISOString() : undefined,
      });
      setContent(letter.content);
      onChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate letter");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      title="Dispute Letter Generator"
      description="Generate letters from templates. No bureau APIs connected yet."
    >
      {!readOnly && (
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-navy">Dispute</label>
            <select
              value={disputeId}
              onChange={(e) => setDisputeId(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm"
            >
              <option value="">Select dispute...</option>
              {activeDisputes.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.negative_item?.creditor_name ?? d.id.slice(0, 8)} ({d.status})
                </option>
              ))}
            </select>
          </div>
          <Select
            label="Template"
            value={templateType}
            onChange={(e) => setTemplateType(e.target.value)}
            options={LETTER_TEMPLATES.map((t) => ({
              value: t.value,
              label: t.label,
            }))}
          />
          <Textarea
            label="Letter Content (optional override)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="sm:col-span-2 font-mono text-xs"
          />
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <ActionButton
              size="sm"
              onClick={() => generateLetter(false)}
              disabled={loading || !disputeId}
            >
              Generate Draft
            </ActionButton>
            <ActionButton
              size="sm"
              variant="secondary"
              onClick={() => generateLetter(true)}
              disabled={loading || !disputeId}
            >
              Generate & Mark Sent
            </ActionButton>
          </div>
        </div>
      )}

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      <div className="space-y-3">
        {letters.length === 0 ? (
          <p className="text-sm text-muted">No letters generated yet.</p>
        ) : (
          letters.map((letter) => (
            <div
              key={letter.id}
              className="rounded-xl border border-border bg-surface p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-navy">
                  {LETTER_TEMPLATES.find((t) => t.value === letter.template_type)?.label ??
                    letter.template_type}
                </p>
                <p className="text-xs text-muted">
                  {new Date(letter.generated_at).toLocaleString()}
                  {letter.sent_at ? " · Sent" : " · Draft"}
                </p>
              </div>
              <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap text-xs text-foreground/80">
                {letter.content}
              </pre>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
