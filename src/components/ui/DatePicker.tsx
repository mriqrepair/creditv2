"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

type DatePickerProps = {
  label?: string;
  name?: string;
  id?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  minYear?: number;
  maxYear?: number;
  required?: boolean;
  error?: string;
  className?: string;
};

function parseISODate(value: string): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplay(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildYearOptions(minYear: number, maxYear: number) {
  const years: number[] = [];
  for (let year = maxYear; year >= minYear; year -= 1) {
    years.push(year);
  }
  return years;
}

export function DatePicker({
  label,
  name,
  id,
  value: controlledValue,
  defaultValue = "",
  onChange,
  placeholder = "Select date",
  minYear,
  maxYear,
  required,
  error,
  className,
}: DatePickerProps) {
  const generatedId = useId();
  const inputId = id ?? name ?? generatedId;
  const rootRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const resolvedMaxYear = maxYear ?? today.getFullYear();
  const resolvedMinYear = minYear ?? today.getFullYear() - 120;
  const years = buildYearOptions(resolvedMinYear, resolvedMaxYear);

  const [internalValue, setInternalValue] = useState(defaultValue);
  const isoValue = controlledValue ?? internalValue;
  const selectedDate = parseISODate(isoValue);

  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(
    () => selectedDate ?? new Date(resolvedMaxYear - 30, 0, 1)
  );

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function toggleOpen() {
    setOpen((current) => {
      const nextOpen = !current;
      if (nextOpen && selectedDate) {
        setViewDate(selectedDate);
      }
      return nextOpen;
    });
  }

  function updateValue(nextISO: string) {
    if (controlledValue === undefined) {
      setInternalValue(nextISO);
    }
    onChange?.(nextISO);
  }

  function selectDate(date: Date) {
    updateValue(toISO(date));
    setOpen(false);
  }

  function shiftMonth(offset: number) {
    setViewDate(
      (current) => new Date(current.getFullYear(), current.getMonth() + offset, 1)
    );
  }

  const monthStart = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const monthEnd = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);
  const leadingDays = monthStart.getDay();
  const daysInMonth = monthEnd.getDate();

  const calendarDays: (Date | null)[] = [
    ...Array.from({ length: leadingDays }, () => null),
    ...Array.from(
      { length: daysInMonth },
      (_, index) => new Date(viewDate.getFullYear(), viewDate.getMonth(), index + 1)
    ),
  ];

  while (calendarDays.length % 7 !== 0) {
    calendarDays.push(null);
  }

  const maxDate = new Date(resolvedMaxYear, today.getMonth(), today.getDate());
  const minDate = new Date(resolvedMinYear, 0, 1);

  function isDisabled(date: Date) {
    return date > maxDate || date < minDate;
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-navy">
          {label}
        </label>
      )}

      {name && <input type="hidden" name={name} value={isoValue} required={required} />}

      <button
        id={inputId}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={toggleOpen}
        className={cn(
          "mt-1.5 flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-white px-4 py-2.5 text-left text-sm outline-none transition-colors focus:border-orange focus:ring-2 focus:ring-orange/20",
          error && "border-red-400",
          !selectedDate && "text-muted"
        )}
      >
        <span className="truncate">
          {selectedDate ? formatDisplay(selectedDate) : placeholder}
        </span>
        <Calendar className="h-4 w-4 shrink-0 text-orange" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Choose date"
          className="absolute left-0 z-50 mt-2 w-full min-w-[280px] rounded-2xl border border-border bg-white p-4 shadow-xl sm:min-w-[320px]"
        >
          <div className="mb-3 flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => shiftMonth(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-navy transition-colors hover:bg-surface"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="grid flex-1 grid-cols-2 gap-2">
              <select
                aria-label="Month"
                value={viewDate.getMonth()}
                onChange={(event) =>
                  setViewDate(
                    new Date(viewDate.getFullYear(), Number(event.target.value), 1)
                  )
                }
                className="rounded-lg border border-border bg-white px-2 py-1.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
              >
                {MONTHS.map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                aria-label="Year"
                value={viewDate.getFullYear()}
                onChange={(event) =>
                  setViewDate(
                    new Date(Number(event.target.value), viewDate.getMonth(), 1)
                  )
                }
                className="rounded-lg border border-border bg-white px-2 py-1.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              aria-label="Next month"
              onClick={() => shiftMonth(1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-navy transition-colors hover:bg-surface"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wide text-muted">
            {WEEKDAYS.map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="h-9" />;
              }

              const disabled = isDisabled(date);
              const selected = selectedDate ? isSameDay(date, selectedDate) : false;
              const isToday = isSameDay(date, today);

              return (
                <button
                  key={toISO(date)}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDate(date)}
                  className={cn(
                    "flex h-9 items-center justify-center rounded-lg text-sm transition-colors",
                    selected && "bg-orange font-semibold text-white shadow-sm",
                    !selected && !disabled && "text-navy hover:bg-surface",
                    !selected && isToday && "border border-orange/30",
                    disabled && "cursor-not-allowed text-muted/40"
                  )}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
