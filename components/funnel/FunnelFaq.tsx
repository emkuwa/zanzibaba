"use client";

import { useState } from "react";
import { FUNNEL_FAQ } from "@/data/funnel";
import { FunnelSection } from "./FunnelSection";

export function FunnelFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <FunnelSection
      id="faq"
      eyebrow="Investor FAQ"
      title="Frequently asked questions"
      subtitle="Answers for international buyers exploring Zanzibar real estate and off-plan investment."
      className="bg-white"
    >
      <ul className="mx-auto max-w-3xl divide-y divide-zb-border rounded-sm border border-zb-border bg-white shadow-zb-card">
        {FUNNEL_FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="font-medium text-zb-navy">{item.q}</span>
                <span className="shrink-0 font-serif text-xl text-zb-gold" aria-hidden>
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <p className="border-t border-zb-border/60 px-5 pb-5 text-sm leading-relaxed text-zb-muted sm:px-6">
                  {item.a}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </FunnelSection>
  );
}
