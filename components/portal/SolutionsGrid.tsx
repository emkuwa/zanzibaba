"use client";

import { SOLUTIONS } from "@/data/solutions";
import { SOLUTIONS_SECTION } from "@/data/homepage";
import { SolutionCard } from "./SolutionCard";
import { MotionReveal } from "./MotionReveal";

export function SolutionsGrid() {
  return (
    <section id="solutions" className="bg-white">
      <div className="container-portal section-py-sm lg:section-py">
        <MotionReveal>
          <div className="max-w-2xl lg:max-w-3xl">
            <p className="text-eyebrow">{SOLUTIONS_SECTION.eyebrow}</p>
            <h2 className="mt-3 text-section-title text-zb-navy sm:mt-4">
              {SOLUTIONS_SECTION.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zb-muted sm:mt-5 sm:text-base">
              {SOLUTIONS_SECTION.description}
            </p>
          </div>
        </MotionReveal>

        {/* Mobile / tablet: compact rows */}
        <ul className="mt-8 lg:hidden">
          {SOLUTIONS.map((s, i) => (
            <SolutionCard key={s.slug} solution={s} index={i} variant="row" />
          ))}
        </ul>

        {/* Desktop: full-width division rows with icon + chevron */}
        <ul className="mt-12 hidden divide-y divide-zb-border/80 rounded-sm border border-zb-border/60 lg:mt-14 lg:block">
          {SOLUTIONS.map((s, i) => (
            <SolutionCard key={s.slug} solution={s} index={i} variant="row" />
          ))}
        </ul>
      </div>
    </section>
  );
}
