import type { Metadata } from "next";
import { ArrowRight, Clock, Shield, TrendingUp } from "lucide-react";
import { HowItWorksShowcase } from "@/components/marketing/HowItWorksShowcase";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getContent } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const content = getContent(await getLocale());
  return {
    title: content.ui.pages.howItWorks.title,
    description: content.ui.pages.howItWorks.description,
  };
}

export default async function HowItWorksPage() {
  const content = getContent(await getLocale());
  const { company, ui } = content;

  const heroStats = [
    { icon: Clock, label: "45-day dispute cycle" },
    { icon: TrendingUp, label: "3-bureau coverage" },
    { icon: Shield, label: "90-day guarantee" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Simple Process"
        title={ui.pages.howItWorks.title}
        description={ui.pages.howItWorks.description}
        align="left"
      >
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-1 lg:gap-4">
          {heroStats.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange/20">
                <Icon className="h-5 w-5 text-orange" />
              </div>
              <span className="text-sm font-semibold text-white">{label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      <Section>
        <Container>
          <HowItWorksShowcase />
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container narrow className="text-center">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">
            {company.successRate} {ui.stats.successRate}
          </h2>
          <p className="mt-3 text-base text-muted sm:mt-4 sm:text-lg">
            {ui.home.ctaDescription.replace("{rate}", company.successRate)}
          </p>
          <Button href="/onboarding" size="lg" className="mt-6 sm:mt-8">
            {ui.common.getStarted}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Container>
      </Section>
    </>
  );
}
