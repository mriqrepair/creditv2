import type { Metadata } from "next";
import { howItWorksSteps } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how MR. IQ credit repair works — from sign-up to score improvement in 4 simple steps.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        title="How It Works"
        description="Getting started is simple. We handle the disputes, follow-ups, and strategy — you watch your scores improve."
      />

      <Section>
        <Container narrow>
          <div className="space-y-6 sm:space-y-8">
            {howItWorksSteps.map((step, index) => (
              <div key={step.step} className="relative flex gap-4 sm:gap-6">
                {index < howItWorksSteps.length - 1 && (
                  <div className="absolute left-5 top-14 bottom-0 w-0.5 bg-border sm:left-6 sm:top-16" />
                )}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange text-base font-bold text-white shadow-lg shadow-orange/30 sm:h-12 sm:w-12 sm:text-lg">
                  {step.step}
                </div>
                <div className="min-w-0 flex-1 rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6 lg:p-8">
                  <h3 className="text-lg font-bold text-navy sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-3 sm:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container narrow className="text-center">
          <SectionHeading
            title="Ready to Get Started?"
            description="Sign up today and see why MR. IQ is the smart choice for credit repair. 6-day trial. 90-day guarantee."
          />
          <Button href="/contact" size="lg" className="mt-6 sm:mt-8">
            Get Started Now
          </Button>
        </Container>
      </Section>
    </>
  );
}
