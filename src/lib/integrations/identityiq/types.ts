export type IdentityIQEnrollmentStatus =
  | "pending"
  | "enrolled"
  | "active"
  | "sync_failed";

export type BureauScore = {
  bureau: "experian" | "equifax" | "transunion";
  score: number;
  rating: "poor" | "fair" | "good" | "excellent";
};

export type IdentityIQCreditSummary = {
  scores: BureauScore[];
  averageScore: number;
  openAccounts: number;
  hardInquiries: number;
  creditUtilization: number;
  negativeAccounts: number;
  debtToIncomeRatio: number;
  pulledAt: string;
  source: "identityiq_simulator" | "identityiq_live";
};

export type IdentityIQNegativeItem = {
  creditor_name: string;
  account_number: string;
  bureau: "experian" | "equifax" | "transunion" | "all";
  item_type:
    | "collection"
    | "charge_off"
    | "late_payment"
    | "inquiry"
    | "public_record"
    | "other";
  balance: number | null;
  status: string;
  notes?: string;
};

export type IdentityIQPullResult = {
  summary: IdentityIQCreditSummary;
  negativeItems: IdentityIQNegativeItem[];
  creditReportId: string;
  importedNegativeItemIds: string[];
};

export interface IdentityIQEnrollment {
  id: string;
  created_at: string;
  updated_at: string;
  client_id: string;
  status: IdentityIQEnrollmentStatus;
  member_reference: string | null;
  enrollment_url: string | null;
  enrolled_at: string | null;
  last_sync_at: string | null;
  last_summary: IdentityIQCreditSummary | null;
  metadata: Record<string, unknown>;
}
