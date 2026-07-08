import type { Metadata } from "next";
import { Suspense } from "react";
import { CreditRepairDashboard } from "@/components/credit-repair/CreditRepairDashboard";

export const metadata: Metadata = {
  title: "Credit Repair OS",
  description: "Credit repair workflow dashboard for MR. IQ",
};

export default function CreditRepairPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading dashboard...</p>}>
      <CreditRepairDashboard />
    </Suspense>
  );
}
