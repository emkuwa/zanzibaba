"use client";

import { SOLUTIONS } from "@/data/solutions";
import { SolutionCard } from "./SolutionCard";
import { MotionReveal } from "./MotionReveal";

export function SolutionsGrid() {
  const row1 = SOLUTIONS.slice(0, 4);
  const row2 = SOLUTIONS.slice(4, 7);

  return (
    <section id="solutions" className="bg-white">
      <div className="container-portal section-py">
        <MotionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-eyebrow">Our Solutions</p>
            <h2 className="mt-4 font-sans text-3xl font-bold leading-tight text-zb-navy sm:text-4xl lg:text-[2.5rem]">
              Seven Solutions. One Commitment to Excellence.
            </h2>
          </div>
        </MotionReveal>

        <div className="mt-14 space-y-6 sm:mt-16 lg:mt-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {row1.map((s, i) => (
              <SolutionCard key={s.slug} solution={s} index={i} />
            ))}
          </div>
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {row2.map((s, i) => (
              <SolutionCard key={s.slug} solution={s} index={i + 4} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
