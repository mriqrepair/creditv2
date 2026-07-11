import type { Metadata } from "next";
import { MobileHeroSection } from "@/components/marketing/MobileHeroSection";
import { PricingPlansMobile } from "@/components/marketing/PricingPlansMobile";
import { PricingCard } from "@/components/PricingCard";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Section";
import { getContent } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Fix Your Credit Today",
  description:
    "Start fixing your credit immediately. Choose one of our subscription plans today to get started.",
};

export default async function MarketingPage() {
  const locale = await getLocale();
  const content = getContent(locale);
  const { company, pricingPlans, ui } = content;

  const pricingLabels = {
    mostPopular: ui.pricing.mostPopular,
    perMonth: `/${ui.common.month}`,
    couples: ui.pricing.couplesLabel,
    month: ui.common.month,
    whatsIncluded: ui.pricing.whatsIncluded,
    getStarted: ui.common.getStarted,
  };

  return (
    <>
      <MobileHeroSection
        companyName={company.name}
        companyTagline={company.tagline}
        title={ui.home.mobileHeroTitle}
        titleAccent={ui.home.mobileHeroTitleAccent}
        description={ui.home.mobileHeroDescription}
        ctaLabel={ui.common.getStarted}
        ctaHref="/onboarding"
      />

      <Section className="bg-surface" id="pricing">
        <Container>
          <SectionHeading
            eyebrow={ui.home.pricingEyebrow}
            title={ui.home.pricingTitle}
            description={ui.home.pricingDescription}
          />
          <PricingPlansMobile />
          <div className="mt-10 hidden gap-5 sm:mt-14 sm:gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.name} {...plan} labels={pricingLabels} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
