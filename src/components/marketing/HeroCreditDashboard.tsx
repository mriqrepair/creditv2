"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ShieldCheck, TrendingUp } from "lucide-react";
import { BureauLogo } from "@/components/marketing/BureauLogo";
import { cn } from "@/lib/utils";

type BureauId = "equifax" | "experian" | "transunion";

type Bureau = {
  id: BureauId;
  name: string;
  short: string;
  color: string;
  accent: string;
  startScore: number;
  targetScore: number;
  disputes: number;
  removed: number;
};

const bureaus: Bureau[] = [
  {
    id: "equifax",
    name: "Equifax",
    short: "EQ",
    color: "#E31837",
    accent: "bg-red-500",
    startScore: 612,
    targetScore: 718,
    disputes: 4,
    removed: 2,
  },
  {
    id: "experian",
    name: "Experian",
    short: "EX",
    color: "#1D4F91",
    accent: "bg-blue-600",
    startScore: 598,
    targetScore: 704,
    disputes: 3,
    removed: 1,
  },
  {
    id: "transunion",
    name: "TransUnion",
    short: "TU",
    color: "#00A3E0",
    accent: "bg-sky-500",
    startScore: 605,
    targetScore: 726,
    disputes: 5,
    removed: 3,
  },
];

function scoreLabel(score: number) {
  if (score >= 740) return "Excellent";
  if (score >= 670) return "Good";
  if (score >= 580) return "Fair";
  return "Poor";
}

function ScoreGauge({
  score,
  target,
  color,
  active,
  compact = false,
}: {
  score: number;
  target: number;
  color: string;
  active: boolean;
  compact?: boolean;
}) {
  const pct = Math.min(100, Math.max(0, ((score - 300) / (850 - 300)) * 100));
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (pct / 100) * circumference * 0.75;

  return (
    <div
      className={cn(
        "relative shrink-0",
        compact ? "h-20 w-20" : "mx-auto h-28 w-28 sm:h-32 sm:w-32"
      )}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-[135deg]">
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          className="text-slate-100"
          strokeDasharray={`${circumference * 0.75} ${circumference}`}
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.75} ${circumference}`}
          strokeDashoffset={offset}
          className={cn("transition-all duration-1000 ease-out", active && "drop-shadow-sm")}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={cn(
            "font-bold tabular-nums text-navy transition-all duration-700",
            compact ? "text-xl" : "text-2xl sm:text-3xl",
            active && "scale-105"
          )}
        >
          {Math.round(score)}
        </span>
        <span className="text-[9px] font-medium uppercase tracking-wide text-muted sm:text-xs">
          {scoreLabel(score)}
        </span>
      </div>
      {active && (
        <span
          className={cn(
            "absolute flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg animate-bounce",
            compact ? "-right-0.5 -top-0.5 h-5 w-5" : "-right-1 -top-1 h-6 w-6"
          )}
        >
          <ArrowUpRight className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
        </span>
      )}
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold text-green-600">
        → {target}
      </span>
    </div>
  );
}

function BureauCard({
  bureau,
  score,
  isActive,
  onSelect,
  compact = false,
}: {
  bureau: Bureau;
  score: number;
  isActive: boolean;
  onSelect: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "rounded-xl border text-left transition-all duration-500",
        compact ? "w-full p-3" : "p-3 sm:p-4",
        isActive
          ? "border-orange/40 bg-orange/5 shadow-md ring-2 ring-orange/20"
          : "border-border/60 bg-white hover:border-border hover:shadow-sm"
      )}
    >
      <div className={cn("flex items-center", compact ? "mb-2" : "mb-3")}>
        <BureauLogo bureau={bureau.id} compact bare />
      </div>

      {compact ? (
        <div className="flex w-full items-center justify-between gap-4">
          <ScoreGauge
            score={score}
            target={bureau.targetScore}
            color={bureau.color}
            active={isActive}
            compact
          />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex justify-between text-[10px] text-muted">
              <span>Disputes</span>
              <span className="font-semibold text-navy">{bureau.disputes}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-1000",
                  bureau.accent,
                  isActive ? "w-full" : "w-2/3"
                )}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted">
              <span>Removed</span>
              <span className="font-semibold text-green-600">{bureau.removed}</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <ScoreGauge
            score={score}
            target={bureau.targetScore}
            color={bureau.color}
            active={isActive}
          />
          <div className="mt-3 space-y-1.5">
            <div className="flex justify-between text-[10px] text-muted sm:text-xs">
              <span>Disputes active</span>
              <span className="font-semibold text-navy">{bureau.disputes}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-1000",
                  bureau.accent,
                  isActive ? "w-full" : "w-2/3"
                )}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted sm:text-xs">
              <span>Items removed</span>
              <span className="font-semibold text-green-600">{bureau.removed}</span>
            </div>
          </div>
        </>
      )}
    </button>
  );
}

export function HeroCreditDashboard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scores, setScores] = useState(() => bureaus.map((b) => b.startScore));
  const [progress, setProgress] = useState(0);

  const active = bureaus[activeIndex];
  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const scoreGain = avgScore - Math.round(bureaus.reduce((a, b) => a + b.startScore, 0) / 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % bureaus.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const duration = 2800;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);

      setScores(
        bureaus.map((b) => b.startScore + (b.targetScore - b.startScore) * eased)
      );
      setProgress(Math.round(eased * 100));

      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div className="absolute -inset-3 rounded-3xl bg-orange/20 blur-3xl sm:-inset-6" />

      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/95 p-3 shadow-2xl backdrop-blur-sm sm:rounded-3xl sm:p-5 lg:p-6">
        <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3 sm:mb-4 sm:pb-4">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted sm:text-xs">
              Credit Repair Dashboard
            </p>
            <p className="mt-0.5 text-base font-bold text-navy sm:text-xl">
              3-Bureau Overview
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 sm:gap-2 sm:px-3 sm:py-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-green-600 sm:h-4 sm:w-4" />
            <span className="text-xs font-bold tabular-nums text-green-700 sm:text-sm">
              +{scoreGain}
            </span>
          </div>
        </div>

        {/* Mobile: bureau tabs + single card */}
        <div className="mt-3 w-full sm:hidden">
          <div className="mb-3 flex gap-2">
            {bureaus.map((bureau, i) => (
              <button
                key={bureau.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "flex h-9 min-h-9 max-h-9 flex-1 items-center justify-center overflow-hidden rounded-lg border px-2 py-1 transition-all",
                  i === activeIndex
                    ? "border-orange/40 bg-orange/10"
                    : "border-border/60 bg-white"
                )}
              >
                <BureauLogo bureau={bureau.id} size="tab" bare className="px-0.5" />
              </button>
            ))}
          </div>

          <BureauCard
            bureau={active}
            score={scores[activeIndex]}
            isActive
            onSelect={() => setActiveIndex(activeIndex)}
            compact
          />
        </div>

        {/* Desktop: all three cards */}
        <div className="mt-4 hidden gap-4 sm:grid sm:grid-cols-3">
          {bureaus.map((bureau, i) => (
            <BureauCard
              key={bureau.id}
              bureau={bureau}
              score={scores[i]}
              isActive={i === activeIndex}
              onSelect={() => setActiveIndex(i)}
            />
          ))}
        </div>

        <div className="mt-3 rounded-xl border border-border/60 bg-surface p-3 sm:mt-5 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-orange sm:h-4 sm:w-4" />
              <span className="truncate text-[11px] font-semibold text-navy sm:text-sm">
                Repair progress — {active.name}
              </span>
            </div>
            <span className="shrink-0 text-xs font-bold tabular-nums text-orange sm:text-sm">
              {progress}%
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white sm:h-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange to-orange-light transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-center sm:mt-3 sm:gap-2">
            {[
              { label: "Negative items", value: "7 → 2" },
              { label: "Avg. score", value: String(avgScore) },
              { label: "Days to goal", value: "45" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg bg-white px-1.5 py-1.5 sm:px-3 sm:py-2"
              >
                <p className="text-[9px] text-muted sm:text-xs">{stat.label}</p>
                <p className="text-xs font-bold text-navy sm:text-base">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-center gap-2 sm:mt-3">
          {bureaus.map((bureau, i) => (
            <button
              key={bureau.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Show ${bureau.name}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === activeIndex ? "w-6 bg-orange" : "w-1.5 bg-border"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
