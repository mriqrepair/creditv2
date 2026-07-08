"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Shield } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Container } from "@/components/ui/Container";

const ADMIN_HREF = "/dashboard/credit-repair";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
      />
    </svg>
  );
}

export function Footer() {
  const { content } = useLanguage();
  const { company, navLinks, ui } = content;

  return (
    <footer className="bg-navy-dark text-white">
      <Container className="py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt={company.name}
                width={56}
                height={48}
                className="h-12 w-auto shrink-0 object-contain sm:h-14"
              />
              <div className="min-w-0">
                <p className="text-lg font-bold sm:text-xl">
                  <span className="text-white">MR.</span>
                  <span className="text-orange">IQ</span>
                </p>
                <p className="text-[10px] uppercase tracking-widest text-white/60 sm:text-xs">
                  {company.tagline}
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              {ui.footer.description}
            </p>
          </div>

          <div className="order-2 lg:order-none">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-orange sm:mb-4 sm:text-sm">
              {ui.footer.theProgram}
            </h4>
            <ul className="space-y-2">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-4 col-span-2 lg:order-none lg:col-span-1">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-orange sm:mb-4 sm:text-sm">
              {ui.footer.learn}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {ui.footer.faq}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {ui.footer.aboutUs}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {ui.footer.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div className="order-3 lg:order-none lg:col-span-1">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-orange sm:mb-4 sm:text-sm">
              {ui.footer.getStarted}
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-start gap-2 break-all transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                  {company.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${company.whatsapp.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
                  WhatsApp: {company.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={company.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <InstagramIcon className="h-4 w-4 shrink-0 text-[#E4405F]" />
                  {ui.footer.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center sm:mt-12 sm:flex-row sm:pt-8 sm:text-left">
          <p className="text-xs text-white/50 sm:text-sm">
            © {new Date().getFullYear()} {company.name}. {ui.footer.rightsReserved}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-white/50 sm:gap-6 sm:text-sm">
            <Link
              href={ADMIN_HREF}
              className="hidden items-center gap-1.5 hover:text-white xl:inline-flex"
            >
              <Shield className="h-3.5 w-3.5 text-orange" />
              {ui.common.admin}
            </Link>
            <Link href="/privacy" className="hover:text-white">
              {ui.footer.privacyPolicy}
            </Link>
            <Link href="/terms" className="hover:text-white">
              {ui.footer.termsOfService}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
