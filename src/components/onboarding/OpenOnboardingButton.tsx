"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { cn } from "@/lib/utils";

type OnboardingModalProps = {
  open: boolean;
  onClose: () => void;
};

export function OnboardingModal({ open, onClose }: OnboardingModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex flex-col bg-white">
      <header className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3 sm:px-6">
        <p className="text-sm font-bold text-navy">
          <span className="text-navy">MR.</span>
          <span className="text-orange">IQ</span>
          <span className="ml-2 font-medium text-muted">Onboarding</span>
        </p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface hover:text-navy"
          aria-label="Close onboarding"
        >
          <X className="h-5 w-5" />
        </button>
      </header>

      <div
        data-onboarding-scroll
        className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8"
      >
        <div className="mx-auto max-w-2xl">
          <OnboardingWizard embedded />
        </div>
      </div>
    </div>,
    document.body
  );
}

type OpenOnboardingButtonProps = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base",
  lg: "w-full px-6 py-3.5 text-base sm:w-auto sm:px-8 sm:py-4 sm:text-lg",
};

export function OpenOnboardingButton({
  children,
  className,
  size = "md",
}: OpenOnboardingButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 bg-orange text-white hover:bg-orange-dark shadow-lg shadow-orange/25",
          sizes[size],
          className
        )}
      >
        {children}
      </button>
      <OnboardingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
