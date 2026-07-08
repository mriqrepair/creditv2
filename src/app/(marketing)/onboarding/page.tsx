import type { Metadata } from "next";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Start your credit repair journey with MR. IQ — create your profile and access your dashboard.",
};

export default function OnboardingPage() {
  return <OnboardingWizard />;
}
