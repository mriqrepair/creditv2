"use client";

import { Star, TrendingUp, Zap, type LucideIcon } from "lucide-react";
import { DifferentiatorCarousel } from "@/components/marketing/DifferentiatorCarousel";
import { useLanguage } from "@/components/providers/LanguageProvider";

const icons: LucideIcon[] = [Zap, TrendingUp, Star];

export function DifferentiatorCards() {
  const { content } = useLanguage();
  const { differentiators } = content;

  return (
    <>
      <DifferentiatorCarousel />

      {/* Desktop: existing grid */}
      <div className="mt-10 hidden gap-5 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {differentiators.map((item, i) => {
          const Icon = icons[i];
          return (
            <div
              key={item.title}
              className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:border-orange/30 hover:shadow-md sm:p-8"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-orange/10 group-hover:text-orange sm:mb-4 sm:h-12 sm:w-12">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="text-lg font-bold text-navy sm:text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-3">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
