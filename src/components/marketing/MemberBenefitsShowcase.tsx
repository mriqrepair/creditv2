import {
  Headphones,
  Mail,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { SiteContent } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const benefitIcons: LucideIcon[] = [
  Zap,
  SlidersHorizontal,
  TrendingUp,
  RefreshCw,
  ShieldCheck,
  Mail,
  Headphones,
];

const iconColors = [
  "bg-orange/10 text-orange",
  "bg-navy/10 text-navy",
  "bg-green-100 text-green-700",
  "bg-sky-100 text-sky-700",
  "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
];

type MemberBenefitsShowcaseProps = {
  memberBenefits: SiteContent["memberBenefits"];
  ui: SiteContent["ui"]["memberBenefits"];
};

export function MemberBenefitsShowcase({
  memberBenefits,
  ui,
}: MemberBenefitsShowcaseProps) {
  return (
    <>
      <div className="mt-8 md:hidden">
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-md">
          <div className="bg-gradient-to-r from-navy to-navy-light px-5 py-4">
            <p className="text-sm font-semibold text-white">{ui.panelTitle}</p>
            <p className="mt-1 text-xs text-white/75">
              {ui.panelSubtitle.replace("{count}", String(memberBenefits.length))}
            </p>
          </div>
          <ul className="divide-y divide-border/70">
            {memberBenefits.map((benefit, i) => {
              const Icon = benefitIcons[i];
              return (
                <li key={benefit.title} className="flex items-center gap-3 px-4 py-3.5">
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                      iconColors[i]
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-navy">{benefit.title}</p>
                    <p className="text-xs text-muted">{benefit.detail}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-6 text-center">
          <Button href="/services" variant="outline" className="w-full">
            {ui.seeAllServices}
          </Button>
        </div>
      </div>

      <div className="mt-10 hidden gap-4 sm:mt-14 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {memberBenefits.map((benefit, i) => {
          const Icon = benefitIcons[i];
          return (
            <div
              key={benefit.title}
              className="group rounded-2xl border border-border bg-white p-5 shadow-sm transition-all hover:border-orange/25 hover:shadow-md"
            >
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-105",
                  iconColors[i]
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="mt-4 text-base font-bold text-navy">{benefit.title}</h4>
              <p className="mt-1.5 text-sm text-muted">{benefit.detail}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-8 hidden text-center md:block">
        <Button href="/services" variant="outline">
          {ui.seeAllServices}
        </Button>
      </div>
    </>
  );
}
