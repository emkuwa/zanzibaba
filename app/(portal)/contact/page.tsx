import type { Metadata } from "next";
import { Hero } from "@/components/portal/Hero";
import { Section } from "@/components/portal/Section";
import { Button } from "@/components/portal/Button";
import { SITE, SUBDOMAINS } from "@/data/site";
import { BreadcrumbJsonLd } from "@/components/seo/RealEstateJsonLd";

export const metadata: Metadata = {
  title: "Contact Zanzibaba Real Estate — Zanzibar Property Advisory",
  description: `Contact Zanzibaba Real Estate in Zanzibar — ${SITE.email}, ${SITE.phone}. Offices in Paje (East Coast) and Mlandege (Stone Town). WhatsApp, email, or phone.`,
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: "Contact Zanzibaba Real Estate",
    description: "Get in touch with our Zanzibar property advisory team.",
    url: `${SITE.url}/contact`,
    siteName: SITE.name,
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE.url },
          { name: "Contact", url: `${SITE.url}/contact` },
        ]}
      />
      <Hero
        compact
        title={<span className="text-white">Contact Us</span>}
        subtitle="Book a consultation for Zanzibar property — phone, email, or WhatsApp with our real estate advisory team."
      />
      <Section title="Get in touch">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-zb-gold">
                Email
              </h3>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-2 block text-xl font-medium text-zb-navy hover:text-zb-gold"
              >
                {SITE.email}
              </a>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-zb-gold">
                Phone
              </h3>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="mt-2 block text-xl font-medium text-zb-navy hover:text-zb-gold"
              >
                {SITE.phone}
              </a>
              <p className="mt-1 text-zb-muted">Local: {SITE.phoneLocal}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-zb-gold">
                WhatsApp
              </h3>
              <Button
                href={`https://wa.me/${SITE.whatsapp}`}
                variant="secondary"
                external
              >
                Message on WhatsApp
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-zb-gold">
              Offices
            </h3>
            <ul className="mt-4 space-y-6">
              {SITE.offices.map((o) => (
                <li
                  key={o.name}
                  className="rounded-sm border border-zb-border bg-zb-surface p-6"
                >
                  <p className="font-serif text-lg font-semibold text-zb-navy">
                    {o.name}
                  </p>
                  <p className="mt-2 text-zb-muted">{o.location}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section eyebrow="Investors" title="Related resources">
        <ul className="flex flex-wrap gap-4">
          <li>
            <Button href={SUBDOMAINS.invest} variant="ghost" external>
              Private investor portal
            </Button>
          </li>
          <li>
            <Button href={SUBDOMAINS.investmentGateway} variant="ghost" external>
              Investment gateway
            </Button>
          </li>
          <li>
            <Button href="/properties" variant="ghost">
              Browse properties
            </Button>
          </li>
        </ul>
      </Section>
    </>
  );
}
