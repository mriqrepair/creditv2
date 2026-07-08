import type { Metadata } from "next";
import { company } from "@/lib/content";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" />

      <Section>
        <Container narrow>
          <div className="prose prose-slate max-w-none">
            <p className="text-sm text-muted sm:text-base">
              Last Updated: September 2025
            </p>

            <h2 className="mt-8 text-xl font-bold text-navy sm:text-2xl">
              1. Introduction
            </h2>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              {company.name} (&ldquo;{company.name}&rdquo;, &ldquo;we&rdquo;,
              &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our website
              or use our credit repair and advisory services.
            </p>

            <h2 className="mt-8 text-xl font-bold text-navy sm:text-2xl">
              2. Information We Collect
            </h2>
            <p className="text-sm text-muted sm:text-base">
              We may collect the following types of information:
            </p>
            <ul className="text-sm text-muted sm:text-base">
              <li>
                <strong>Personal Information:</strong> your name, email address,
                phone number, and mailing address.
              </li>
              <li>
                <strong>Credit Information:</strong> credit reports, account
                numbers, dispute documents, or other information you provide to
                assist with credit improvement.
              </li>
              <li>
                <strong>Payment Information:</strong> if you purchase services,
                limited payment details processed securely by our payment
                providers.
              </li>
              <li>
                <strong>Usage Data:</strong> IP address, device/browser type,
                pages visited, and referral sources to help us improve the site.
              </li>
            </ul>

            <h2 className="mt-8 text-xl font-bold text-navy sm:text-2xl">
              3. How We Use Your Information
            </h2>
            <ul className="text-sm text-muted sm:text-base">
              <li>Provide, personalize, and improve our services.</li>
              <li>Communicate with you about updates, results, and offers.</li>
              <li>Process payments and manage billing.</li>
              <li>Comply with legal and regulatory requirements.</li>
            </ul>

            <h2 className="mt-8 text-xl font-bold text-navy sm:text-2xl">
              4. Sharing of Information
            </h2>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              We do not sell or rent your personal information. We may share it
              with credit bureaus and creditors for dispute processing, service
              providers who assist our operations, and government or legal
              authorities when required by law.
            </p>

            <h2 className="mt-8 text-xl font-bold text-navy sm:text-2xl">
              5. Contact Us
            </h2>
            <p className="text-sm text-muted sm:text-base">
              Questions about this Privacy Policy? Contact{" "}
              <strong>{company.founder}</strong> at{" "}
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
