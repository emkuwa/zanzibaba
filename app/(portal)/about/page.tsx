import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/portal/Hero";
import { Section } from "@/components/portal/Section";
import { Button } from "@/components/portal/Button";
import { FUNNEL_IMAGES } from "@/data/funnel-images";
import { SITE, SEO_KEYWORDS } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Zanzibaba Real Estate — trusted Zanzibar property advisory for international investors, diaspora buyers, and developers.",
  keywords: [...SEO_KEYWORDS],
};

const TEAM_IMAGE = FUNNEL_IMAGES.stoneTownGolden;

export default function AboutPage() {
  return (
    <>
      <Hero
        compact
        title={<span className="text-white">About {SITE.name}</span>}
        subtitle="Luxury Zanzibar real estate with local expertise — from verified listings to investor consultation."
      />
      <Section title="Our story">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6 text-lg leading-relaxed text-zb-muted">
            <p>
              {SITE.name} is dedicated to property for sale in Zanzibar — beachfront villas,
              investment land, and luxury homes for foreign investors, diaspora buyers, Airbnb
              operators, retirees, and developers.
            </p>
            <p>
              From our East Coast Office in Paje and Town Office in Mlandege, we coordinate
              viewings, title diligence, and handover support across Paje, Nungwi, Kendwa, Stone
              Town, and island-wide.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src={TEAM_IMAGE}
              alt="Zanzibar coastal property advisory"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className="mt-12">
          <Button href="/contact" variant="primary">
            Book consultation
          </Button>
        </div>
      </Section>
      <Section
        dark
        eyebrow="Trust"
        title="Investor-grade standards"
        subtitle="Transparent listings, clear disclaimers on indicative metrics, and professional communication for international clients."
      >
        <p className="max-w-2xl text-white/75">
          Every programme metric we share is labelled indicative until audited figures are
          published. We encourage independent legal and tax review for cross-border purchases.
        </p>
      </Section>
    </>
  );
}
