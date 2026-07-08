import type { Metadata } from "next";
import { ArrowRight, Clock, Shield, TrendingUp } from "lucide-react";
import { HowItWorksShowcase } from "@/components/marketing/HowItWorksShowcase";
import { company } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how MR. IQ credit repair works — from sign-up to score improvement in 4 simple steps.",
};

const heroStats = [
  { icon: Clock, label: "45-day dispute cycle" },
  { icon: TrendingUp, label: "3-bureau coverage" },
  { icon: Shield, label: "90-day guarantee" },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Simple Process"
        title="How It Works"
        description="Getting started takes minutes. We handle disputes, follow-ups, and strategy — you watch your scores improve."
        align="left"
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {heroStats.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange/20">
                <Icon className="h-5 w-5 text-orange" />
              </div>
              <span className="text-sm font-semibold leading-snug text-white">
                {label}
              </span>
            </div>
          ))}
        </div>
      </PageHero>

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange">
              4 Simple Steps
            </p>
            <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
              From sign-up to score improvement
            </h2>
            <p className="mt-3 text-base text-muted sm:text-lg">
              Tap any step to explore what happens — backed by {company.yearsExperience}{" "}
              years of credit repair expertise.
            </p>
          </div>

          <div className="mt-10 sm:mt-14">
            <HowItWorksShowcase />
          </div>
        </Container>
      </Section>

      <section className="bg-gradient-to-r from-navy to-navy-light py-12 sm:py-16 lg:py-20">
        <Container narrow className="text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Ready to fix your credit?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-white/75 sm:mt-4 sm:text-lg">
            Start with a 6-day trial. No charge until you&apos;re ready. Backed by our
            90-day money-back guarantee.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row">
            <Button href="/onboarding" size="lg">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              href="/pricing"
              variant="outline"
              size="lg"
              className="border-white/30 bg-transparent text-white hover:border-white hover:!bg-white hover:!text-navy"
            >
              View Pricing
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
