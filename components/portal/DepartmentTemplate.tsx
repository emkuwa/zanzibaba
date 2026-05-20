import Image from "next/image";
import type { Solution } from "@/data/solutions";
import { Hero } from "./Hero";
import { Section } from "./Section";
import { Button } from "./Button";
import { MotionReveal } from "./MotionReveal";

interface DepartmentTemplateProps {
  solution: Solution;
}

export function DepartmentTemplate({ solution }: DepartmentTemplateProps) {
  const ctaHref = solution.externalUrl ?? "/contact";
  const ctaExternal = Boolean(solution.externalUrl);

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
          <Button
            href={ctaHref}
            variant="primary"
            external={ctaExternal}
          >
            {ctaExternal ? "Visit Portal" : "Enquire"}
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
            width={80}
            height={80}
            className="opacity-90"
            aria-hidden
          />
        </div>
      </Section>
    </>
  );
}
