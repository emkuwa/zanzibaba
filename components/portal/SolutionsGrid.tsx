"use client";

import { SOLUTIONS } from "@/data/solutions";
import { SOLUTIONS_SECTION, SOLUTION_DESKTOP_TITLES } from "@/data/homepage";
import { SolutionCard } from "./SolutionCard";
import { MotionReveal } from "./MotionReveal";

export function SolutionsGrid() {
  const row1 = SOLUTIONS.slice(0, 4);
  const row2 = SOLUTIONS.slice(4, 7);

  const desktopTitle = (slug: string, fallback: string) =>
    SOLUTION_DESKTOP_TITLES[slug] ?? fallback;

  return (
    <section id="solutions" className="bg-white">
      <div className="container-portal section-py-sm lg:section-py">
        <MotionReveal>
          <div className="max-w-2xl lg:max-w-3xl">
            <p className="text-eyebrow">{SOLUTIONS_SECTION.eyebrow}</p>
            <h2 className="mt-3 text-section-title text-zb-navy sm:mt-4">
              <span className="lg:hidden">{SOLUTIONS_SECTION.titleMobile}</span>
              <span className="hidden lg:inline">{SOLUTIONS_SECTION.titleDesktop}</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zb-muted sm:mt-5 sm:text-base">
              {SOLUTIONS_SECTION.description}
            </p>
          </div>
        </MotionReveal>

        {/* Mobile: 2-column compact cards */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
          {SOLUTIONS.map((s, i) => (
            <SolutionCard key={s.slug} solution={s} index={i} variant="mobile-grid" />
          ))}
        </div>

        {/* Desktop: 4 + 3 full cards */}
        <div className="mt-12 hidden space-y-5 lg:block lg:mt-14">
          <div className="grid gap-5 lg:grid-cols-4">
            {row1.map((s, i) => (
              <SolutionCard
                key={s.slug}
                solution={s}
                index={i}
                variant="full"
                titleOverride={desktopTitle(s.slug, s.title)}
              />
            ))}
          </div>
          <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-3">
            {row2.map((s, i) => (
              <SolutionCard
                key={s.slug}
                solution={s}
                index={i + 4}
                variant="full"
                titleOverride={desktopTitle(s.slug, s.title)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
