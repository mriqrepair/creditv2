"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Input";
import { ActionButton } from "@/components/ui/ActionButton";
import { DOCUMENT_TYPES } from "@/lib/credit-repair/constants";
import { apiPost } from "@/lib/credit-repair/client-api";
import type { ClientDocument, CreditReport } from "@/lib/credit-repair/types";

type Props = {
  clientId: string;
  documents: ClientDocument[];
  creditReports: CreditReport[];
  onUploaded: () => void;
  readOnly?: boolean;
};

export function DocumentUploadCard({
  clientId,
  documents,
  creditReports,
  onUploaded,
  readOnly,
}: Props) {
  const [documentType, setDocumentType] = useState("credit_report");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload() {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const fileUrl = `manual://${file.name}`;

      if (documentType === "credit_report") {
        await apiPost("/api/credit/reports", {
          client_id: clientId,
          bureau: "merged",
          file_name: file.name,
          file_url: fileUrl,
          uploaded_by: readOnly ? "client" : "admin",
        });
      } else {
        await apiPost("/api/credit/documents", {
          client_id: clientId,
          document_type: documentType,
          file_name: file.name,
          file_url: fileUrl,
          uploaded_by: readOnly ? "client" : "admin",
        });
      }

      setFile(null);
      onUploaded();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  const allFiles = [
    ...creditReports.map((r) => ({
      id: r.id,
      name: r.file_name ?? "Credit report",
      type: `Credit Report (${r.bureau})`,
      date: r.uploaded_at,
      status: r.status,
    })),
    ...documents.map((d) => ({
      id: d.id,
      name: d.file_name,
      type: d.document_type.replace("_", " "),
      date: d.uploaded_at,
      status: null as string | null,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card
      title="Documents & Credit Reports"
      description="Manual upload workflow — files are tracked by name (no bureau pull yet)."
    >
      {!readOnly && (
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <Select
            label="Document Type"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            options={DOCUMENT_TYPES.map((d) => ({
              value: d.value,
              label: d.label,
            }))}
          />
          <div>
            <label className="block text-sm font-medium text-navy">File</label>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="mt-1.5 w-full text-sm"
            />
          </div>
          <ActionButton
            className="sm:col-span-2"
            size="sm"
            onClick={handleUpload}
            disabled={loading || !file}
          >
            {loading ? "Uploading..." : "Upload Document"}
          </ActionButton>
        </div>
      )}

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      {allFiles.length === 0 ? (
        <p className="text-sm text-muted">No documents uploaded yet.</p>
      ) : (
        <ul className="divide-y divide-border rounded-xl border border-border">
          {allFiles.map((doc) => (
            <li key={doc.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
              <div>
                <p className="font-medium text-navy">{doc.name}</p>
                <p className="text-xs text-muted">
                  {doc.type} · {new Date(doc.date).toLocaleDateString()}
                </p>
              </div>
              {doc.status && (
                <span className="text-xs text-muted">{doc.status.replace("_", " ")}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
