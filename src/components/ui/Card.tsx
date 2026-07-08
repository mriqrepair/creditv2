import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
};

export function Card({ children, className, title, description, action }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6",
        className
      )}
    >
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && (
              <h3 className="text-base font-bold text-navy sm:text-lg">{title}</h3>
            )}
            {description && (
              <p className="mt-1 text-sm text-muted">{description}</p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
