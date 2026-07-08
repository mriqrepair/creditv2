import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
};

const variants = {
  primary:
    "bg-orange text-white hover:bg-orange-dark shadow-lg shadow-orange/25",
  secondary:
    "bg-navy text-white hover:bg-navy-dark shadow-lg shadow-navy/20",
  outline:
    "border-2 border-navy text-navy hover:bg-navy hover:text-white",
  ghost: "text-navy hover:bg-surface",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base",
  lg: "w-full px-6 py-3.5 text-base sm:w-auto sm:px-8 sm:py-4 sm:text-lg",
};

export function Button({
  href = "#",
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200",
    variants[variant],
    sizes[size],
    className
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
