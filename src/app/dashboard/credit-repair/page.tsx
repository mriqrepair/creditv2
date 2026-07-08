import type { Metadata } from "next";
import { CreditRepairDashboard } from "@/components/credit-repair/CreditRepairDashboard";

export const metadata: Metadata = {
  title: "Credit Repair OS",
  description: "Credit repair workflow dashboard for MR. IQ",
};

export default function CreditRepairPage() {
  return <CreditRepairDashboard />;
}
