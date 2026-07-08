"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

type Mode = "login" | "signup";

type Props = {
  open: boolean;
  onClose: () => void;
};

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="currentColor"
        d="M17.05 20.28c-.98.95-2.05 1.88-3.71 1.9-1.6.02-2.11-.95-3.96-.95-1.85 0-2.43.92-3.96.97-1.59.05-2.8-1.61-3.78-2.56C1.11 15.56.07 11.28 2.38 8.63c1.15-1.33 3.2-2.12 5.12-2.15 1.6-.03 3.11 1.07 3.96 1.07.85 0 2.43-1.32 4.09-1.13.7.03 2.66.28 3.92 2.11-3.32 1.8-2.79 6.47.53 7.75-.66 1.72-1.54 3.42-3.05 5.1zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
      />
    </svg>
  );
}

const oauthButtonClass =
  "flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-surface disabled:opacity-60";

export function LoginModal({ open, onClose }: Props) {
  const router = useRouter();
  const { content } = useLanguage();
  const { ui } = content;
  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  function resetState() {
    setError(null);
    setMessage(null);
    setLoading(false);
  }

  function handleClose() {
    resetState();
    setMode("login");
    onClose();
  }

  function toggleMode() {
    resetState();
    setMode((current) => (current === "login" ? "signup" : "login"));
  }

  async function handleOAuth(provider: "google" | "apple") {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback`;

      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
          queryParams:
            provider === "google" && mode === "signup"
              ? { prompt: "select_account" }
              : undefined,
        },
      });

      if (oauthError) throw oauthError;
    } catch (err) {
      setError(err instanceof Error ? err.message : "OAuth sign-in failed");
      setLoading(false);
    }
  }

  async function handleEmailSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const firstName = String(form.get("first_name") ?? "").trim();
    const lastName = String(form.get("last_name") ?? "").trim();

    try {
      const supabase = createClient();

      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
              full_name: `${firstName} ${lastName}`.trim(),
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (signUpError) throw signUpError;

        if (data.session) {
          handleClose();
          router.push("/onboarding");
          router.refresh();
          return;
        }

        setMessage(ui.auth.checkEmail);
        setMode("login");
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      handleClose();
      router.push("/dashboard/credit-repair");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={mode === "login" ? ui.auth.welcomeBack : ui.auth.createProfile}
      className="max-w-md"
    >
      <p className="-mt-2 mb-5 text-sm text-muted">
        {mode === "login" ? ui.auth.loginSubtitle : ui.auth.signupSubtitle}
      </p>

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => handleOAuth("google")}
          disabled={loading}
          className={oauthButtonClass}
        >
          <GoogleIcon />
          {ui.auth.continueGoogle}
        </button>
        <button
          type="button"
          onClick={() => handleOAuth("apple")}
          disabled={loading}
          className={oauthButtonClass}
        >
          <AppleIcon />
          {ui.auth.continueApple}
        </button>
      </div>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          {ui.auth.orEmail}
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleEmailSubmit} className="space-y-4">
        {mode === "signup" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label={ui.auth.firstName} name="first_name" required />
            <Input label={ui.auth.lastName} name="last_name" required />
          </div>
        )}

        <Input
          label={ui.auth.email}
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <Input
          label={ui.auth.password}
          name="password"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          minLength={8}
          required
        />

        {error && (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}
        {message && (
          <p className="rounded-xl bg-green-50 px-3 py-2 text-sm text-green-700">{message}</p>
        )}

        <ActionButton
          type="submit"
          className="w-full"
          disabled={loading}
        >
          <Mail className="h-4 w-4" />
          {loading
            ? ui.auth.pleaseWait
            : mode === "login"
              ? ui.auth.signIn
              : ui.auth.createProfileBtn}
        </ActionButton>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        {mode === "login" ? ui.auth.noAccount : ui.auth.hasAccount}{" "}
        <button
          type="button"
          onClick={toggleMode}
          className={cn("font-semibold text-orange hover:underline")}
        >
          {mode === "login" ? ui.auth.createProfileLink : ui.auth.signInLink}
        </button>
      </p>
    </Modal>
  );
}
