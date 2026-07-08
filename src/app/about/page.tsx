import type { Metadata } from "next";
import Image from "next/image";
import { Award, Eye, Heart, Target } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/Section";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Jorge Lopez and the MR. IQ team — your trusted credit repair specialists with 10+ years of experience.",
};

const values = [
  {
    icon: Award,
    title: "Certified Professional",
    description:
      "Licensed and certified credit repair specialist with deep industry knowledge.",
  },
  {
    icon: Target,
    title: "Proven Track Record",
    description: `95% success rate in improving client credit scores over ${company.yearsExperience} years.`,
  },
  {
    icon: Eye,
    title: "Transparent Process",
    description:
      "Clear communication and regular progress updates throughout your journey.",
  },
  {
    icon: Heart,
    title: "Personalized Approach",
    description:
      "Customized strategies for each client's unique credit situation and goals.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        align="left"
        eyebrow={`About ${company.name}`}
        title="Your Trusted Credit Repair Specialist"
        description={`${company.tagline} — empowering individuals and families to achieve financial freedom.`}
      >
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/logo.png"
            alt={company.name}
            width={240}
            height={240}
            className="h-auto w-full max-w-[180px] rounded-2xl shadow-2xl sm:max-w-[220px] lg:max-w-[240px]"
          />
        </div>
      </PageHero>

      <Section>
        <Container narrow>
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">
            About {company.founder}
          </h2>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
            <p>
              With over {company.yearsExperience} years of experience in the
              financial industry, Jorge Lopez has helped hundreds of clients
              improve their credit scores and achieve their financial dreams. His
              passion for helping people overcome financial challenges drives
              everything MR. IQ does.
            </p>
            <p>
              Jorge understands that credit issues can be overwhelming and
              stressful. That&apos;s why he provides personalized, compassionate
              service to guide you through every step of the credit repair
              process.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
              <h3 className="text-xl font-bold text-navy sm:text-2xl">
                Our Mission
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
                To empower individuals and families to achieve financial freedom
                through effective credit repair, education, and ongoing support.
                We believe everyone deserves a second chance at good credit.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
              <h3 className="text-xl font-bold text-navy sm:text-2xl">
                Our Vision
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
                To be the most trusted name in credit repair, helping thousands
                of people transform their financial lives and secure better
                opportunities for themselves and their families.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title="Why Choose MR. IQ?" />
          <div className="mt-10 grid gap-8 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy/5 sm:h-14 sm:w-14">
                  <Icon className="h-6 w-6 text-navy sm:h-7 sm:w-7" />
                </div>
                <h4 className="mt-3 text-sm font-bold text-navy sm:mt-4 sm:text-base">
                  {title}
                </h4>
                <p className="mt-1.5 text-xs text-muted sm:mt-2 sm:text-sm">
                  {description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center sm:mt-12">
            <Button href="/contact" size="lg">
              Free Consultation
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
