import type { Metadata } from "next";
import { company } from "@/lib/content";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Service" />

      <Section>
        <Container narrow>
          <div className="prose prose-slate max-w-none">
            <p className="text-sm text-muted sm:text-base">
              Last Updated: September 2025
            </p>

            <h2 className="mt-8 text-xl font-bold text-navy sm:text-2xl">
              1. Agreement
            </h2>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              By accessing or using {company.name} services, you agree to be
              bound by these Terms of Service. If you do not agree, please do not
              use our services.
            </p>

            <h2 className="mt-8 text-xl font-bold text-navy sm:text-2xl">
              2. Services
            </h2>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              {company.name} provides credit repair and advisory services
              including credit report analysis, dispute services, consultations,
              and related financial guidance. We operate in compliance with the
              Credit Repair Organizations Act (CROA) and applicable state laws.
            </p>

            <h2 className="mt-8 text-xl font-bold text-navy sm:text-2xl">
              3. No Guarantees
            </h2>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              We cannot and do not guarantee specific credit score increases or
              removal of accurate negative information. Results vary based on
              individual circumstances. We will work diligently using proven
              strategies to achieve the best possible outcomes.
            </p>

            <h2 className="mt-8 text-xl font-bold text-navy sm:text-2xl">
              4. Billing & Cancellation
            </h2>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              Services are billed monthly. You may pause or cancel your
              membership at any time. A 6-day trial period applies to new
              enrollments. Our 90-day guarantee provides a full refund if
              requested within 90 days of enrollment.
            </p>

            <h2 className="mt-8 text-xl font-bold text-navy sm:text-2xl">
              5. Your Rights Under CROA
            </h2>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              You have the right to dispute inaccurate information on your credit
              reports yourself at no cost. You have a three-day right to cancel
              without charge after signing a contract. We will provide a written
              contract detailing services, costs, and timelines before you
              enroll.
            </p>

            <h2 className="mt-8 text-xl font-bold text-navy sm:text-2xl">
              6. Contact
            </h2>
            <p className="text-sm text-muted sm:text-base">
              For questions about these terms, contact {company.founder} at{" "}
              <a href={`mailto:${company.email}`} className="break-all text-orange">
                {company.email}
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
