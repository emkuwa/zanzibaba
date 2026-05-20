"use client";

import { SOLUTIONS } from "@/data/solutions";
import { SOLUTIONS_SECTION } from "@/data/homepage";
import { SolutionCard } from "./SolutionCard";
import { MotionReveal } from "./MotionReveal";

export function SolutionsGrid() {
  const row1 = SOLUTIONS.slice(0, 4);
  const row2 = SOLUTIONS.slice(4, 7);

  return (
    <section id="solutions" className="bg-white">
      <div className="container-portal section-py-sm lg:section-py">
        <MotionReveal>
          <div className="max-w-2xl">
            <p className="text-eyebrow">{SOLUTIONS_SECTION.eyebrow}</p>
            <h2 className="mt-4 text-section-title text-zb-navy">
              {SOLUTIONS_SECTION.title}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-zb-muted sm:text-base">
              {SOLUTIONS_SECTION.description}
            </p>
          </div>
        </MotionReveal>

        {/* Mobile / tablet: compact 2-column grid */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:hidden">
          {SOLUTIONS.map((s, i) => (
            <SolutionCard key={s.slug} solution={s} index={i} variant="compact" />
          ))}
        </div>

        {/* Desktop: 4 + 3 centered rows */}
        <div className="mt-14 hidden space-y-5 lg:block lg:mt-16">
          <div className="grid gap-4 lg:grid-cols-4">
            {row1.map((s, i) => (
              <SolutionCard key={s.slug} solution={s} index={i} variant="compact" />
            ))}
          </div>
          <div className="mx-auto grid max-w-4xl gap-4 lg:grid-cols-3">
            {row2.map((s, i) => (
              <SolutionCard key={s.slug} solution={s} index={i + 4} variant="compact" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
