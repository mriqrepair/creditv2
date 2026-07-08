"use client";

import { cn } from "@/lib/utils";

type AuthButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const variants = {
  primary: "bg-orange text-white hover:bg-orange-dark shadow-lg shadow-orange/25",
  secondary: "bg-navy text-white hover:bg-navy-dark shadow-lg shadow-navy/20",
  outline: "border-2 border-navy text-navy hover:bg-navy hover:text-white",
  ghost: "text-navy hover:bg-surface",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base",
};

export function AuthButton({
  variant = "primary",
  size = "md",
  className,
  children,
  onClick,
}: AuthButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  );
}
