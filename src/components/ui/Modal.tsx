"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-navy-dark/50"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div
        className={cn(
          "relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-white p-5 shadow-xl sm:p-6",
          className
        )}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="text-lg font-bold text-navy">{title}</h2>}
          <button
            type="button"
            onClick={onClose}
            className="ml-auto rounded-lg p-1.5 text-muted hover:bg-surface"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
