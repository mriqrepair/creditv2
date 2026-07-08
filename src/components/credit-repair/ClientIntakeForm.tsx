"use client";

import { useState, FormEvent } from "react";
import { Card } from "@/components/ui/Card";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { DatePicker } from "@/components/ui/DatePicker";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { US_STATE_OPTIONS } from "@/lib/us-states";
import { ActionButton } from "@/components/ui/ActionButton";
import { apiPost } from "@/lib/credit-repair/client-api";
import type { Client } from "@/lib/credit-repair/types";

type Props = {
  onCreated: (client: Client) => void;
};

export function ClientIntakeForm({ onCreated }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const client = await apiPost<Client>("/api/credit/clients", payload);
      onCreated(client);
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create client");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card title="New Client Intake" description="Admin creates a client record to start the workflow.">
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
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
        <Textarea label="Notes" name="notes" rows={3} className="sm:col-span-2" />
        <div className="sm:col-span-2">
          <ActionButton type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Client"}
          </ActionButton>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>
      </form>
    </Card>
  );
}
