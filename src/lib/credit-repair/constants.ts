import type { DisputeStatus } from "./types";

export const DISPUTE_STATUSES: {
  value: DisputeStatus;
  label: string;
  color: string;
}[] = [
  { value: "not_started", label: "Not Started", color: "bg-slate-100 text-slate-700" },
  { value: "drafted", label: "Drafted", color: "bg-blue-100 text-blue-700" },
  { value: "sent", label: "Sent", color: "bg-indigo-100 text-indigo-700" },
  { value: "waiting_response", label: "Waiting Response", color: "bg-amber-100 text-amber-700" },
  { value: "removed", label: "Removed", color: "bg-green-100 text-green-700" },
  { value: "verified", label: "Verified", color: "bg-red-100 text-red-700" },
  { value: "escalated", label: "Escalated", color: "bg-purple-100 text-purple-700" },
];

export const DISPUTE_PIPELINE_ORDER: DisputeStatus[] = [
  "not_started",
  "drafted",
  "sent",
  "waiting_response",
  "removed",
  "verified",
  "escalated",
];

export const BUREAUS = [
  { value: "experian", label: "Experian" },
  { value: "equifax", label: "Equifax" },
  { value: "transunion", label: "TransUnion" },
  { value: "merged", label: "Merged Report" },
  { value: "all", label: "All Bureaus" },
] as const;

export const NEGATIVE_ITEM_TYPES = [
  { value: "collection", label: "Collection" },
  { value: "charge_off", label: "Charge Off" },
  { value: "late_payment", label: "Late Payment" },
  { value: "inquiry", label: "Inquiry" },
  { value: "public_record", label: "Public Record" },
  { value: "repossession", label: "Repossession" },
  { value: "foreclosure", label: "Foreclosure" },
  { value: "other", label: "Other" },
] as const;

export const DOCUMENT_TYPES = [
  { value: "id", label: "Government ID" },
  { value: "ssn_card", label: "SSN Card" },
  { value: "proof_of_address", label: "Proof of Address" },
  { value: "credit_report", label: "Credit Report" },
  { value: "other", label: "Other" },
] as const;

export const LETTER_TEMPLATES = [
  { value: "initial_dispute", label: "Initial Dispute Letter" },
  { value: "method_of_verification", label: "Method of Verification" },
  { value: "escalation", label: "Escalation Letter" },
  { value: "goodwill", label: "Goodwill Letter" },
] as const;
