import { cn } from "@/lib/utils";

const logos = {
  equifax: {
    src: "/bureaus/equifax.svg",
    alt: "Equifax",
    className: "h-5 w-auto max-w-[100px] sm:h-6 sm:max-w-[120px]",
  },
  experian: {
    src: "/bureaus/experian.svg",
    alt: "Experian",
    className: "h-6 w-auto max-w-[110px] sm:h-7 sm:max-w-[130px]",
  },
  transunion: {
    src: "/bureaus/transunion.svg",
    alt: "TransUnion",
    className: "h-5 w-auto max-w-[120px] sm:h-6 sm:max-w-[140px]",
  },
} as const;

type BureauId = keyof typeof logos;

type LogoSize = "default" | "compact" | "tab";

const sizeClasses: Record<BureauId, Record<LogoSize, string>> = {
  equifax: {
    default: "h-5 w-auto max-w-[100px] sm:h-6 sm:max-w-[120px]",
    compact: "h-4 w-auto max-w-[72px] sm:h-5 sm:max-w-[88px]",
    tab: "h-7 w-auto max-w-[104px]",
  },
  experian: {
    default: "h-6 w-auto max-w-[110px] sm:h-7 sm:max-w-[130px]",
    compact: "h-4 w-auto max-w-[72px] sm:h-5 sm:max-w-[88px]",
    tab: "h-8 w-auto max-w-[108px]",
  },
  transunion: {
    default: "h-5 w-auto max-w-[120px] sm:h-6 sm:max-w-[140px]",
    compact: "h-4 w-auto max-w-[72px] sm:h-5 sm:max-w-[88px]",
    tab: "h-7 w-auto max-w-[112px]",
  },
};

type Props = {
  bureau: BureauId;
  className?: string;
  size?: LogoSize;
  /** @deprecated use size="compact" */
  compact?: boolean;
  bare?: boolean;
};

const tabClasses: Record<BureauId, string> = {
  equifax: "max-h-[18px] max-w-full",
  experian: "max-h-[20px] max-w-full",
  transunion: "max-h-[18px] max-w-[92%]",
};

export function BureauLogo({
  bureau,
  className,
  size,
  compact,
  bare,
}: Props) {
  const resolvedSize = size ?? (compact ? "compact" : "default");
  const isTab = resolvedSize === "tab";
  const imgClass = isTab
    ? cn(
        "block h-auto w-auto object-contain object-center",
        tabClasses[bureau]
      )
    : sizeClasses[bureau][resolvedSize];

  const image = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={logos[bureau].src}
      alt={logos[bureau].alt}
      className={cn(
        isTab ? imgClass : cn("object-contain object-center", imgClass)
      )}
      loading="lazy"
    />
  );

  if (bare) {
    return (
      <div
        className={cn(
          "inline-flex items-center",
          isTab && "h-full w-full min-w-0 justify-center",
          className
        )}
      >
        {image}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-lg bg-white shadow-sm",
        compact ? "px-2 py-1.5" : "px-3 py-2.5",
        className
      )}
    >
      {image}
    </div>
  );
}
