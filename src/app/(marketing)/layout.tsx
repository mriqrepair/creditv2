import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CheckoutProvider } from "@/components/providers/CheckoutProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { getLocale } from "@/lib/i18n/server";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <LanguageProvider initialLocale={locale}>
      <CheckoutProvider>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </CheckoutProvider>
    </LanguageProvider>
  );
}
