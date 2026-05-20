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

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
          {SOLUTIONS.map((s, i) => (
            <SolutionCard key={s.slug} solution={s} index={i} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
