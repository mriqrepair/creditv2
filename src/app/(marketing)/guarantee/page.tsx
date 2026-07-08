import type { Metadata } from "next";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "90-Day Guarantee",
  description:
    "MR. IQ offers a condition-free 90-day refund policy. Get started with confidence.",
};

const guaranteePoints = [
  "100% condition-free — no strings attached",
  "Full refund if requested within 90 days of enrollment",
  "No complicated hoops or hidden requirements",
  "We stand behind our service because we believe in results",
  "6-day trial period before your first charge",
];

export default function GuaranteePage() {
  return (
    <>
      <PageHero
        title="Our 90-Day Guarantee"
        description="Get started with confidence. No strings. No stress."
      />

      <Section>
        <Container narrow>
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:mt-0 sm:p-8">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Although we don&apos;t think you will want it, we will gladly
              provide a refund if you request it within 90 days of enrollment.
              Our 90-Day Guarantee is 100% condition-free.
            </p>
            <ul className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {guaranteePoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
                  <span className="text-sm text-foreground/80 sm:text-base">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 text-center sm:mt-12">
            <p className="text-base text-muted sm:text-lg">
              Ready to take action? We are ready to help.
            </p>
            <Button href="/contact" size="lg" className="mt-5 sm:mt-6">
              Let&apos;s Start!
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
