import type { Metadata } from "next";
import { Hero } from "@/components/portal/Hero";
import { Section } from "@/components/portal/Section";
import { Button } from "@/components/portal/Button";
import { SITE, SUBDOMAINS } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact Zanzibaba Group — ${SITE.email}, ${SITE.phone}. Offices in Paje and Stone Town, Zanzibar.`,
};

export default function ContactPage() {
  return (
    <>
      <Hero
        compact
        title={<span className="text-white">Contact Us</span>}
        subtitle="Reach our team by phone, email, or WhatsApp. We welcome programme enquiries across all divisions."
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
      <Section eyebrow="Portals" title="Division platforms">
        <ul className="flex flex-wrap gap-4">
          {Object.entries(SUBDOMAINS).map(([key, url]) => (
            <li key={key}>
              <Button href={url} variant="ghost" external>
                {key}.zanzibaba.com
              </Button>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
