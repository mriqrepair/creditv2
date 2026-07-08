"use client";

import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Send,
  Shield,
  TrendingUp,
} from "lucide-react";
import { BureauLogo } from "@/components/marketing/BureauLogo";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const stepMeta = [
  {
    icon: ClipboardCheck,
    highlights: [
      "Choose your plan in minutes",
      "Secure 3-bureau report pull",
      "Baseline scores established",
    ],
    color: "from-orange to-orange-light",
  },
  {
    icon: FileSearch,
    highlights: [
      "Line-by-line report review",
      "Errors & outdated items flagged",
      "Custom dispute strategy built",
    ],
    color: "from-navy to-navy-light",
  },
  {
    icon: Send,
    highlights: [
      "Professional dispute letters",
      "Bureau & creditor follow-up",
      "45-day dispute cycle",
    ],
    color: "from-orange to-orange-dark",
  },
  {
    icon: TrendingUp,
    highlights: [
      "24/7 client portal access",
      "Real-time score tracking",
      "Specialist progress updates",
    ],
    color: "from-navy-light to-navy",
  },
];

const bureaus = [
  { id: "equifax" as const, name: "Equifax" },
  { id: "experian" as const, name: "Experian" },
  { id: "transunion" as const, name: "TransUnion" },
];

const cyclePhases = [
  { day: "Day 1", label: "Sign up & pull reports", active: true },
  { day: "Days 2–7", label: "Analysis & strategy", active: false },
  { day: "Days 8–30", label: "Disputes sent & tracked", active: false },
  { day: "Days 31–45", label: "Follow-up & score updates", active: false },
];

export function HowItWorksShowcase() {
  const { content } = useLanguage();
  const { howItWorksSteps, company } = content;
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      {/* Step cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
        {howItWorksSteps.map((step, index) => {
          const meta = stepMeta[index];
          const Icon = meta.icon;
          const isActive = activeStep === index;

          return (
            <button
              key={step.step}
              type="button"
              onClick={() => setActiveStep(index)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border bg-white p-5 text-left shadow-sm transition-all duration-300 sm:p-6 lg:p-7",
                isActive
                  ? "border-orange/40 shadow-lg ring-2 ring-orange/15"
                  : "border-border hover:border-orange/20 hover:shadow-md"
              )}
            >
              <div
                className={cn(
                  "absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-10 transition-opacity group-hover:opacity-20",
                  meta.color
                )}
              />
              <div className="relative flex items-start gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 sm:h-14 sm:w-14",
                    meta.color,
                    isActive && "scale-105"
                  )}
                >
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange">
                    Step {step.step}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-navy sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
              <ul
                className={cn(
                  "relative mt-4 space-y-2 border-t border-border/60 pt-4 transition-all duration-300",
                  isActive ? "opacity-100" : "opacity-70"
                )}
              >
                {meta.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      {/* 45-day cycle */}
      <div className="mt-12 rounded-2xl border border-border bg-white p-5 shadow-sm sm:mt-16 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange">
              Industry-leading pace
            </p>
            <h3 className="mt-1 text-2xl font-bold text-navy sm:text-3xl">
              Your 45-Day Dispute Cycle
            </h3>
            <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">
              We move fast and stay on top of every round — so you see results sooner than
              traditional credit repair services.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2.5 sm:rounded-full sm:px-4 sm:py-2">
            <BarChart3 className="h-4 w-4 shrink-0 text-green-600" />
            <span className="text-sm font-semibold text-green-700">
              {company.successRate} success rate
            </span>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="mt-6 sm:hidden">
          {cyclePhases.map((phase, i) => (
            <div key={phase.day} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    i === 0
                      ? "bg-orange text-white shadow-md shadow-orange/30"
                      : "border-2 border-border bg-white text-navy"
                  )}
                >
                  {i + 1}
                </div>
                {i < cyclePhases.length - 1 && (
                  <div className="my-1 w-0.5 flex-1 bg-border" />
                )}
              </div>
              <div className={cn("min-w-0 pb-5", i === cyclePhases.length - 1 && "pb-0")}>
                <p className="text-[11px] font-bold uppercase tracking-wide text-orange">
                  {phase.day}
                </p>
                <p className="mt-0.5 text-sm font-medium leading-snug text-navy">
                  {phase.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="relative mt-8 hidden sm:block">
          <div className="absolute left-0 right-0 top-5 h-0.5 bg-border" />
          <div className="grid grid-cols-4 gap-3">
            {cyclePhases.map((phase, i) => (
              <div key={phase.day} className="relative text-left">
                <div
                  className={cn(
                    "relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold",
                    i === 0
                      ? "bg-orange text-white shadow-lg shadow-orange/30"
                      : "border-2 border-border bg-white text-navy"
                  )}
                >
                  {i + 1}
                </div>
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-orange">
                  {phase.day}
                </p>
                <p className="mt-1 text-sm font-medium text-navy">{phase.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bureau coverage */}
      <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="rounded-2xl bg-gradient-to-br from-navy-dark via-navy to-navy-light p-6 text-white sm:p-8">
          <Shield className="h-8 w-8 text-orange" />
          <h3 className="mt-4 text-xl font-bold sm:text-2xl">
            Full 3-Bureau Coverage
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/75 sm:text-base">
            We dispute inaccurate items across all major credit bureaus — because
            fixing one report isn&apos;t enough when lenders pull from any of them.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {bureaus.map((bureau) => (
              <BureauLogo key={bureau.name} bureau={bureau.id} />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h3 className="text-xl font-bold text-navy sm:text-2xl">
            What we dispute for you
          </h3>
          <ul className="mt-4 space-y-3">
            {[
              "Late payments & charge-offs",
              "Collections & judgments",
              "Hard inquiries",
              "Incorrect personal info",
              "Duplicate or outdated accounts",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-foreground/80 sm:text-base">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange/10">
                  <CheckCircle2 className="h-3.5 w-3.5 text-orange" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Button href="/onboarding" className="mt-6 w-full sm:w-auto">
            Start Your Free Trial
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
