import { cn } from "@/lib/utils";

type ActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md";
};

const variants = {
  primary: "bg-orange text-white hover:bg-orange-dark",
  secondary: "bg-navy text-white hover:bg-navy-dark",
  outline: "border border-border text-navy hover:bg-surface",
  ghost: "text-navy hover:bg-surface",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
};

export function ActionButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ActionButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:opacity-60",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
