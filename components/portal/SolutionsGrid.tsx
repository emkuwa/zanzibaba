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
      <div className="container-portal py-6 sm:py-8 lg:section-py">
        <MotionReveal>
          <div className="max-w-2xl lg:mx-auto lg:max-w-3xl lg:text-center">
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.28em] text-zb-gold sm:text-eyebrow">
              {SOLUTIONS_SECTION.eyebrow}
            </p>
            <h2 className="mt-2 font-serif text-[1.375rem] font-semibold leading-[1.15] text-zb-navy sm:mt-2.5 sm:text-[1.625rem] lg:mt-4 lg:text-section-title">
              <span className="lg:hidden">{SOLUTIONS_SECTION.titleMobile}</span>
              <span className="hidden lg:inline">{SOLUTIONS_SECTION.titleDesktop}</span>
            </h2>
            <p className="mt-2 line-clamp-2 text-xs leading-snug text-zb-muted sm:mt-3 sm:text-sm sm:leading-relaxed lg:mx-auto lg:mt-5 lg:line-clamp-none lg:max-w-2xl lg:text-base">
              <span className="lg:hidden">{SOLUTIONS_SECTION.descriptionMobile}</span>
              <span className="hidden lg:inline">{SOLUTIONS_SECTION.description}</span>
            </p>
          </div>
        </MotionReveal>

        <div className="mt-4 grid grid-cols-2 gap-1.5 sm:mt-5 sm:gap-2 lg:hidden">
          {SOLUTIONS.map((s, i) => (
            <SolutionCard key={s.slug} solution={s} index={i} variant="mobile-grid" />
          ))}
        </div>

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
          <div className="mx-auto grid max-w-[52rem] gap-5 lg:grid-cols-3">
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
