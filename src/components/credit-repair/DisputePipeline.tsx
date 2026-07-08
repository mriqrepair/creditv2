"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Input";
import { ActionButton } from "@/components/ui/ActionButton";
import { Badge } from "@/components/ui/Badge";
import { DISPUTE_PIPELINE_ORDER, DISPUTE_STATUSES } from "@/lib/credit-repair/constants";
import { apiPatch, apiPost } from "@/lib/credit-repair/client-api";
import type { Dispute, NegativeItem } from "@/lib/credit-repair/types";
import { cn } from "@/lib/utils";

type Props = {
  clientId: string;
  disputes: Dispute[];
  negativeItems: NegativeItem[];
  onChange: () => void;
  readOnly?: boolean;
};

function statusMeta(status: string) {
  return DISPUTE_STATUSES.find((s) => s.value === status);
}

export function DisputePipeline({
  clientId,
  disputes,
  negativeItems,
  onChange,
  readOnly,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [reason, setReason] = useState("");

  async function createDispute() {
    if (!selectedItemId) return;
    setLoading(true);
    setError(null);
    try {
      await apiPost("/api/credit/disputes", {
        client_id: clientId,
        negative_item_id: selectedItemId,
        reason,
      });
      setSelectedItemId("");
      setReason("");
      onChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create dispute");
    } finally {
      setLoading(false);
    }
  }

  async function moveStatus(disputeId: string, status: string) {
    try {
      const payload: Record<string, unknown> = { status };
      if (status === "sent") payload.sent_at = new Date().toISOString();
      if (status === "removed" || status === "verified") {
        payload.resolved_at = new Date().toISOString();
      }
      await apiPatch(`/api/credit/disputes/${disputeId}`, payload);
      onChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update dispute");
    }
  }

  const disputesByStatus = DISPUTE_PIPELINE_ORDER.map((status) => ({
    status,
    items: disputes.filter((d) => d.status === status),
  }));

  const disputableItems = negativeItems.filter(
    (item) => !disputes.some((d) => d.negative_item_id === item.id && !["removed", "verified"].includes(d.status))
  );

  return (
    <Card
      title="Dispute Pipeline"
      description="Track disputes from draft through bureau response."
    >
      {!readOnly && (
        <div className="mb-4 rounded-xl border border-border bg-surface p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-navy">Negative Item</label>
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm"
              >
                <option value="">Select item...</option>
                {disputableItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.creditor_name} ({item.bureau})
                  </option>
                ))}
              </select>
            </div>
            <Textarea
              label="Dispute Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={2}
            />
          </div>
          <ActionButton
            className="mt-3"
            size="sm"
            onClick={createDispute}
            disabled={loading || !selectedItemId}
          >
            Create Dispute
          </ActionButton>
        </div>
      )}

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
        {disputesByStatus.map(({ status, items }) => {
          const meta = statusMeta(status);
          return (
            <div
              key={status}
              className="rounded-xl border border-border bg-surface/50 p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <Badge className={meta?.color}>{meta?.label ?? status}</Badge>
                <span className="text-xs text-muted">{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.length === 0 ? (
                  <p className="text-xs text-muted">No disputes</p>
                ) : (
                  items.map((dispute) => {
                    const item = dispute.negative_item;
                    return (
                      <div
                        key={dispute.id}
                        className="rounded-lg border border-border bg-white p-3 text-sm"
                      >
                        <p className="font-medium text-navy">
                          {item?.creditor_name ?? "Unknown creditor"}
                        </p>
                        <p className="text-xs text-muted">
                          Round {dispute.round_number} · {item?.bureau}
                        </p>
                        {!readOnly && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {DISPUTE_PIPELINE_ORDER.filter((s) => s !== status).map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => moveStatus(dispute.id, s)}
                                className={cn(
                                  "rounded-full border border-border px-2 py-0.5 text-[10px] hover:bg-surface"
                                )}
                              >
                                → {statusMeta(s)?.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
