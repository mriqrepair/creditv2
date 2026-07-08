"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SubscribeButton } from "@/components/checkout/SubscribeButton";
import { cn } from "@/lib/utils";

export function PricingPlansMobile() {
  const { content } = useLanguage();
  const { pricingPlans, ui } = content;
  const defaultPlanIndex = Math.max(
    0,
    pricingPlans.findIndex((plan) => plan.popular)
  );
  const [activeIndex, setActiveIndex] = useState(defaultPlanIndex);
  const [expanded, setExpanded] = useState(false);

  const plan = pricingPlans[activeIndex];
  const visibleFeatures = expanded ? plan.features : plan.features.slice(0, 4);
  const hiddenCount = plan.features.length - 4;

  return (
    <div className="mt-8 md:hidden">
      <div className="flex gap-2 rounded-2xl border border-border bg-white p-1.5 shadow-sm">
        {pricingPlans.map((item, index) => (
          <button
            key={item.name}
            type="button"
            onClick={() => {
              setActiveIndex(index);
              setExpanded(false);
            }}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1.5 py-2 text-center transition-all",
              index === activeIndex
                ? "bg-navy text-white shadow-md"
                : "text-muted hover:text-navy"
            )}
          >
            {item.popular ? (
              <span className="max-w-full truncate rounded-full bg-orange px-1.5 py-0.5 text-[7px] font-bold uppercase leading-none tracking-wide whitespace-nowrap text-white">
                {ui.pricing.mostPopular}
              </span>
            ) : (
              <span className="h-[14px]" aria-hidden />
            )}
            <span className="text-[11px] font-semibold leading-tight">{item.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-white shadow-md">
        <div
          className={cn(
            "bg-gradient-to-br px-5 py-6 text-white",
            plan.popular ? "from-orange to-orange-dark" : "from-navy to-navy-light"
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
            {plan.updateCycle}
          </p>
          <h3 className="mt-1 text-2xl font-bold">{plan.name}</h3>
          <div className="mt-3 flex items-end gap-1">
            <span className="text-4xl font-bold leading-none">${plan.price}</span>
            <span className="pb-1 text-sm text-white/80">/{ui.common.month}</span>
          </div>
          <p className="mt-2 text-sm text-white/85">
            {ui.pricing.couplesLabel}{" "}
            <span className="font-semibold">${plan.couplesPrice}/{ui.common.month}</span>
          </p>
        </div>

        <div className="p-5">
          <p className="text-sm font-semibold text-navy">{ui.pricing.whatsIncluded}</p>
          <ul className="mt-3 space-y-2.5">
            {visibleFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <span className="text-foreground/80">{feature}</span>
              </li>
            ))}
            <li className="flex items-start gap-2.5 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
              <span className="font-medium text-navy">{plan.updateCycle}</span>
            </li>
          </ul>

          {hiddenCount > 0 && (
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="mt-3 flex w-full items-center justify-center gap-1 text-sm font-semibold text-orange"
            >
              {expanded
                ? ui.pricing.showLess
                : ui.pricing.showMore.replace("{count}", String(hiddenCount))}
              <ChevronDown
                className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
              />
            </button>
          )}

          <SubscribeButton
            name={plan.name}
            price={plan.price}
            couplesPrice={plan.couplesPrice}
            updateCycle={plan.updateCycle}
            variant={plan.popular ? "primary" : "outline"}
            className="mt-5 w-full"
          >
            {ui.common.getStarted}
          </SubscribeButton>

          <p className="mt-3 text-center text-xs text-muted">
            {ui.pricing.trialNote}
          </p>
        </div>
      </div>
    </div>
  );
}
