import type { Metadata } from "next";
import { AboutShowcase } from "@/components/marketing/AboutShowcase";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getContent } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const content = getContent(await getLocale());
  return {
    title: content.ui.pages.about.title,
    description: content.ui.pages.about.description,
  };
}

export default async function AboutPage() {
  const content = getContent(await getLocale());
  const { ui } = content;
  const about = ui.pages.about;

  return (
    <>
      <PageHero
        align="left"
        eyebrow={about.heroEyebrow}
        title={about.heroTitle}
        description={about.heroDescription}
      />

      <AboutShowcase content={content} />
    </>
  );
}
