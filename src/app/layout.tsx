import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { company } from "@/lib/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_SITE_URL ?? "https://creditv2-eight.vercel.app"
  ),
  title: {
    default: `${company.name} — ${company.tagline}`,
    template: `%s | ${company.name}`,
  },
  description:
    "The smart choice for credit repair. Professional dispute services, three-bureau monitoring, and personalized support to help you improve your credit scores.",
  keywords: [
    "credit repair",
    "credit score",
    "dispute services",
    "credit monitoring",
    "MR IQ",
    "smart credit intelligence",
  ],
  openGraph: {
    title: `${company.name} — ${company.tagline}`,
    description:
      "Professional credit repair services to help you achieve your financial goals.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
