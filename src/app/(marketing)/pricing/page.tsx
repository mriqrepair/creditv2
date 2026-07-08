import type { Metadata } from "next";
import { PricingCard } from "@/components/PricingCard";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { pricingPlans } from "@/lib/content";
import { Check, Pause, Calendar, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent credit repair pricing starting at $79/month. No hidden fees, no upgrades needed.",
};

const membershipFeatures = [
  {
    icon: Pause,
    title: "Pause Anytime",
    description: "Need a break? Pause your membership with one click.",
  },
  {
    icon: RefreshCw,
    title: "Resume When Ready",
    description: "Pick up right where you left off whenever you're ready.",
  },
  {
    icon: Calendar,
    title: "Choose Your Billing Date",
    description: "Select the billing date that works best for your budget.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        title="Simple, Transparent Pricing"
        description="One low monthly payment. Everything you need. No surprise upgrades. Start with a 6-day trial — no charge."
      />

      <Section>
        <Container>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.name} {...plan} />
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-surface p-5 sm:mt-16 sm:p-8">
            <h3 className="text-lg font-bold text-navy sm:text-xl">
              All Plans Include
            </h3>
            <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {[
                "6-day free trial",
                "90-day money-back guarantee",
                "No long-term contracts",
                "Couples pricing available",
                "24/7 client portal access",
                "Dedicated credit specialist",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <SectionHeading
            title="Flexible Membership"
            description="Your membership works around your life, not the other way around."
          />
          <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3">
            {membershipFeatures.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-white p-6 text-center sm:p-8"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange/10 sm:h-14 sm:w-14">
                  <Icon className="h-6 w-6 text-orange sm:h-7 sm:w-7" />
                </div>
                <h3 className="mt-3 text-base font-bold text-navy sm:mt-4 sm:text-lg">
                  {title}
                </h3>
                <p className="mt-1.5 text-xs text-muted sm:mt-2 sm:text-sm">
                  {description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center sm:mt-12">
            <Button href="/contact" size="lg">
              Get Started Today
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
