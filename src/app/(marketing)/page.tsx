import {
  ArrowRight,
  Gauge,
  Star,
  Users,
} from "lucide-react";
import { HeroCreditDashboard } from "@/components/marketing/HeroCreditDashboard";
import { MobileHeroSection } from "@/components/marketing/MobileHeroSection";
import { DifferentiatorCards } from "@/components/marketing/DifferentiatorCards";
import { FounderStatsGrid } from "@/components/marketing/FounderStatsGrid";
import { MemberBenefitsShowcase } from "@/components/marketing/MemberBenefitsShowcase";
import { PricingPlansMobile } from "@/components/marketing/PricingPlansMobile";
import { OpenOnboardingButton } from "@/components/onboarding/OpenOnboardingButton";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PricingCard } from "@/components/PricingCard";
import { SectionHeading } from "@/components/ui/Section";
import { getContent } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/server";

export default async function HomePage() {
  const locale = await getLocale();
  const content = getContent(locale);
  const { company, pricingPlans, testimonials, educationArticles, ui } = content;

  const pricingLabels = {
    mostPopular: ui.pricing.mostPopular,
    perMonth: `/${ui.common.month}`,
    couples: ui.pricing.couplesLabel,
    month: ui.common.month,
    whatsIncluded: ui.pricing.whatsIncluded,
    getStarted: ui.common.getStarted,
  };

  return (
    <>
      <MobileHeroSection
        className="lg:hidden"
        companyName={company.name}
        companyTagline={company.tagline}
        title={ui.home.mobileHeroTitle}
        titleAccent={ui.home.mobileHeroTitleAccent}
        description={ui.home.mobileHeroDescription}
        ctaLabel={ui.common.getStarted}
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange/10 via-transparent to-transparent" />
        <Container className="relative py-12 sm:py-16 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="order-2 lg:order-1">
              <p className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-orange sm:mb-4 sm:px-4 sm:py-1.5 sm:text-sm">
                <Gauge className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                <span className="truncate">{company.tagline}</span>
              </p>
              <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {ui.home.heroTitle}{" "}
                <span className="block text-orange sm:inline">
                  {ui.home.heroTitleAccent}
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:mt-6 sm:text-lg">
                {ui.home.heroDescription.replace("{years}", company.yearsExperience)}
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-sm text-white/60">{ui.common.from}</span>
                <span className="text-2xl font-bold text-white sm:text-3xl">
                  $79
                </span>
                <span className="text-sm text-white/60">{ui.common.perMonth}</span>
              </div>
              <div className="mt-6 flex flex-row gap-3 sm:mt-8 sm:flex-wrap">
                <Button
                  href="/onboarding"
                  size="lg"
                  className="w-auto min-w-0 flex-1 sm:flex-none"
                >
                  {ui.common.getStarted}
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button
                  href="/how-it-works"
                  variant="outline"
                  size="lg"
                  className="w-auto min-w-0 flex-1 border-white/30 bg-transparent text-white hover:border-white hover:!bg-white hover:!text-navy sm:flex-none"
                >
                  {ui.common.howItWorks}
                </Button>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <HeroCreditDashboard />
            </div>
          </div>
        </Container>
      </section>

      <Section className="hidden bg-surface lg:block">
        <Container>
          <SectionHeading
            eyebrow={ui.home.differenceEyebrow}
            title={ui.home.differenceTitle}
            description={ui.home.differenceDescription}
          />
          <DifferentiatorCards />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
                {ui.home.ctaTitle}
              </h2>
              <p className="mt-3 text-base text-muted sm:mt-4 sm:text-lg">
                {ui.home.ctaDescription.replace("{rate}", company.successRate)}
              </p>
              <Button href="/contact" className="mt-6 w-full sm:mt-8 sm:w-auto">
                {ui.common.startNow}
              </Button>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <div className="flex gap-1 text-orange">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current sm:h-5 sm:w-5" />
                ))}
              </div>
              <blockquote className="mt-3 text-base italic leading-relaxed text-foreground/80 sm:mt-4 sm:text-lg">
                &ldquo;{testimonials[0].quote}&rdquo;
              </blockquote>
              <p className="mt-3 text-sm font-semibold text-navy sm:mt-4">
                {testimonials[0].source} | {testimonials[0].author}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface" id="pricing">
        <Container>
          <SectionHeading
            eyebrow={ui.home.pricingEyebrow}
            title={ui.home.pricingTitle}
            description={ui.home.pricingDescription}
          />
          <PricingPlansMobile />
          <div className="mt-10 hidden gap-5 sm:mt-14 sm:gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.name} {...plan} labels={pricingLabels} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow={ui.home.benefitsEyebrow}
            title={ui.home.benefitsTitle}
          />
          <MemberBenefitsShowcase
            memberBenefits={content.memberBenefits}
            ui={ui.memberBenefits}
          />
        </Container>
      </Section>

      <Section className="hidden bg-navy text-white lg:block">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <SectionHeading
                eyebrow={ui.home.aboutEyebrow}
                title={ui.home.aboutTitle.replace("{founder}", company.founder)}
                description={ui.home.aboutDescription}
                light
                align="left"
              />
              <Button
                href="/about"
                variant="primary"
                className="mt-6 w-full sm:mt-8 sm:w-auto"
              >
                {ui.common.aboutUs}
              </Button>
            </div>
            <FounderStatsGrid
              company={company}
              stats={ui.stats}
              responsiveCompact
            />
          </div>
        </Container>
      </Section>

      <Section className="hidden lg:block">
        <Container narrow className="text-center">
          <Users className="mx-auto h-10 w-10 text-orange sm:h-12 sm:w-12" />
          <h2 className="mt-3 text-2xl font-bold text-navy sm:mt-4 sm:text-3xl">
            {ui.home.membershipTitle}
          </h2>
          <p className="mt-3 text-base text-muted sm:mt-4 sm:text-lg">
            {ui.home.membershipDescription}
          </p>
          <OpenOnboardingButton className="mt-6 w-full sm:mt-8 sm:w-auto">
            {ui.common.joinToday}
          </OpenOnboardingButton>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <SectionHeading
            eyebrow={ui.home.educationEyebrow}
            title={ui.home.educationTitle}
          />
          <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {educationArticles.map((article) => (
              <article
                key={article.title}
                className="rounded-2xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
              >
                <h3 className="text-base font-bold text-navy sm:text-lg">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-3">
                  {article.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <section className="bg-gradient-to-r from-navy to-navy-light py-12 sm:py-16 lg:py-20">
        <Container narrow className="text-center">
          <SectionHeading
            title={ui.home.guaranteeTitle}
            description={ui.home.guaranteeDescription}
            light
          />
          <blockquote className="mt-6 text-base italic text-white/80 sm:mt-8 sm:text-lg">
            &ldquo;{testimonials[1].quote}&rdquo;
          </blockquote>
          <p className="mt-2 text-xs text-white/60 sm:text-sm">
            {testimonials[1].source} | {testimonials[1].author}
          </p>
          <Button href="/contact" size="lg" className="mt-6 sm:mt-8">
            {ui.home.getStartedNow}
          </Button>
        </Container>
      </section>
    </>
  );
}
