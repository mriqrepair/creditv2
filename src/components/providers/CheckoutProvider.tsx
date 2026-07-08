"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { StripeCheckoutModal } from "@/components/checkout/StripeCheckoutModal";
import type { CheckoutPlan } from "@/lib/checkout/types";

type CheckoutContextValue = {
  openCheckout: (plan: CheckoutPlan) => void;
  closeCheckout: () => void;
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<CheckoutPlan | null>(null);

  const openCheckout = useCallback((nextPlan: CheckoutPlan) => {
    setPlan(nextPlan);
  }, []);

  const closeCheckout = useCallback(() => {
    setPlan(null);
  }, []);

  const value = useMemo(
    () => ({ openCheckout, closeCheckout }),
    [openCheckout, closeCheckout]
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
      <StripeCheckoutModal plan={plan} onClose={closeCheckout} />
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }
  return context;
}
