"use client";

import { useState, FormEvent } from "react";
import { Mail, MapPin, MessageCircle, Share2 } from "lucide-react";
import { company } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setLoading(false);
  }

  return (
    <>
      <PageHero
        title="Contact Us"
        description="Ready to start your credit repair journey? Get in touch today for a free consultation."
      />

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="order-2 rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6 lg:order-1 lg:p-8">
              <h2 className="text-xl font-bold text-navy sm:text-2xl">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-navy"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-base outline-none transition-colors focus:border-orange focus:ring-2 focus:ring-orange/20 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-navy"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-base outline-none transition-colors focus:border-orange focus:ring-2 focus:ring-orange/20 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-navy"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-base outline-none transition-colors focus:border-orange focus:ring-2 focus:ring-orange/20 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-navy"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us about your credit situation and how we can help..."
                    className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-base outline-none transition-colors focus:border-orange focus:ring-2 focus:ring-orange/20 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-orange px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-orange-dark disabled:opacity-60 sm:py-3 sm:text-sm"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
                {status === "success" && (
                  <p className="rounded-xl bg-green-50 p-4 text-sm text-green-700">
                    Message sent successfully! We&apos;ll get back to you within
                    24 hours.
                  </p>
                )}
              </form>
            </div>

            <div className="order-1 space-y-5 sm:space-y-6 lg:order-2">
              <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 lg:p-8">
                <h2 className="text-xl font-bold text-navy sm:text-2xl">
                  Get In Touch
                </h2>
                <div className="mt-5 space-y-5 sm:mt-6 sm:space-y-6">
                  {[
                    {
                      icon: MessageCircle,
                      title: "WhatsApp",
                      desc: "For quick questions and consultations",
                      href: `https://wa.me/${company.whatsapp.replace("+", "")}`,
                      link: "Message on WhatsApp",
                      external: true,
                    },
                    {
                      icon: Mail,
                      title: "Email",
                      desc: "For detailed inquiries",
                      href: `mailto:${company.email}`,
                      link: company.email,
                    },
                    {
                      icon: Share2,
                      title: "Social Media",
                      desc: "Follow for credit tips and updates",
                      href: company.instagram,
                      link: "@jl.nolimit on Instagram",
                      external: true,
                    },
                    {
                      icon: MapPin,
                      title: "Service Area",
                      desc: "Providing credit repair services nationwide across the United States.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3 sm:gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange/10 sm:h-12 sm:w-12">
                        <item.icon className="h-5 w-5 text-orange sm:h-6 sm:w-6" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-navy">{item.title}</h3>
                        <p className="text-sm text-muted">{item.desc}</p>
                        {item.href && (
                          <a
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={
                              item.external ? "noopener noreferrer" : undefined
                            }
                            className="mt-1.5 inline-block break-all text-sm font-medium text-orange hover:underline sm:mt-2"
                          >
                            {item.link}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-navy p-5 text-white sm:p-6 lg:p-8">
                <h3 className="text-lg font-bold sm:text-xl">
                  Free Consultation
                </h3>
                <p className="mt-2 text-sm text-white/75">
                  No pushy salespeople — just honest answers and realistic
                  expectations. It&apos;s all part of our best-in-class support
                  experience.
                </p>
                <Button href="/pricing" className="mt-4 w-full sm:w-auto">
                  View Plans
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
