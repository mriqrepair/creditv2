"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const locales: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "es", label: "ES" },
];

type LanguageToggleProps = {
  className?: string;
  compact?: boolean;
};

export function LanguageToggle({ className, compact }: LanguageToggleProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface p-0.5",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => setLocale(item.value)}
          className={cn(
            "rounded-full font-semibold transition-all",
            compact ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs",
            locale === item.value
              ? "bg-navy text-white shadow-sm"
              : "text-muted hover:text-navy"
          )}
          aria-pressed={locale === item.value}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
