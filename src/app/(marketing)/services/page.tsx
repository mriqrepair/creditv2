import type { Metadata } from "next";
import { CheckList } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Comprehensive credit repair solutions — disputes, consultations, identity protection, business credit, and more.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        description="Comprehensive credit repair solutions tailored to your unique situation. Everything included in your membership."
      />

      <Section>
        <Container>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6 lg:p-8"
              >
                <h2 className="text-lg font-bold text-navy sm:text-xl">
                  {service.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-3">
                  {service.description}
                </p>
                <div className="mt-4 sm:mt-6">
                  <CheckList items={service.features} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-surface p-5 text-center sm:mt-16 sm:p-8">
            <h3 className="text-xl font-bold text-navy sm:text-2xl">
              Credit Monitoring with IdentityIQ
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted sm:mt-4 sm:text-base">
              We recommend IdentityIQ for ongoing credit monitoring and identity
              protection — real-time monitoring from all three bureaus, identity
              theft protection, credit score tracking, and dark web monitoring.
            </p>
            <Button
              href="https://www.identityiq.com"
              external
              variant="outline"
              className="mt-5 w-full sm:mt-6 sm:w-auto"
            >
              Learn More About IdentityIQ
            </Button>
          </div>

          <div className="mt-10 text-center sm:mt-12">
            <Button href="/pricing" size="lg">
              View Pricing Plans
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
