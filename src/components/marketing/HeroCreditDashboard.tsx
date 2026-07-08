"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ShieldCheck, TrendingUp } from "lucide-react";
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
}: {
  score: number;
  target: number;
  color: string;
  active: boolean;
}) {
  const pct = Math.min(100, Math.max(0, ((score - 300) / (850 - 300)) * 100));
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (pct / 100) * circumference * 0.75;

  return (
    <div className="relative mx-auto h-28 w-28 sm:h-32 sm:w-32">
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
            "text-2xl font-bold tabular-nums text-navy transition-all duration-700 sm:text-3xl",
            active && "scale-105"
          )}
        >
          {Math.round(score)}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wide text-muted sm:text-xs">
          {scoreLabel(score)}
        </span>
      </div>
      {active && (
        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white shadow-lg animate-bounce">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      )}
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold text-green-600">
        → {target}
      </span>
    </div>
  );
}

export function HeroCreditDashboard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scores, setScores] = useState(() => bureaus.map((b) => b.startScore));
  const [progress, setProgress] = useState(0);

  const active = bureaus[activeIndex];
  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

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
    <div className="relative w-full max-w-lg lg:max-w-none">
      <div className="absolute -inset-4 rounded-3xl bg-orange/20 blur-3xl sm:-inset-6" />

      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/95 p-4 shadow-2xl backdrop-blur-sm sm:rounded-3xl sm:p-5 lg:p-6">
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-border/60 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Credit Repair Dashboard
            </p>
            <p className="mt-0.5 text-lg font-bold text-navy sm:text-xl">
              3-Bureau Overview
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-bold tabular-nums text-green-700">
              +{avgScore - Math.round(bureaus.reduce((a, b) => a + b.startScore, 0) / 3)}
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {bureaus.map((bureau, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={bureau.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "rounded-xl border p-3 text-left transition-all duration-500 sm:p-4",
                  isActive
                    ? "border-orange/40 bg-orange/5 shadow-md ring-2 ring-orange/20"
                    : "border-border/60 bg-white hover:border-border hover:shadow-sm"
                )}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold text-white sm:h-8 sm:w-8 sm:text-xs"
                    style={{ backgroundColor: bureau.color }}
                  >
                    {bureau.short}
                  </span>
                  <span className="text-xs font-semibold text-navy sm:text-sm">
                    {bureau.name}
                  </span>
                </div>
                <ScoreGauge
                  score={scores[i]}
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
              </button>
            );
          })}
        </div>

        <div className="mt-4 rounded-xl border border-border/60 bg-surface p-3 sm:mt-5 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-orange" />
              <span className="text-xs font-semibold text-navy sm:text-sm">
                Repair progress — {active.name}
              </span>
            </div>
            <span className="text-sm font-bold tabular-nums text-orange">{progress}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange to-orange-light transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            {[
              { label: "Negative items", value: "7 → 2" },
              { label: "Avg. score", value: String(avgScore) },
              { label: "Days to goal", value: "45" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg bg-white px-2 py-2 sm:px-3"
              >
                <p className="text-[10px] text-muted sm:text-xs">{stat.label}</p>
                <p className="text-sm font-bold text-navy sm:text-base">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2">
          {bureaus.map((bureau, i) => (
            <span
              key={bureau.id}
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
