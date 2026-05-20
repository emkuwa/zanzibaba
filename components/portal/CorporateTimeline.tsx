"use client";

import { CORPORATE_TIMELINE } from "@/data/homepage";
import { MotionReveal } from "./MotionReveal";
import { Section } from "./Section";

export function CorporateTimeline() {
  return (
    <Section
      warm
      eyebrow="Our Journey"
      title="A decade of disciplined growth"
      subtitle="Milestones reflect indicative group history — not audited financial reporting."
      align="center"
      showDivider
    >
      <div className="relative mt-4 overflow-x-auto pb-2">
        <div className="flex min-w-[36rem] gap-0 sm:min-w-0 sm:grid sm:grid-cols-4">
          {CORPORATE_TIMELINE.map((item, i) => (
            <MotionReveal key={item.year} delay={i * 0.08} className="relative flex-1 px-4 sm:px-6">
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <span className="font-serif text-2xl font-semibold text-zb-gold sm:text-3xl">
                  {item.year}
                </span>
                <span className="mt-2 h-px w-8 bg-zb-gold/50 sm:mt-3" aria-hidden />
                <h3 className="mt-3 font-sans text-sm font-bold text-zb-navy sm:text-base">
                  {item.label}
                </h3>
                <p className="mt-2 text-xs font-light leading-relaxed text-zb-muted sm:text-sm">
                  {item.detail}
                </p>
              </div>
              {i < CORPORATE_TIMELINE.length - 1 && (
                <span
                  className="absolute right-0 top-6 hidden h-px w-full max-w-none bg-gradient-to-r from-zb-gold/40 to-transparent sm:block"
                  style={{ left: "50%", width: "100%" }}
                  aria-hidden
                />
              )}
            </MotionReveal>
          ))}
        </div>
      </div>
      <p className="mt-10 text-center text-xs font-light text-zb-muted">
        Timeline indicative for corporate storytelling. Not audited financials.
      </p>
    </Section>
  );
}
