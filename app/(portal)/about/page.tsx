import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/portal/Hero";
import { Section } from "@/components/portal/Section";
import { Button } from "@/components/portal/Button";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Zanzibaba Group — a diversified Zanzibar company delivering real estate, materials, construction, and digital excellence.",
};

const TEAM_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop";

export default function AboutPage() {
  return (
    <>
      <Hero
        compact
        title={<span className="text-white">About Zanzibaba Group</span>}
        subtitle="A premium, diversified group headquartered in Zanzibar — serving the island with discipline and long-term vision."
      />
      <Section title="Our story">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6 text-lg leading-relaxed text-zb-muted">
            <p>
              {SITE.legalName} operates at the intersection of property,
              construction supply, and digital infrastructure — uniting seven
              operating divisions under one investor-grade brand.
            </p>
            <p>
              From our Paje yard and Mlandege Town Office in Stone Town, we
              support developers, contractors, and investors with programme-scale
              delivery throughout Unguja.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src={TEAM_IMAGE}
              alt="Zanzibaba corporate"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className="mt-12">
          <Button href="/contact" variant="primary">
            Contact our offices
          </Button>
        </div>
      </Section>
      <Section
        dark
        eyebrow="Governance"
        title="Investor-grade standards"
        subtitle="We present indicative metrics with clear disclaimers, maintain multi-subdomain transparency, and align digital properties with Chairman brand guidelines."
      >
        <p className="max-w-2xl text-white/75">
          Every public-facing metric on our digital estate carries an indicative
          disclaimer until audited figures are published.
        </p>
      </Section>
    </>
  );
}
