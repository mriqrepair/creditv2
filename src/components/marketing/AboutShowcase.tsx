import {
  ArrowRight,
  Award,
  Eye,
  Heart,
  Quote,
  Sparkles,
  Target,
  Telescope,
} from "lucide-react";
import type { SiteContent } from "@/lib/i18n";
import { FounderStatsGrid } from "@/components/marketing/FounderStatsGrid";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const valueIcons = [Award, Target, Eye, Heart];

const valueColors = [
  "bg-orange/10 text-orange",
  "bg-navy/10 text-navy",
  "bg-sky-100 text-sky-700",
  "bg-rose-100 text-rose-700",
];

type AboutShowcaseProps = {
  content: SiteContent;
};

export function AboutShowcase({ content }: AboutShowcaseProps) {
  const { company, ui } = content;
  const about = ui.pages.about;

  return (
    <>
      <Section>
        <Container>
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="bg-gradient-to-r from-navy to-navy-light px-6 py-5 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold text-white backdrop-blur-sm">
                  JL
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange">
                    {about.founderRole}
                  </p>
                  <h2 className="text-xl font-bold text-white sm:text-2xl">
                    {company.founder}
                  </h2>
                </div>
              </div>
            </div>
            <div className="space-y-4 px-6 py-6 sm:px-8 sm:py-8">
              <h3 className="text-lg font-bold text-navy sm:text-xl">
                {about.founderTitle}
              </h3>
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                {about.founderBio1}
              </p>
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                {about.founderBio2}
              </p>
              <blockquote className="relative rounded-xl border border-orange/20 bg-orange/5 px-4 py-4 sm:px-5">
                <Quote className="absolute -top-2 left-4 h-6 w-6 text-orange/40" />
                <p className="text-sm italic leading-relaxed text-navy sm:text-base">
                  &ldquo;{about.founderQuote}&rdquo;
                </p>
                <footer className="mt-2 text-xs font-semibold text-orange sm:text-sm">
                  — {company.founder}
                </footer>
              </blockquote>
            </div>
            <div className="border-t border-border bg-surface px-6 py-6 sm:px-8 sm:py-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-orange">
                {about.statsTitle}
              </p>
              <div className="mt-4 sm:mt-5">
                <FounderStatsGrid
                  company={company}
                  stats={ui.stats}
                  variant="light"
                  compact
                  wide
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange to-orange-light" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-navy sm:text-2xl">
                {about.missionTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
                {about.missionText}
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-navy to-navy-light" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/10 text-navy">
                <Telescope className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-navy sm:text-2xl">
                {about.visionTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
                {about.visionText}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title={about.valuesTitle} />
          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {about.values.map((value, i) => {
              const Icon = valueIcons[i];
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-border bg-white p-5 shadow-sm transition-all hover:border-orange/25 hover:shadow-md sm:p-6"
                >
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl",
                      valueColors[i]
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="mt-4 text-base font-bold text-navy">
                    {value.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <section className="bg-gradient-to-r from-navy to-navy-light py-12 sm:py-16">
        <Container narrow className="text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {about.ctaTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-white/75 sm:mt-4 sm:text-lg">
            {about.ctaDescription}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center">
            <Button href="/contact" size="lg" className="w-full sm:w-auto">
              {about.freeConsultation}
            </Button>
            <Button
              href="/onboarding"
              variant="outline"
              size="lg"
              className="w-full border-white/30 bg-transparent text-white hover:border-white hover:!bg-white hover:!text-navy sm:w-auto"
            >
              {about.getStarted}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
