import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/portal/Hero";
import { Section } from "@/components/portal/Section";
import { Button } from "@/components/portal/Button";
import { SEO_KEYWORDS } from "@/data/site";
import { FUNNEL_IMAGES } from "@/data/funnel-images";

export const metadata: Metadata = {
  title: "Areas — Paje, Nungwi, Stone Town & More",
  description:
    "Explore Zanzibar real estate by area — Paje, Nungwi, Kendwa, Stone Town, and east-coast investment corridors for villas and land.",
  keywords: [...SEO_KEYWORDS],
};

const AREAS = [
  {
    id: "paje",
    name: "Paje & East Coast",
    summary:
      "The heart of kite-surf culture and villa development — beachfront plots, Airbnb-ready homes, and retirement-friendly coastal living.",
    image: FUNNEL_IMAGES.beachSunset,
  },
  {
    id: "nungwi",
    name: "Nungwi & Kendwa",
    summary:
      "North-coast luxury villas and hospitality assets — strong short-stay demand and premium beachfront positioning.",
    image: FUNNEL_IMAGES.villaLuxury,
  },
  {
    id: "stone-town",
    name: "Stone Town",
    summary:
      "UNESCO-adjacent heritage districts — apartments and character homes for culture-focused buyers and rental yield.",
    image: FUNNEL_IMAGES.stoneTownPromenade,
  },
  {
    id: "jambiani",
    name: "Jambiani & South East",
    summary:
      "Quieter beaches and value-oriented land — popular with diaspora families and long-stay operators.",
    image: FUNNEL_IMAGES.coastalWide,
  },
] as const;

export default function AreasPage() {
  return (
    <>
      <Hero
        compact
        title={<span className="text-white">Zanzibar Areas Guide</span>}
        subtitle="Where to buy beachfront villas, investment land, and luxury property across Unguja."
        image={FUNNEL_IMAGES.stoneTownHarbor}
      />
      <Section
        title="Coastal markets we advise"
        subtitle="Each corridor has distinct buyer profiles, title considerations, and price bands — we match you to the right geography."
      >
        <div className="grid gap-10 lg:grid-cols-2">
          {AREAS.map((area) => (
            <article
              key={area.id}
              id={area.id}
              className="overflow-hidden rounded-sm border border-zb-border bg-white shadow-zb-card"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={area.image}
                  alt={`${area.name} — Zanzibar real estate`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 sm:p-8">
                <h2 className="font-serif text-2xl font-semibold text-zb-navy">{area.name}</h2>
                <p className="mt-3 text-zb-muted leading-relaxed">{area.summary}</p>
                <div className="mt-6">
                  <Link
                    href={`/properties?location=${encodeURIComponent(area.name.split(" ")[0] ?? area.name)}`}
                    className="text-sm font-medium text-zb-gold hover:underline"
                  >
                    View listings in this area →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/contact" variant="primary" size="lg">
            Book area consultation
          </Button>
        </div>
      </Section>
    </>
  );
}
