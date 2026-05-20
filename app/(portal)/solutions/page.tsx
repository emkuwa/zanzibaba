import type { Metadata } from "next";
import { Hero } from "@/components/portal/Hero";
import { Section } from "@/components/portal/Section";
import { SolutionCard } from "@/components/portal/SolutionCard";
import { SOLUTIONS } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Our Solutions",
  description:
    "Explore Zanzibaba Group solutions — real estate, building materials, construction, digital, tours, security, and landscaping.",
};

export default function SolutionsPage() {
  return (
    <>
      <Hero
        compact
        title={<span className="text-white">Our Solutions</span>}
        subtitle="Seven integrated divisions delivering end-to-end value for developers and investors in Zanzibar."
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s) => (
            <SolutionCard key={s.slug} solution={s} />
          ))}
        </div>
      </Section>
    </>
  );
}
