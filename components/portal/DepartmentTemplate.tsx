import Image from "next/image";
import type { Solution } from "@/data/solutions";
import { getDepartmentBySolutionSlug } from "@/data/departments";
import { Hero } from "./Hero";
import { Section } from "./Section";
import { Button } from "./Button";
import { MotionReveal } from "./MotionReveal";

interface DepartmentTemplateProps {
  solution: Solution;
}

export function DepartmentTemplate({ solution }: DepartmentTemplateProps) {
  const department = getDepartmentBySolutionSlug(solution.slug);
  const portalUrl = department?.portalUrl ?? solution.externalUrl;

  return (
    <>
      <Hero
        compact
        image={solution.heroImage}
        title={
          <span className="text-white">
            {solution.title}
          </span>
        }
        subtitle={solution.shortDescription}
      />
      <Section eyebrow="Division" title="Overview">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <p className="text-lg leading-relaxed text-zb-muted">{solution.description}</p>
          <ul className="space-y-4">
            {solution.highlights.map((h) => (
              <li
                key={h}
                className="flex gap-3 border-l-2 border-zb-gold pl-4 text-zb-ink"
              >
                <span className="font-medium">{h}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          {portalUrl && (
            <Button href={portalUrl} variant="primary" external>
              Visit live portal
            </Button>
          )}
          {solution.slug === "real-estate" && (
            <Button href="/listings" variant="navy">
              Browse listings
            </Button>
          )}
          <Button href="/contact" variant={portalUrl ? "ghost" : "primary"}>
            Enquire
          </Button>
          <Button href="/solutions" variant="ghost">
            All Solutions
          </Button>
        </div>
      </Section>
      <Section dark eyebrow="Zanzibaba Group" title="Integrated delivery">
        <MotionReveal delay={0.1}>
          <p className="max-w-3xl text-lg leading-relaxed text-white/80">
            Our divisions work as one ecosystem — materials, construction, real
            estate, and digital — so investors and developers receive coherent
            programme delivery from a single trusted group partner.
          </p>
        </MotionReveal>
        <div className="mt-10 flex justify-center">
          <Image
            src={solution.logo}
            alt=""
            width={512}
            height={512}
            unoptimized
            className="h-20 w-20 rounded-sm object-contain"
            aria-hidden
          />
        </div>
      </Section>
    </>
  );
}
