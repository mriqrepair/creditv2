import { simulateIdentityIQPull } from "./simulator";
import type {
  IdentityIQCreditSummary,
  IdentityIQNegativeItem,
} from "./types";

type ClientProfile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  ssn_last4?: string | null;
};

function isLiveMode() {
  return (
    process.env.IDENTITYIQ_MODE === "live" &&
    Boolean(process.env.IDENTITYIQ_API_URL) &&
    Boolean(process.env.IDENTITYIQ_API_KEY)
  );
}

function affiliateEnrollmentUrl(clientId: string) {
  const base =
    process.env.IDENTITYIQ_ENROLLMENT_URL ??
    "https://www.identityiq.com/sc-securemax.aspx";
  const affiliateId = process.env.IDENTITYIQ_AFFILIATE_ID;
  const url = new URL(base);
  url.searchParams.set("ref", clientId);
  if (affiliateId) url.searchParams.set("affiliate", affiliateId);
  return url.toString();
}

export function getIdentityIQEnrollmentUrl(clientId: string) {
  return affiliateEnrollmentUrl(clientId);
}

export function getIdentityIQMode(): "live" | "simulator" | "affiliate_only" {
  if (isLiveMode()) return "live";
  if (process.env.IDENTITYIQ_AFFILIATE_ID || process.env.IDENTITYIQ_ENROLLMENT_URL) {
    return "affiliate_only";
  }
  return "simulator";
}

async function pullLiveCreditProfile(
  client: ClientProfile
): Promise<{ summary: IdentityIQCreditSummary; negativeItems: IdentityIQNegativeItem[] }> {
  const apiUrl = process.env.IDENTITYIQ_API_URL!.replace(/\/$/, "");
  const response = await fetch(`${apiUrl}/v1/credit/profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.IDENTITYIQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      external_id: client.id,
      first_name: client.first_name,
      last_name: client.last_name,
      email: client.email,
      ssn_last4: client.ssn_last4,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`IdentityIQ API error (${response.status}): ${text}`);
  }

  const data = await response.json();

  return {
    summary: {
      scores: data.scores ?? [],
      averageScore: data.average_score ?? 0,
      openAccounts: data.open_accounts ?? 0,
      hardInquiries: data.hard_inquiries ?? 0,
      creditUtilization: data.credit_utilization ?? 0,
      negativeAccounts: data.negative_accounts ?? 0,
      debtToIncomeRatio: data.debt_to_income_ratio ?? 0,
      pulledAt: data.pulled_at ?? new Date().toISOString(),
      source: "identityiq_live",
    },
    negativeItems: (data.negative_items ?? []).map(
      (item: IdentityIQNegativeItem) => item
    ),
  };
}

export async function pullIdentityIQCreditProfile(
  client: ClientProfile
): Promise<{ summary: IdentityIQCreditSummary; negativeItems: IdentityIQNegativeItem[] }> {
  if (isLiveMode()) {
    return pullLiveCreditProfile(client);
  }
  return simulateIdentityIQPull(client.id);
}
