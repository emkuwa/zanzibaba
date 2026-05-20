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
          <div className="max-w-2xl lg:max-w-3xl">
            <p className="text-eyebrow lg:hidden">OUR SERVICES</p>
            <p className="text-eyebrow hidden lg:block">{SOLUTIONS_SECTION.eyebrow}</p>
            <h2 className="mt-3 text-section-title text-zb-navy sm:mt-4">
              {SOLUTIONS_SECTION.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zb-muted sm:mt-5 sm:text-base">
              {SOLUTIONS_SECTION.description}
            </p>
          </div>
        </MotionReveal>

        {/* Mobile / tablet: compact rows with Chairman line-art icons */}
        <ul className="mt-8 lg:hidden">
          {SOLUTIONS.map((s, i) => (
            <SolutionCard key={s.slug} solution={s} index={i} variant="row" />
          ))}
        </ul>

        {/* Desktop: 4 + 3 division card grid */}
        <div className="mt-12 hidden space-y-5 lg:block lg:mt-14">
          <div className="grid gap-4 lg:grid-cols-4">
            {row1.map((s, i) => (
              <SolutionCard key={s.slug} solution={s} index={i} variant="compact" />
            ))}
          </div>
          <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-3">
            {row2.map((s, i) => (
              <SolutionCard key={s.slug} solution={s} index={i + 4} variant="compact" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
