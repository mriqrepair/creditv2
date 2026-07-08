import { Check, Shield, Headphones, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const badges = [
  { icon: Clock, label: "No Charge for 6 Days" },
  { icon: Headphones, label: "Best-in-Class Support" },
  { icon: Shield, label: "90-Day Guarantee" },
];

export function TrustBadges() {
  return (
    <div className="grid w-full max-w-md gap-3 sm:max-w-none sm:grid-cols-3 sm:gap-4">
      {badges.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-sm sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-4"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange/20 sm:h-10 sm:w-10">
            <Icon className="h-4 w-4 text-orange sm:h-5 sm:w-5" />
          </div>
          <span className="text-xs font-semibold leading-snug text-white sm:text-sm">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 sm:space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
          <span className="text-foreground/80">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-orange sm:mb-3 sm:text-sm sm:tracking-widest">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl",
          light ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 text-base leading-relaxed sm:mt-4 sm:text-lg",
            light ? "text-white/75" : "text-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
