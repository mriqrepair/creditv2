"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileSignature,
  Gauge,
  Shield,
  UserPlus,
} from "lucide-react";
import { company } from "@/lib/content";
import { apiPost } from "@/lib/credit-repair/client-api";
import type { Client } from "@/lib/credit-repair/types";
import type { IdentityIQCreditSummary } from "@/lib/integrations/identityiq/types";
import { IdentityIQCreditStep } from "./IdentityIQCreditStep";
import { ActionButton } from "@/components/ui/ActionButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Input";
import { DatePicker } from "@/components/ui/DatePicker";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { US_STATE_OPTIONS } from "@/lib/us-states";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Welcome", icon: Shield },
  { id: 2, label: "Your Info", icon: UserPlus },
  { id: 3, label: "Consent", icon: FileSignature },
  { id: 4, label: "Credit", icon: Gauge },
  { id: 5, label: "Complete", icon: CheckCircle2 },
];

export function OnboardingWizard({ embedded = false }: { embedded?: boolean }) {
  const [step, setStep] = useState(1);
  const [client, setClient] = useState<Client | null>(null);
  const [creditSummary, setCreditSummary] = useState<IdentityIQCreditSummary | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signatureName, setSignatureName] = useState("");
  const stepTopRef = useRef<HTMLDivElement>(null);
  const isFirstStepRender = useRef(true);

  useEffect(() => {
    if (isFirstStepRender.current) {
      isFirstStepRender.current = false;
      return;
    }

    if (embedded) {
      document
        .querySelector<HTMLElement>("[data-onboarding-scroll]")
        ?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    stepTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, embedded]);

  async function handleProfileSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const created = await apiPost<Client>("/api/credit/clients", {
        ...payload,
        created_by: "onboarding",
      });
      setClient(created);
      setSignatureName(`${created.first_name} ${created.last_name}`.trim());
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save your information");
    } finally {
      setLoading(false);
    }
  }

  async function handleConsent() {
    if (!client || !signatureName.trim()) return;
    setLoading(true);
    setError(null);

    try {
      await apiPost("/api/credit/consent", {
        client_id: client.id,
        signature_name: signatureName.trim(),
        form_type: "credit_repair_authorization",
        actor: "client",
      });
      setStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign consent");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!embedded && (
        <PageHero
          eyebrow="Get Started"
          title="Start Your Credit Repair Journey"
          description={`Join ${company.name} in minutes. Create your profile, connect IdentityIQ for 3-bureau scores, and access your dashboard.`}
        />
      )}

      {embedded && (
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-orange">
            Get Started
          </p>
          <h2 className="mt-1 text-xl font-bold text-navy sm:text-2xl">
            Start Your Credit Repair Journey
          </h2>
          <p className="mt-2 text-sm text-muted">
            Join {company.name} in minutes. Create your profile and access your
            dashboard.
          </p>
        </div>
      )}

      <Section className={embedded ? "py-0" : "bg-surface"}>
        <Container narrow>
          <div
            ref={stepTopRef}
            className={
              embedded
                ? undefined
                : "scroll-mt-[calc(4.5rem+env(safe-area-inset-top,0px))]"
            }
          />
          <ol className="mb-8 flex items-center justify-between gap-1 sm:gap-2">
            {steps.map((item) => {
              const Icon = item.icon;
              const active = step === item.id;
              const done = step > item.id;

              return (
                <li key={item.id} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors sm:h-10 sm:w-10",
                      done && "border-green-500 bg-green-500 text-white",
                      active && !done && "border-orange bg-orange text-white",
                      !active && !done && "border-border bg-white text-muted"
                    )}
                  >
                    {done ? <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" /> : <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                  </div>
                  <span
                    className={cn(
                      "hidden text-[10px] font-medium sm:block sm:text-xs",
                      active ? "text-navy" : "text-muted"
                    )}
                  >
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ol>

          {step === 1 && (
            <Card title="What happens next">
              <ul className="space-y-4 text-sm leading-relaxed text-foreground/80">
                {[
                  "Tell us about yourself so we can open your client file.",
                  "Sign the credit repair authorization consent form.",
                  "Connect IdentityIQ to pull your 3-bureau scores and credit history.",
                  "Review imported negative items and track disputes in your dashboard.",
                ].map((text, i) => (
                  <li key={text} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange/10 text-xs font-bold text-orange">
                      {i + 1}
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted">
                Takes about 5 minutes. IdentityIQ provides Experian, Equifax, and
                TransUnion monitoring.
              </p>
              <ActionButton className="mt-6" onClick={() => setStep(2)}>
                Continue
                <ArrowRight className="h-4 w-4" />
              </ActionButton>
            </Card>
          )}

          {step === 2 && (
            <Card title="Your Information" description="We use this to create your client profile.">
              <form onSubmit={handleProfileSubmit} className="grid gap-4 sm:grid-cols-2">
                <Input label="First Name *" name="first_name" required />
                <Input label="Last Name *" name="last_name" required />
                <Input label="Email *" name="email" type="email" required className="sm:col-span-2" />
                <PhoneInput label="Phone" name="phone" />
                <Input label="SSN Last 4" name="ssn_last4" maxLength={4} />
                <DatePicker
                  label="Date of Birth"
                  name="date_of_birth"
                  placeholder="Select date of birth"
                />
                <Input label="Address Line 1" name="address_line1" className="sm:col-span-2" />
                <Input label="City" name="city" />
                <Select label="State" name="state" options={US_STATE_OPTIONS} />
                <Input label="ZIP" name="zip" />
                <div className="flex flex-wrap gap-3 sm:col-span-2">
                  <ActionButton type="button" variant="outline" onClick={() => setStep(1)}>
                    Back
                  </ActionButton>
                  <ActionButton type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Continue"}
                  </ActionButton>
                </div>
                {error && <p className="text-sm text-red-600 sm:col-span-2">{error}</p>}
              </form>
            </Card>
          )}

          {step === 3 && client && (
            <Card title="Credit Repair Authorization" description="Required before we pull your credit profile.">
              <div className="rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-foreground/80">
                <p className="font-semibold text-navy">Authorization & Consent</p>
                <p className="mt-2">
                  I authorize {company.name} to review my credit reports via IdentityIQ,
                  identify inaccurate information, and submit disputes on my behalf under
                  the Fair Credit Reporting Act.
                </p>
              </div>
              <div className="mt-4">
                <Input
                  label="Type your full name to sign"
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <ActionButton type="button" variant="outline" onClick={() => setStep(2)}>
                  Back
                </ActionButton>
                <ActionButton
                  onClick={handleConsent}
                  disabled={loading || !signatureName.trim()}
                >
                  {loading ? "Signing..." : "Sign & Continue"}
                </ActionButton>
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </Card>
          )}

          {step === 4 && client && (
            <IdentityIQCreditStep
              clientId={client.id}
              onBack={() => setStep(3)}
              onComplete={(summary) => {
                setCreditSummary(summary);
                setStep(5);
              }}
            />
          )}

          {step === 5 && client && (
            <Card title="You're all set!" description="Your onboarding is complete.">
              <p className="text-sm leading-relaxed text-muted">
                Welcome, {client.first_name}! Your profile is ready
                {creditSummary
                  ? ` with an average score of ${creditSummary.averageScore}`
                  : ""}
                . Head to your dashboard to review negative items and track dispute
                progress.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={`/dashboard/credit-repair?clientId=${client.id}`}
                  size="md"
                >
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/pricing" variant="outline" size="md">
                  View Plans
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted">
                Questions?{" "}
                <Link href="/contact" className="font-medium text-orange hover:underline">
                  Contact our team
                </Link>
              </p>
            </Card>
          )}
        </Container>
      </Section>
    </>
  );
}
