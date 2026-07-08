import Image from "next/image";
import {
  ArrowRight,
  Gauge,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PricingCard } from "@/components/PricingCard";
import { SectionHeading, TrustBadges } from "@/components/ui/Section";
import {
  company,
  differentiators,
  educationArticles,
  memberBenefits,
  pricingPlans,
  testimonials,
} from "@/lib/content";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
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
                The Smart Choice for{" "}
                <span className="text-orange">Fixing Credit</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:mt-6 sm:text-lg">
                The most powerful solution to dispute issues on your credit
                reports and improve your scores — backed by{" "}
                {company.yearsExperience} years of expertise.
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-sm text-white/60">From</span>
                <span className="text-2xl font-bold text-white sm:text-3xl">
                  $79
                </span>
                <span className="text-sm text-white/60">/ month</span>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                <Button href="/contact" size="lg">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button
                  href="/how-it-works"
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white hover:text-navy"
                >
                  How It Works
                </Button>
              </div>
            </div>

            <div className="order-1 flex flex-col items-center gap-6 lg:order-2 lg:gap-8">
              <div className="relative w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[320px]">
                <div className="absolute -inset-3 rounded-3xl bg-orange/20 blur-2xl sm:-inset-4" />
                <Image
                  src="/logo.png"
                  alt={`${company.name} logo`}
                  width={320}
                  height={320}
                  className="relative mx-auto h-auto w-full rounded-2xl shadow-2xl"
                  priority
                />
              </div>
              <TrustBadges />
            </div>
          </div>
        </Container>
      </section>

      {/* Difference */}
      <Section className="bg-surface">
        <Container>
          <SectionHeading
            eyebrow="Discover the MR. IQ Difference"
            title="Smarter. Faster. Better Value."
            description="Led by Jorge Lopez, your trusted credit repair specialist with a proven track record of helping clients transform their financial lives."
          />
          <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {differentiators.map((item, i) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:border-orange/30 hover:shadow-md sm:p-8"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-orange/10 group-hover:text-orange sm:mb-4 sm:h-12 sm:w-12">
                  {i === 0 ? (
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
                  ) : i === 1 ? (
                    <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />
                  ) : (
                    <Star className="h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-navy sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-3">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA + Testimonial */}
      <Section>
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
                Sign up and leave the heavy lifting to us.
              </h2>
              <p className="mt-3 text-base text-muted sm:mt-4 sm:text-lg">
                With a {company.successRate} success rate and personalized
                strategies for every client, we make credit repair simple and
                stress-free.
              </p>
              <Button href="/contact" className="mt-6 w-full sm:mt-8 sm:w-auto">
                Start Now
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

      {/* Pricing */}
      <Section className="bg-surface" id="pricing">
        <Container>
          <SectionHeading
            eyebrow="Pricing"
            title="One Membership. Everything Included."
            description="No upgrades needed. Choose the plan that fits your needs and get started with a 6-day trial."
          />
          <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.name} {...plan} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Member Benefits */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Our Members Get More"
            title="No Upgrades Needed"
          />
          <div className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {memberBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl border border-border bg-white p-4 sm:rounded-2xl sm:p-5"
              >
                <h4 className="text-sm font-bold text-navy sm:text-base">
                  {benefit.title}
                </h4>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  {benefit.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href="/services" variant="outline" className="w-full sm:w-auto">
              See All Services
            </Button>
          </div>
        </Container>
      </Section>

      {/* About teaser */}
      <Section className="bg-navy text-white">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <SectionHeading
                eyebrow="You Are in Good Hands"
                title={`Meet ${company.founder}`}
                description="With over 10 years of experience in the financial industry, Jorge has helped hundreds of clients improve their credit scores and achieve their financial dreams."
                light
                align="left"
              />
              <Button
                href="/about"
                variant="primary"
                className="mt-6 w-full sm:mt-8 sm:w-auto"
              >
                About Us
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { value: company.yearsExperience, label: "Years Experience" },
                { value: company.successRate, label: "Success Rate" },
                { value: "3", label: "Bureau Coverage" },
                { value: "45", label: "Day Dispute Cycle" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 text-center sm:rounded-2xl sm:p-6"
                >
                  <p className="text-2xl font-bold text-orange sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-white/70 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Membership */}
      <Section>
        <Container narrow className="text-center">
          <Users className="mx-auto h-10 w-10 text-orange sm:h-12 sm:w-12" />
          <h2 className="mt-3 text-2xl font-bold text-navy sm:mt-4 sm:text-3xl">
            A Membership to Love
          </h2>
          <p className="mt-3 text-base text-muted sm:mt-4 sm:text-lg">
            If you ever need a break, you may pause, resume, and even select your
            own billing date with a click. Flexible membership designed around
            your life.
          </p>
          <Button href="/contact" className="mt-6 w-full sm:mt-8 sm:w-auto">
            Join Today
          </Button>
        </Container>
      </Section>

      {/* Education */}
      <Section className="bg-surface">
        <Container>
          <SectionHeading
            eyebrow="Learn About Credit"
            title="Tutorials, Tips & How-To Guides"
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

      {/* Guarantee CTA */}
      <section className="bg-gradient-to-r from-navy to-navy-light py-12 sm:py-16 lg:py-20">
        <Container narrow className="text-center">
          <SectionHeading
            title="A Clear Guarantee"
            description="Get started with confidence. Our service is backed by a condition-free 90-day refund policy."
            light
          />
          <blockquote className="mt-6 text-base italic text-white/80 sm:mt-8 sm:text-lg">
            &ldquo;{testimonials[1].quote}&rdquo;
          </blockquote>
          <p className="mt-2 text-xs text-white/60 sm:text-sm">
            {testimonials[1].source} | {testimonials[1].author}
          </p>
          <Button href="/contact" size="lg" className="mt-6 sm:mt-8">
            Get Started Now
          </Button>
        </Container>
      </section>
    </>
  );
}
