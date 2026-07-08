"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { ActionButton } from "@/components/ui/ActionButton";
import { Badge } from "@/components/ui/Badge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";
import { BUREAUS, NEGATIVE_ITEM_TYPES } from "@/lib/credit-repair/constants";
import { apiPatch, apiPost } from "@/lib/credit-repair/client-api";
import type { NegativeItem } from "@/lib/credit-repair/types";

type Props = {
  clientId: string;
  items: NegativeItem[];
  onChange: () => void;
  readOnly?: boolean;
};

export function NegativeItemsTable({ clientId, items, onChange, readOnly }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    creditor_name: "",
    account_number: "",
    bureau: "experian",
    item_type: "collection",
    notes: "",
  });

  async function handleAdd() {
    if (!form.creditor_name) return;
    setLoading(true);
    setError(null);
    try {
      await apiPost("/api/credit/negative-items", {
        client_id: clientId,
        ...form,
      });
      setForm({
        creditor_name: "",
        account_number: "",
        bureau: "experian",
        item_type: "collection",
        notes: "",
      });
      onChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add item");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      await apiPatch(`/api/credit/negative-items/${id}`, { status });
      onChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update item");
    }
  }

  return (
    <Card
      title="Negative Items"
      description="Admin reviews reports and manually adds items to dispute."
    >
      {!readOnly && (
        <div className="mb-4 grid gap-3 rounded-xl border border-border bg-surface p-4 sm:grid-cols-2">
          <Input
            label="Creditor Name"
            value={form.creditor_name}
            onChange={(e) => setForm({ ...form, creditor_name: e.target.value })}
          />
          <Input
            label="Account Number"
            value={form.account_number}
            onChange={(e) => setForm({ ...form, account_number: e.target.value })}
          />
          <Select
            label="Bureau"
            value={form.bureau}
            onChange={(e) => setForm({ ...form, bureau: e.target.value })}
            options={BUREAUS.filter((b) => b.value !== "merged").map((b) => ({
              value: b.value,
              label: b.label,
            }))}
          />
          <Select
            label="Item Type"
            value={form.item_type}
            onChange={(e) => setForm({ ...form, item_type: e.target.value })}
            options={NEGATIVE_ITEM_TYPES.map((t) => ({
              value: t.value,
              label: t.label,
            }))}
          />
          <Textarea
            label="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={2}
            className="sm:col-span-2"
          />
          <ActionButton onClick={handleAdd} disabled={loading} size="sm">
            Add Negative Item
          </ActionButton>
        </div>
      )}

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      {items.length === 0 ? (
        <p className="text-sm text-muted">No negative items recorded yet.</p>
      ) : (
        <Table>
          <THead>
            <TR>
              <TH>Creditor</TH>
              <TH>Bureau</TH>
              <TH>Type</TH>
              <TH>Status</TH>
              {!readOnly && <TH>Actions</TH>}
            </TR>
          </THead>
          <TBody>
            {items.map((item) => (
              <TR key={item.id}>
                <TD className="font-medium">{item.creditor_name}</TD>
                <TD>{item.bureau}</TD>
                <TD>{item.item_type.replace("_", " ")}</TD>
                <TD>
                  <Badge className="bg-slate-100 text-slate-700">{item.status}</Badge>
                </TD>
                {!readOnly && (
                  <TD>
                    <div className="flex flex-wrap gap-1">
                      {["identified", "disputing", "removed", "verified"].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => updateStatus(item.id, s)}
                          className="rounded-full border border-border px-2 py-0.5 text-xs hover:bg-surface"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </TD>
                )}
              </TR>
            ))}
          </TBody>
        </Table>
      )}
    </Card>
  );
}
