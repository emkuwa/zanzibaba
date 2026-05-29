import type { Metadata } from "next";
import { Hero } from "@/components/portal/Hero";
import { Section } from "@/components/portal/Section";
import { Button } from "@/components/portal/Button";
import { SEO_KEYWORDS } from "@/data/site";

export const metadata: Metadata = {
  title: "Why Invest in Zanzibar",
  description:
    "Why international investors choose Zanzibar real estate — tourism growth, diaspora demand, Airbnb yield, and beachfront villa appreciation.",
  keywords: [...SEO_KEYWORDS],
};

const REASONS = [
  {
    title: "Tourism & short-stay demand",
    body: "Zanzibar's visitor economy supports Airbnb and boutique hospitality investments along the east and north coasts.",
  },
  {
    title: "Diaspora & retirement appeal",
    body: "Foreign and diaspora buyers seek second homes with island lifestyle, warm climate, and improving connectivity.",
  },
  {
    title: "Beachfront scarcity",
    body: "Prime coastal frontage remains limited — luxury villas Zanzibar buyers pursue often appreciate as supply tightens.",
  },
  {
    title: "Developer opportunity",
    body: "Plots and phased programmes suit villa clusters, eco-resorts, and mixed-use along growth corridors.",
  },
] as const;

export default function WhyZanzibarPage() {
  return (
    <>
      <Hero
        compact
        title={<span className="text-white">Why Zanzibar</span>}
        subtitle="Zanzibar investment property combines lifestyle, yield, and long-term coastal value for global buyers."
      />
      <Section
        title="Investor advantages"
        subtitle="We help you interpret title, location, and programme fit — with transparent disclaimers on indicative returns."
      >
        <ul className="grid gap-6 sm:grid-cols-2">
          {REASONS.map((r) => (
            <li
              key={r.title}
              className="rounded-sm border border-zb-border bg-white p-6 shadow-zb-card sm:p-8"
            >
              <h2 className="font-serif text-xl font-semibold text-zb-navy">{r.title}</h2>
              <p className="mt-3 text-zb-muted leading-relaxed">{r.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-sm text-zb-muted">
          Indicative yields and appreciation figures are for planning only — not audited financials.
          Legal and tax advice should be obtained for your jurisdiction.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/properties" variant="primary" size="lg">
            Browse properties
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            Book consultation
          </Button>
        </div>
      </Section>
    </>
  );
}
