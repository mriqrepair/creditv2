import type {
  IdentityIQCreditSummary,
  IdentityIQNegativeItem,
  BureauScore,
} from "./types";

function scoreRating(score: number): BureauScore["rating"] {
  if (score >= 740) return "excellent";
  if (score >= 670) return "good";
  if (score >= 580) return "fair";
  return "poor";
}

function hashSeed(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function simulateIdentityIQPull(clientId: string): {
  summary: IdentityIQCreditSummary;
  negativeItems: IdentityIQNegativeItem[];
} {
  const seed = hashSeed(clientId);
  const base = 520 + (seed % 180);

  const scores: BureauScore[] = [
    { bureau: "experian" as const, score: base + (seed % 17), rating: scoreRating(base + (seed % 17)) },
    { bureau: "equifax" as const, score: base + ((seed >> 3) % 21), rating: scoreRating(base + ((seed >> 3) % 21)) },
    { bureau: "transunion" as const, score: base + ((seed >> 5) % 15), rating: scoreRating(base + ((seed >> 5) % 15)) },
  ];

  const averageScore = Math.round(
    scores.reduce((sum, s) => sum + s.score, 0) / scores.length
  );

  const negativeItems: IdentityIQNegativeItem[] = [
    {
      creditor_name: "CAPITAL ONE",
      account_number: `****${1000 + (seed % 9000)}`,
      bureau: "experian",
      item_type: "late_payment",
      balance: 1240,
      status: "identified",
      notes: "Simulated IdentityIQ tradeline — 90 days late",
    },
    {
      creditor_name: "MIDLAND CREDIT",
      account_number: `****${2000 + (seed % 8000)}`,
      bureau: "equifax",
      item_type: "collection",
      balance: 890,
      status: "identified",
      notes: "Simulated IdentityIQ collection account",
    },
    {
      creditor_name: "SYNCB/AMAZON",
      account_number: `****${3000 + (seed % 7000)}`,
      bureau: "transunion",
      item_type: "charge_off",
      balance: 2150,
      status: "identified",
      notes: "Simulated IdentityIQ charge-off",
    },
  ];

  return {
    summary: {
      scores,
      averageScore,
      openAccounts: 4 + (seed % 6),
      hardInquiries: 1 + (seed % 4),
      creditUtilization: 28 + (seed % 45),
      negativeAccounts: negativeItems.length,
      debtToIncomeRatio: 22 + (seed % 18),
      pulledAt: new Date().toISOString(),
      source: "identityiq_simulator",
    },
    negativeItems,
  };
}
