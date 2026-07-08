import Image from "next/image";
import Link from "next/link";
import { company, navLinks } from "@/lib/content";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <Container className="py-10 sm:py-14 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
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
              The smart choice for credit repair. Professional dispute services
              to help you achieve your financial goals.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-orange sm:mb-4 sm:text-sm">
              The Program
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

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-orange sm:mb-4 sm:text-sm">
              Learn
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-orange sm:mb-4 sm:text-sm">
              Get Started
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="break-all transition-colors hover:text-white"
                >
                  {company.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${company.whatsapp.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  WhatsApp: {company.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={company.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center sm:mt-12 sm:flex-row sm:pt-8 sm:text-left">
          <p className="text-xs text-white/50 sm:text-sm">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-white/50 sm:gap-6 sm:text-sm">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
