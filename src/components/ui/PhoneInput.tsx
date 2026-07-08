"use client";

import { useState } from "react";
import { formatPhoneNumber } from "@/lib/format-phone";
import { Input } from "@/components/ui/Input";

type PhoneInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "type" | "inputMode" | "onChange" | "value" | "defaultValue"
> & {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export function PhoneInput({
  value: controlledValue,
  defaultValue = "",
  onChange,
  placeholder = "(555) 555-5555",
  ...props
}: PhoneInputProps) {
  const [internalValue, setInternalValue] = useState(
    defaultValue ? formatPhoneNumber(defaultValue) : ""
  );
  const value =
    controlledValue !== undefined
      ? formatPhoneNumber(controlledValue)
      : internalValue;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatPhoneNumber(e.target.value);
    if (controlledValue === undefined) {
      setInternalValue(formatted);
    }
    onChange?.(formatted);
  }

  return (
    <Input
      {...props}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}
