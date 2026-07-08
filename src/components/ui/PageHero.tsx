import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  align?: "center" | "left";
  children?: React.ReactNode;
};

export function PageHero({
  title,
  description,
  eyebrow,
  align = "center",
  children,
}: PageHeroProps) {
  const centered = align === "center";

  return (
    <section className="bg-gradient-to-br from-navy-dark to-navy py-10 text-white sm:py-14 lg:py-16">
      <Container>
        <div
          className={cn(
            centered ? "mx-auto max-w-3xl text-center" : "max-w-4xl",
            children != null && "grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
          )}
        >
          <div
            className={cn(
              centered && children == null && "mx-auto max-w-3xl text-center"
            )}
          >
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange sm:text-sm sm:tracking-widest">
                {eyebrow}
              </p>
            )}
            <h1
              className={cn(
                "font-bold tracking-tight text-white",
                eyebrow ? "mt-2" : "",
                "text-3xl sm:text-4xl lg:text-5xl"
              )}
            >
              {title}
            </h1>
            {description && (
              <p
                className={cn(
                  "mt-3 text-base leading-relaxed text-white/75 sm:mt-4 sm:text-lg",
                  centered && "mx-auto max-w-2xl"
                )}
              >
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      </Container>
    </section>
  );
}
