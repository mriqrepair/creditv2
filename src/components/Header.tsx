"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LoginModal } from "@/components/auth/LoginModal";
import { company, navLinks } from "@/lib/content";
import { AuthButton } from "@/components/ui/AuthButton";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

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
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2 sm:gap-3"
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

        <nav className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface hover:text-navy lg:px-3"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex xl:gap-3">
            <AuthButton
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => setLoginOpen(true)}
            >
              Login
            </AuthButton>
            <Button href="/onboarding" size="sm" className="hidden sm:inline-flex">
              Get Started
            </Button>
          </div>

          <Button
            href="/onboarding"
            size="sm"
            className="inline-flex sm:hidden"
          >
            Start
          </Button>

          <button
            type="button"
            className="rounded-lg p-2 text-navy xl:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
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
            ? "max-h-[calc(100dvh-3.5rem)] overflow-y-auto opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        )}
      >
        <nav className="flex flex-col gap-0.5 px-4 py-3 pb-6">
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
          <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
            <AuthButton
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                setOpen(false);
                setLoginOpen(true);
              }}
            >
              Login
            </AuthButton>
            <Button
              href="/onboarding"
              size="sm"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </nav>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
}
