import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type MobileHeroSectionProps = {
  companyName: string;
  companyTagline: string;
  title: string;
  titleAccent: string;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
  className?: string;
};

export function MobileHeroSection({
  companyName,
  companyTagline,
  title,
  titleAccent,
  description,
  ctaLabel,
  ctaHref = "/pricing",
  className,
}: MobileHeroSectionProps) {
  return (
    <section className={cn("bg-white", className)}>
      <Container className="flex flex-col items-center px-4 py-5 sm:py-8">
        <Image
          src="/logo-hero-mobile.png"
          alt={`${companyName} - ${companyTagline}`}
          width={647}
          height={875}
          priority
          className="h-auto w-full max-h-[42vh] min-h-[200px] object-contain object-center sm:min-h-[260px] sm:max-h-[48vh]"
        />
        <h1 className="mt-4 text-center text-4xl font-bold leading-[1.15] tracking-tight text-navy sm:mt-6 sm:text-5xl">
          {title}{" "}
          <span className="block text-8xl font-black leading-none tracking-tight text-orange sm:text-9xl">
            {titleAccent}
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-center text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
          {description}
        </p>
        <Button
          href={ctaHref}
          size="lg"
          className="mt-6 w-full sm:mt-8 sm:w-auto"
        >
          {ctaLabel}
          <ArrowRight className="h-5 w-5" />
        </Button>
      </Container>
    </section>
  );
}
