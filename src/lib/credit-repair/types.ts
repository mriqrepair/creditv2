export type ClientStatus = "active" | "paused" | "completed";
export type Bureau = "experian" | "equifax" | "transunion" | "merged" | "all";
export type CreditReportStatus = "pending_review" | "reviewed" | "archived";
export type NegativeItemType =
  | "collection"
  | "charge_off"
  | "late_payment"
  | "inquiry"
  | "public_record"
  | "repossession"
  | "foreclosure"
  | "other";
export type NegativeItemStatus =
  | "identified"
  | "disputing"
  | "removed"
  | "verified";
export type DisputeStatus =
  | "not_started"
  | "drafted"
  | "sent"
  | "waiting_response"
  | "removed"
  | "verified"
  | "escalated";
export type DocumentType =
  | "id"
  | "ssn_card"
  | "proof_of_address"
  | "credit_report"
  | "other";
export type ConsentStatus = "pending" | "signed" | "revoked";

export interface Client {
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  date_of_birth: string | null;
  ssn_last4: string | null;
  status: ClientStatus;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  notes: string | null;
  created_by: string | null;
}

export interface CreditReport {
  id: string;
  created_at: string;
  updated_at: string;
  client_id: string;
  bureau: Bureau;
  file_url: string | null;
  file_name: string | null;
  uploaded_at: string;
  uploaded_by: string | null;
  status: CreditReportStatus;
  review_notes: string | null;
  score_experian: number | null;
  score_equifax: number | null;
  score_transunion: number | null;
}

export interface NegativeItem {
  id: string;
  created_at: string;
  updated_at: string;
  client_id: string;
  credit_report_id: string | null;
  creditor_name: string;
  account_number: string | null;
  bureau: Bureau;
  item_type: NegativeItemType;
  status: NegativeItemStatus;
  balance: number | null;
  date_opened: string | null;
  date_of_last_activity: string | null;
  notes: string | null;
}

export interface Dispute {
  id: string;
  created_at: string;
  updated_at: string;
  client_id: string;
  negative_item_id: string;
  status: DisputeStatus;
  round_number: number;
  reason: string | null;
  method: "mail" | "online";
  sent_at: string | null;
  response_due_at: string | null;
  resolved_at: string | null;
  notes: string | null;
  negative_item?: NegativeItem;
}

export interface DisputeLetter {
  id: string;
  created_at: string;
  dispute_id: string;
  client_id: string;
  template_type: string;
  content: string;
  generated_at: string;
  sent_at: string | null;
  delivery_method: "mail" | "online";
}

export interface ClientDocument {
  id: string;
  created_at: string;
  client_id: string;
  document_type: DocumentType;
  file_url: string | null;
  file_name: string;
  uploaded_at: string;
  uploaded_by: string | null;
}

export interface ConsentForm {
  id: string;
  created_at: string;
  client_id: string;
  form_type: string;
  signed_at: string | null;
  signature_name: string | null;
  ip_address: string | null;
  document_url: string | null;
  status: ConsentStatus;
}

export interface AuditLog {
  id: string;
  created_at: string;
  client_id: string | null;
  entity_type: string;
  entity_id: string | null;
  action: string;
  actor: string;
  metadata: Record<string, unknown>;
}

export interface ClientDetail extends Client {
  credit_reports: CreditReport[];
  negative_items: NegativeItem[];
  disputes: Dispute[];
  dispute_letters: DisputeLetter[];
  client_documents: ClientDocument[];
  consent_forms: ConsentForm[];
  audit_logs: AuditLog[];
}
