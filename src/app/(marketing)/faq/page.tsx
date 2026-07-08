"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export default function FAQPage() {
  const { content } = useLanguage();
  const { faqs, ui } = content;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <PageHero
        title={ui.pages.faq.title}
        description={ui.pages.faq.description}
      />

      <Section>
        <Container narrow>
          <div className="space-y-2.5 sm:space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={faq.question}
                className="overflow-hidden rounded-xl border border-border bg-white sm:rounded-2xl"
              >
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-3 p-4 text-left sm:items-center sm:gap-4 sm:p-6"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="text-sm font-semibold text-navy sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "mt-0.5 h-5 w-5 shrink-0 text-muted transition-transform sm:mt-0",
                      open === i && "rotate-180"
                    )}
                  />
                </button>
                {open === i && (
                  <div className="border-t border-border px-4 pb-4 pt-1 sm:px-6 sm:pb-6 sm:pt-2">
                    <p className="text-sm leading-relaxed text-muted sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container narrow className="text-center">
          <SectionHeading
            title={ui.pages.faq.stillHaveQuestions}
            description={ui.pages.faq.stillHaveQuestionsDesc}
          />
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center">
            <Button href="/contact" className="w-full sm:w-auto">
              {ui.pages.faq.freeConsultation}
            </Button>
            <Button
              href={`https://wa.me/13479255033`}
              external
              variant="outline"
              className="w-full sm:w-auto"
            >
              {ui.pages.faq.whatsappUs}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
