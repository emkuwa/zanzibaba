import type { Metadata } from "next";
import { Hero } from "@/components/portal/Hero";
import { Section } from "@/components/portal/Section";
import { Button } from "@/components/portal/Button";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Zanzibaba Group project portfolio — residential, commercial, and hospitality programmes across Zanzibar.",
};

export default function ProjectsPage() {
  return (
    <>
      <Hero
        compact
        title={<span className="text-white">Projects</span>}
        subtitle="A curated portfolio of developments and programmes — case studies publishing soon."
      />
      <Section title="Portfolio">
        <p className="max-w-2xl text-lg text-zb-muted leading-relaxed">
          Our project gallery is being prepared for investor review. For active
          programmes and property listings, explore real estate or contact our
          offices in Paje and Stone Town.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/listings" variant="primary">
            Property Listings
          </Button>
          <Button href="/contact" variant="ghost">
            Enquire
          </Button>
        </div>
      </Section>
    </>
  );
}
