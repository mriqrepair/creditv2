"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, Menu, Shield, X } from "lucide-react";
import { LoginModal } from "@/components/auth/LoginModal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { AuthButton } from "@/components/ui/AuthButton";
import { Button } from "@/components/ui/Button";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { cn } from "@/lib/utils";

const DESKTOP_HIDDEN_NAV_HREFS = new Set(["/faq", "/guarantee"]);
const ADMIN_HREF = "/dashboard/credit-repair";

export function Header() {
  const { content } = useLanguage();
  const { company, navLinks, ui } = content;
  const desktopNavLinks = navLinks.filter(
    (link) => !DESKTOP_HIDDEN_NAV_HREFS.has(link.href)
  );
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-white/95 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="hidden min-w-0 shrink items-center gap-2 sm:gap-3 lg:flex"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/logo.png"
              alt={`${company.name} - ${company.tagline}`}
              width={52}
              height={44}
              className="h-9 w-auto shrink-0 object-contain sm:h-11"
            />
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate text-lg font-bold leading-tight tracking-tight sm:text-xl">
                <span className="text-navy">MR.</span>
                <span className="text-orange">IQ</span>
              </span>
              <p className="m-0 hidden truncate text-xs font-medium uppercase leading-tight tracking-[0.15em] text-muted sm:block">
                {company.tagline}
              </p>
            </div>
          </Link>

          <LanguageToggle compact className="inline-flex lg:hidden" />
        </div>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {desktopNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface hover:text-navy lg:px-3"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">

          <div className="hidden items-center gap-2 sm:flex xl:gap-3">
            <AuthButton
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => setLoginOpen(true)}
            >
              {ui.common.login}
            </AuthButton>
            <Button href="/onboarding" size="sm" className="hidden sm:inline-flex">
              {ui.common.getStarted}
            </Button>
          </div>

          <Button
            href="/onboarding"
            size="sm"
            className="inline-flex sm:hidden"
          >
            {ui.common.start}
          </Button>

          <button
            type="button"
            className="rounded-lg p-2 text-navy xl:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? ui.common.closeMenu : ui.common.openMenu}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-border bg-white transition-[max-height,opacity] duration-300 ease-in-out xl:hidden",
          open
            ? "max-h-[calc(100dvh-3.5rem-env(safe-area-inset-top,0px))] overflow-y-auto opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        )}
      >
        <nav className="flex flex-col gap-0.5 px-4 py-3 pb-6">
          {!isHome && (
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-foreground/80 active:bg-surface"
            >
              <Home className="h-4 w-4 text-orange" />
              {ui.common.home}
            </Link>
          )}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-foreground/80 active:bg-surface"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={ADMIN_HREF}
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-3 text-sm font-semibold text-navy active:bg-border/40"
          >
            <Shield className="h-4 w-4 text-orange" />
            {ui.common.admin}
          </Link>
          <div className="mt-3 flex flex-row gap-2 border-t border-border pt-4">
            <AuthButton
              variant="outline"
              size="sm"
              className="min-w-0 flex-1"
              onClick={() => {
                setOpen(false);
                setLoginOpen(true);
              }}
            >
              {ui.common.login}
            </AuthButton>
            <Button
              href="/onboarding"
              size="sm"
              className="min-w-0 flex-1"
              onClick={() => setOpen(false)}
            >
              {ui.common.getStarted}
            </Button>
          </div>
        </nav>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
    <div
      aria-hidden
      className="pointer-events-none h-[calc(3.5rem+env(safe-area-inset-top,0px))] shrink-0 sm:h-[calc(4.5rem+env(safe-area-inset-top,0px))]"
    />
    </>
  );
}
