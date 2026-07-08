import {
  Award,
  Building2,
  Clock3,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { SiteContent } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type FounderStatsGridProps = {
  company: SiteContent["company"];
  stats: SiteContent["ui"]["stats"];
  variant?: "dark" | "light";
  compact?: boolean;
  wide?: boolean;
  responsiveCompact?: boolean;
};

export function FounderStatsGrid({
  company,
  stats,
  variant = "dark",
  compact = false,
  wide = false,
  responsiveCompact = false,
}: FounderStatsGridProps) {
  const isLight = variant === "light";
  const items: {
    value: string;
    suffix?: string;
    label: string;
    detail: string;
    icon: LucideIcon;
    accent: string;
  }[] = [
    {
      value: company.yearsExperience,
      label: stats.yearsExperience,
      detail: stats.yearsDetail,
      icon: Award,
      accent: "from-orange to-orange-light",
    },
    {
      value: company.successRate,
      label: stats.successRate,
      detail: stats.successDetail,
      icon: TrendingUp,
      accent: "from-emerald-400 to-emerald-600",
    },
    {
      value: "3",
      suffix: stats.bureaus,
      label: stats.bureauCoverage,
      detail: stats.bureauDetail,
      icon: Building2,
      accent: "from-sky-400 to-sky-600",
    },
    {
      value: "45",
      suffix: stats.days,
      label: stats.disputeCycle,
      detail: stats.disputeDetail,
      icon: Clock3,
      accent: "from-violet-400 to-violet-600",
    },
  ];

  return (
    <div
      className={cn(
        "grid grid-cols-2",
        responsiveCompact ? "gap-2 sm:gap-2.5 lg:gap-4" : "gap-3 sm:gap-4",
        wide && "lg:grid-cols-4",
        compact && !responsiveCompact && "gap-2.5 sm:gap-3"
      )}
    >
      {items.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className={cn(
              "group relative overflow-hidden rounded-2xl transition-all duration-300",
              responsiveCompact && "p-3 lg:p-5",
              compact && !responsiveCompact && "p-3 sm:p-4",
              !compact && !responsiveCompact && "p-4 sm:p-5",
              isLight
                ? "border border-border bg-white shadow-sm hover:border-orange/30 hover:shadow-md"
                : "border border-white/10 bg-white/5 backdrop-blur-sm hover:border-orange/30 hover:bg-white/[0.08]"
            )}
          >
            <div
              className={cn(
                "absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-80 transition-opacity group-hover:opacity-100",
                stat.accent
              )}
            />

            <div
              className={cn(
                "flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg",
                responsiveCompact && "h-7 w-7 lg:h-10 lg:w-10",
                compact && !responsiveCompact && "h-8 w-8 sm:h-9 sm:w-9",
                !compact && !responsiveCompact && "h-9 w-9 sm:h-10 sm:w-10",
                stat.accent
              )}
            >
              <Icon
                className={cn(
                  responsiveCompact && "h-3 w-3 lg:h-[18px] lg:w-[18px]",
                  compact && !responsiveCompact && "h-3.5 w-3.5 sm:h-4 sm:w-4",
                  !compact && !responsiveCompact && "h-4 w-4 sm:h-[18px] sm:w-[18px]"
                )}
              />
            </div>

            <div
              className={cn(
                responsiveCompact && "mt-2.5 lg:mt-5",
                compact && !responsiveCompact && "mt-3",
                !compact && !responsiveCompact && "mt-4 sm:mt-5"
              )}
            >
              <p className="flex flex-wrap items-baseline gap-x-0.5 gap-y-0">
                <span
                  className={cn(
                    "font-bold leading-none",
                    responsiveCompact && "text-lg lg:text-3xl",
                    compact && !responsiveCompact && "text-xl sm:text-2xl",
                    !compact && !responsiveCompact && "text-2xl sm:text-3xl",
                    isLight ? "text-navy" : "text-white"
                  )}
                >
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span
                    className={cn(
                      "font-semibold text-orange",
                      responsiveCompact && "text-[10px] lg:text-base",
                      compact && !responsiveCompact && "text-xs sm:text-sm",
                      !compact && !responsiveCompact && "text-sm sm:text-base"
                    )}
                  >
                    {stat.suffix}
                  </span>
                )}
              </p>
              <p
                className={cn(
                  "mt-0.5 font-semibold leading-snug lg:mt-1.5",
                  responsiveCompact && "text-[10px] lg:text-sm",
                  compact && !responsiveCompact && "text-[11px] sm:text-xs",
                  !compact && !responsiveCompact && "text-xs sm:text-sm",
                  isLight ? "text-navy" : "text-white/85"
                )}
              >
                {stat.label}
              </p>
              {(!compact || responsiveCompact) && (
                <p
                  className={cn(
                    "mt-0.5 text-[10px] leading-snug lg:mt-1 lg:text-xs",
                    responsiveCompact && "hidden lg:block",
                    isLight ? "text-muted" : "text-white/50"
                  )}
                >
                  {stat.detail}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
