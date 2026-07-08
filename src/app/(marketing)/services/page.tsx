import type { Metadata } from "next";
import { CheckList } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ServicesShowcaseMobile } from "@/components/marketing/ServicesShowcaseMobile";
import { getContent } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const content = getContent(await getLocale());
  return {
    title: content.ui.pages.services.title,
    description: content.ui.pages.services.description,
  };
}

export default async function ServicesPage() {
  const content = getContent(await getLocale());
  const { services, ui } = content;

  return (
    <>
      <PageHero
        title={ui.pages.services.title}
        description={ui.pages.services.description}
      />

      <Section>
        <Container>
          <ServicesShowcaseMobile />

          <div className="hidden gap-5 sm:gap-6 md:grid md:grid-cols-2">
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

          <div className="mt-8 rounded-2xl bg-surface p-5 text-left sm:mt-16 sm:p-8 sm:text-center">
            <h3 className="text-lg font-bold text-navy sm:text-2xl">
              {ui.services.identityIqTitle}
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
              {ui.services.identityIqDescription}
            </p>
            <Button
              href="https://www.identityiq.com"
              external
              variant="outline"
              className="mt-5 w-full sm:mt-6 sm:w-auto"
            >
              {ui.services.identityIqButton}
            </Button>
          </div>

          <div className="mt-8 text-center sm:mt-12">
            <Button href="/pricing" size="lg" className="w-full sm:w-auto">
              {ui.services.viewPricing}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
