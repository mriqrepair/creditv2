import { Check } from "lucide-react";
import { SubscribeButton } from "@/components/checkout/SubscribeButton";
import { cn } from "@/lib/utils";

type PricingCardProps = {
  name: string;
  price: number;
  couplesPrice: number;
  features: string[];
  updateCycle: string;
  popular?: boolean;
  labels?: {
    mostPopular: string;
    perMonth: string;
    couples: string;
    month: string;
    whatsIncluded: string;
    getStarted: string;
  };
};

export function PricingCard({
  name,
  price,
  couplesPrice,
  features,
  updateCycle,
  popular,
  labels = {
    mostPopular: "Most Popular",
    perMonth: "/month",
    couples: "Couples:",
    month: "month",
    whatsIncluded: "What's included:",
    getStarted: "Get Started",
  },
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition-shadow sm:rounded-3xl sm:p-6 lg:p-8",
        popular && "pt-8 sm:pt-9",
        popular
          ? "border-orange shadow-orange/10 ring-2 ring-orange"
          : "border-border hover:shadow-md"
      )}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 max-w-[calc(100%-2rem)] -translate-x-1/2 truncate rounded-full bg-orange px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white sm:px-4 sm:text-xs">
          {labels.mostPopular}
        </span>
      )}

      <h3 className="text-lg font-bold text-navy sm:text-xl">{name}</h3>

      <div className="mt-3 flex items-baseline gap-1 sm:mt-4">
        <span className="text-3xl font-bold text-navy sm:text-4xl">${price}</span>
        <span className="text-sm text-muted">{labels.perMonth}</span>
      </div>

      <p className="mt-1.5 text-xs text-muted sm:mt-2 sm:text-sm">
        {labels.couples}{" "}
        <span className="font-semibold text-navy">${couplesPrice}/{labels.month}</span>
      </p>

      <SubscribeButton
        name={name}
        price={price}
        couplesPrice={couplesPrice}
        updateCycle={updateCycle}
        variant={popular ? "primary" : "outline"}
        className="mt-5 w-full sm:mt-6"
      >
        {labels.getStarted}
      </SubscribeButton>

      <div className="mt-6 flex-1 sm:mt-8">
        <p className="mb-3 text-sm font-semibold text-navy sm:mb-4">
          {labels.whatsIncluded}
        </p>
        <ul className="space-y-2.5 sm:space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
              <span className="text-foreground/80">{feature}</span>
            </li>
          ))}
          <li className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
            <span className="font-medium text-navy">{updateCycle}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
