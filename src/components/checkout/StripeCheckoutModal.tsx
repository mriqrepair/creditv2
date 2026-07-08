"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  ShieldCheck,
  X,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { CheckoutPlan } from "@/lib/checkout/types";
import { cn } from "@/lib/utils";

type StripeCheckoutModalProps = {
  plan: CheckoutPlan | null;
  onClose: () => void;
};

type Step = "form" | "processing" | "success";

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function StripeWordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 25"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-auto", className)}
      aria-label="Stripe"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M59.64 14.28h-8.06c0 3.28-1.92 5.04-4.95 5.04-3.18 0-5.13-2.36-5.13-6.14 0-3.9 1.95-6.22 5.25-6.22 2.55 0 4.34 1.5 4.8 3.9h4.4c-.64-4.65-4.41-7.53-9.24-7.53-5.58 0-9.48 4.05-9.48 9.75 0 5.64 3.84 9.69 9.36 9.69 5.28 0 8.88-3.45 9.12-8.52ZM40.95 20.3V5.45h-4.08v14.85h4.08Zm-6.18 0h-4.08V5.45h4.08v14.85ZM25.74 5.45h-4.2v1.35c-1.05-.99-2.49-1.59-4.08-1.59-3.72 0-6.54 3.03-6.54 7.05 0 4.05 2.82 7.05 6.54 7.05 1.59 0 3.03-.6 4.08-1.59v1.35h4.2V5.45Zm-3.72 11.1c-2.1 0-3.54-1.68-3.54-4.05 0-2.4 1.44-4.05 3.54-4.05 2.07 0 3.51 1.65 3.51 4.05 0 2.37-1.44 4.05-3.51 4.05ZM6.06 5.45H1.86L0 20.3h4.08l1.86-14.85Z"
      />
    </svg>
  );
}

export function StripeCheckoutModal({ plan, onClose }: StripeCheckoutModalProps) {
  const { content } = useLanguage();
  const { company, ui } = content;
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [couples, setCouples] = useState(false);
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");

  const open = plan !== null;
  const monthlyPrice = couples && plan ? plan.couplesPrice : plan?.price ?? 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    setStep("form");
    setCouples(false);
    setEmail("");
    setCardNumber("");
    setExpiry("");
    setCvc("");
    setName("");
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, plan?.slug]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step !== "processing") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, step]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("processing");
    window.setTimeout(() => setStep("success"), 2200);
  }

  if (!open || !mounted || !plan) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex flex-col bg-white">
      <header className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={onClose}
          disabled={step === "processing"}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-navy disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          {ui.checkout.back}
        </button>
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt={company.name}
            width={32}
            height={28}
            className="h-7 w-auto"
          />
          <span className="text-sm font-bold text-navy">
            <span className="text-navy">MR.</span>
            <span className="text-orange">IQ</span>
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          disabled={step === "processing"}
          className="rounded-lg p-1.5 text-muted hover:bg-surface disabled:opacity-50"
          aria-label={ui.common.closeMenu}
        >
          <X className="h-5 w-5" />
        </button>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside className="shrink-0 bg-[#0a2540] px-5 py-8 text-white sm:px-8 lg:w-[42%] lg:px-10 lg:py-12">
          <p className="text-sm font-medium text-white/70">{company.name}</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{plan.name}</h2>
          <p className="mt-1 text-sm text-white/60">{plan.updateCycle}</p>

          <div className="mt-8 flex items-end gap-1">
            <span className="text-4xl font-bold tracking-tight sm:text-5xl">
              ${monthlyPrice}
            </span>
            <span className="pb-1.5 text-sm text-white/70">
              {ui.checkout.perMonth}
            </span>
          </div>

          <p className="mt-3 text-sm text-white/60">{ui.checkout.billedMonthly}</p>

          <div className="mt-8 space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">{ui.checkout.subscription}</span>
              <span>${monthlyPrice}{ui.checkout.perMonth}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">{ui.checkout.trial}</span>
              <span className="font-medium text-green-300">{ui.checkout.trialFree}</span>
            </div>
            <div className="border-t border-white/10 pt-3">
              <div className="flex items-center justify-between font-semibold">
                <span>{ui.checkout.dueToday}</span>
                <span className="text-lg">$0.00</span>
              </div>
              <p className="mt-1 text-xs text-white/50">{ui.checkout.trialChargeNote}</p>
            </div>
          </div>

          <p className="mt-6 flex items-center gap-2 text-xs text-white/45">
            <Lock className="h-3.5 w-3.5" />
            {ui.checkout.secureNote}
          </p>
        </aside>

        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#f6f9fc] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          {step === "success" ? (
            <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-9 w-9 text-green-600" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-[#0a2540]">
                {ui.checkout.successTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#425466]">
                {ui.checkout.successDescription.replace("{plan}", plan.name)}
              </p>
              <div className="mt-8 w-full space-y-3">
                <Link
                  href="/onboarding"
                  className="inline-flex w-full items-center justify-center rounded-md bg-[#635bff] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5851ea]"
                >
                  {ui.checkout.continueOnboarding}
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full text-sm font-medium text-[#635bff] hover:underline"
                >
                  {ui.checkout.close}
                </button>
              </div>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-md">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#0a2540]">
                  {ui.checkout.payWithCard}
                </h3>
                <span className="rounded-full bg-[#635bff]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#635bff]">
                  {ui.checkout.simulatorBadge}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-[#30313d]">
                    {ui.checkout.email}
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={step === "processing"}
                    className="w-full rounded-md border border-[#e6e6e6] bg-white px-3 py-2.5 text-sm text-[#30313d] shadow-sm outline-none transition focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/20 disabled:opacity-60"
                  />
                </label>

                <label className="flex cursor-pointer items-center gap-2.5 rounded-md border border-[#e6e6e6] bg-white px-3 py-3 shadow-sm">
                  <input
                    type="checkbox"
                    checked={couples}
                    onChange={(e) => setCouples(e.target.checked)}
                    disabled={step === "processing"}
                    className="h-4 w-4 rounded border-[#e6e6e6] text-[#635bff] focus:ring-[#635bff]"
                  />
                  <span className="text-sm text-[#30313d]">
                    {ui.checkout.couplesPlan}{" "}
                    <span className="font-semibold">
                      ${plan.couplesPrice}{ui.checkout.perMonth}
                    </span>
                  </span>
                </label>

                <div>
                  <span className="mb-1.5 block text-sm font-medium text-[#30313d]">
                    {ui.checkout.cardInfo}
                  </span>
                  <div className="overflow-hidden rounded-md border border-[#e6e6e6] bg-white shadow-sm focus-within:border-[#635bff] focus-within:ring-2 focus-within:ring-[#635bff]/20">
                    <div className="flex items-center border-b border-[#e6e6e6] px-3">
                      <CreditCard className="h-4 w-4 shrink-0 text-[#8898aa]" />
                      <input
                        type="text"
                        inputMode="numeric"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="1234 1234 1234 1234"
                        disabled={step === "processing"}
                        className="w-full border-0 bg-transparent px-3 py-2.5 text-sm outline-none disabled:opacity-60"
                      />
                    </div>
                    <div className="grid grid-cols-2">
                      <input
                        type="text"
                        inputMode="numeric"
                        required
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        placeholder="MM / YY"
                        disabled={step === "processing"}
                        className="border-0 border-r border-[#e6e6e6] bg-transparent px-3 py-2.5 text-sm outline-none disabled:opacity-60"
                      />
                      <input
                        type="text"
                        inputMode="numeric"
                        required
                        value={cvc}
                        onChange={(e) =>
                          setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                        }
                        placeholder="CVC"
                        disabled={step === "processing"}
                        className="border-0 bg-transparent px-3 py-2.5 text-sm outline-none disabled:opacity-60"
                      />
                    </div>
                  </div>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-[#30313d]">
                    {ui.checkout.nameOnCard}
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    disabled={step === "processing"}
                    className="w-full rounded-md border border-[#e6e6e6] bg-white px-3 py-2.5 text-sm text-[#30313d] shadow-sm outline-none transition focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/20 disabled:opacity-60"
                  />
                </label>

                <button
                  type="submit"
                  disabled={step === "processing"}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-[#635bff] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#5851ea] disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {step === "processing" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {ui.checkout.processing}
                    </>
                  ) : (
                    ui.checkout.subscribe.replace("{amount}", `$${monthlyPrice}`)
                  )}
                </button>

                <p className="text-center text-xs leading-relaxed text-[#8898aa]">
                  {ui.checkout.termsNote}
                </p>
              </form>

              <div className="mt-8 flex flex-col items-center gap-2 border-t border-[#e6e6e6] pt-6">
                <div className="flex items-center gap-2 text-[#8898aa]">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-xs">{ui.checkout.poweredBy}</span>
                  <StripeWordmark className="text-[#635bff]" />
                </div>
                <p className="text-[10px] text-[#8898aa]">{ui.checkout.simulatorNote}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>,
    document.body
  );
}
