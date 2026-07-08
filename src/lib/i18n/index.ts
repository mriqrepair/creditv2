import { en } from "./en";
import { es } from "./es";
import type { Locale, SiteContent } from "./types";

export const LOCALE_COOKIE = "mr-iq-locale";
export const DEFAULT_LOCALE: Locale = "en";

const content: Record<Locale, SiteContent> = { en, es };

export function getContent(locale: Locale): SiteContent {
  return content[locale] ?? content[DEFAULT_LOCALE];
}

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "es";
}

export type { Locale, SiteContent } from "./types";
