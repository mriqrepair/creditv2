"use client";

import { useState } from "react";
import {
  Building2,
  Check,
  FileSearch,
  MessageCircle,
  Send,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

const serviceIcons: LucideIcon[] = [
  FileSearch,
  Send,
  MessageCircle,
  TrendingUp,
  ShieldCheck,
  Building2,
];

const accents = [
  "from-navy to-navy-light",
  "from-orange to-orange-light",
  "from-navy to-navy-light",
  "from-orange to-orange-dark",
  "from-navy to-navy-light",
  "from-orange to-orange-light",
];

export function ServicesShowcaseMobile() {
  const { content } = useLanguage();
  const { services, ui } = content;
  const [activeIndex, setActiveIndex] = useState(0);
  const service = services[activeIndex];
  const Icon = serviceIcons[activeIndex];

  return (
    <div className="md:hidden">
      <div className="grid grid-cols-3 gap-1.5 rounded-2xl border border-border bg-white p-1.5 shadow-sm">
        {services.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "rounded-xl px-2 py-2.5 text-center text-[11px] font-semibold leading-tight transition-all",
              index === activeIndex
                ? "bg-navy text-white shadow-md"
                : "text-muted hover:text-navy"
            )}
          >
            {ui.services.tabLabels[index]}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-white shadow-md">
        <div
          className={cn(
            "bg-gradient-to-br px-5 py-5 text-white",
            accents[activeIndex]
          )}
        >
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/75">
                {ui.services.included}
              </p>
              <h3 className="mt-0.5 text-lg font-bold leading-tight">
                {service.title}
              </h3>
            </div>
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm leading-relaxed text-muted">
            {service.description}
          </p>
          <p className="mt-4 text-sm font-semibold text-navy">{ui.services.whatYouGet}</p>
          <ul className="mt-3 space-y-2.5">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <span className="text-foreground/80">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-1.5">
        {services.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`View ${item.title}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              index === activeIndex
                ? "w-5 bg-orange"
                : "w-1.5 bg-border hover:bg-orange/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
