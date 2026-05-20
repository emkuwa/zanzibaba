"use client";

import { SOLUTIONS } from "@/data/solutions";
import { SolutionCard } from "./SolutionCard";
import { MotionReveal } from "./MotionReveal";

export function SolutionsGrid() {
  const mobileFirst = SOLUTIONS.slice(0, 4);
  const mobileCenter = SOLUTIONS[4];
  const mobileLastRow = SOLUTIONS.slice(5, 7);
  const row1 = SOLUTIONS.slice(0, 4);
  const row2 = SOLUTIONS.slice(4, 7);

  return (
    <section id="solutions" className="bg-white">
      <div className="container-portal section-py">
        <MotionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-sans text-3xl font-bold leading-tight text-zb-navy sm:text-4xl lg:text-[2.5rem]">
              Seven Solutions. One Commitment to Excellence.
            </h2>
          </div>
        </MotionReveal>

        {/* Mobile: 2×2 + 1 centered */}
        <div className="mt-12 space-y-5 sm:mt-14 lg:hidden">
          <div className="grid grid-cols-2 gap-4">
            {mobileFirst.map((s, i) => (
              <SolutionCard key={s.slug} solution={s} index={i} />
            ))}
          </div>
          <div className="flex justify-center">
            <div className="w-[calc(50%-0.5rem)]">
              <SolutionCard solution={mobileCenter} index={4} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {mobileLastRow.map((s, i) => (
              <SolutionCard key={s.slug} solution={s} index={i + 5} />
            ))}
          </div>
        </div>

        {/* Desktop: 4 + 3 */}
        <div className="mt-14 hidden space-y-6 lg:block lg:mt-20">
          <div className="grid gap-6 lg:grid-cols-4">
            {row1.map((s, i) => (
              <SolutionCard key={s.slug} solution={s} index={i} />
            ))}
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
            {row2.map((s, i) => (
              <SolutionCard key={s.slug} solution={s} index={i + 4} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
