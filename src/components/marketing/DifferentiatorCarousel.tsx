"use client";

import { useEffect, useRef, useState } from "react";
import { Star, TrendingUp, Zap, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

const icons: LucideIcon[] = [Zap, TrendingUp, Star];

const accents = [
  "from-orange to-orange-light",
  "from-navy to-navy-light",
  "from-orange-dark to-orange",
];

export function DifferentiatorCarousel() {
  const { content } = useLanguage();
  const { differentiators } = content;
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % differentiators.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [inView]);

  function goToIndex(index: number) {
    setActiveIndex(index);
  }

  return (
    <div ref={rootRef} className="mt-8 sm:hidden">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {differentiators.map((item, i) => {
            const Icon = icons[i];
            const isActive = i === activeIndex;

            return (
              <article
                key={item.title}
                className="w-full shrink-0 px-0.5"
                aria-hidden={!isActive}
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-2xl border bg-white shadow-md transition-all duration-500",
                    isActive
                      ? "border-orange/30 shadow-lg ring-2 ring-orange/10"
                      : "border-border/80"
                  )}
                >
                  <div className={cn("h-1.5 bg-gradient-to-r", accents[i])} />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-500",
                          accents[i],
                          isActive && "scale-105"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-surface px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-navy">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {differentiators.map((item, i) => (
          <button
            key={item.title}
            type="button"
            aria-label={`Go to ${item.title}`}
            onClick={() => goToIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === activeIndex ? "w-6 bg-orange" : "w-1.5 bg-border"
            )}
          />
        ))}
      </div>
    </div>
  );
}
