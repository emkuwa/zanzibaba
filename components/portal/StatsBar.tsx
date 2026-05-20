"use client";

import { motion, useReducedMotion } from "framer-motion";
import trustMetrics from "@/data/trust-metrics.json";

type MetricIcon = "award" | "building" | "people" | "map";

function MetricIconSvg({ type }: { type: MetricIcon }) {
  const cls = "h-6 w-6 text-zb-gold sm:h-7 sm:w-7";
  switch (type) {
    case "award":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <circle cx="12" cy="9" r="4" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 9l-1.5 8 5.5-2.5L17.5 17 16 9M12 5V3" />
        </svg>
      );
    case "building":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01" />
        </svg>
      );
    case "people":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H2v-2a4 4 0 014-4h1m8-4a4 4 0 11-8 0 4 4 0 018 0zM16 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case "map":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" strokeWidth={1.75} />
        </svg>
      );
    default:
      return null;
  }
}

export function StatsBar() {
  const { metrics } = trustMetrics;
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-zb-navy" aria-label="Group experience metrics">
      <div className="container-portal py-8 sm:py-10 lg:py-12">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => {
            const isLast = i === metrics.length - 1;
            const content = (
              <div className="flex flex-col items-center px-3 py-2 text-center sm:px-4">
                <MetricIconSvg type={m.icon as MetricIcon} />
                <p className="mt-2 font-sans text-xl font-bold tracking-tight text-zb-gold sm:mt-3 sm:text-2xl lg:text-3xl">
                  {m.value}
                </p>
                {m.label ? (
                  <p className="mt-1 text-[0.65rem] font-medium leading-snug text-white/85 sm:text-xs">
                    {m.label}
                  </p>
                ) : null}
              </div>
            );

            return (
              <li
                key={m.id}
                className={`relative ${
                  !isLast
                    ? "after:absolute after:right-0 after:top-1/2 after:hidden after:h-12 after:w-px after:-translate-y-1/2 after:bg-zb-gold/40 lg:after:block"
                    : ""
                } ${i % 2 === 0 ? "before:absolute before:right-0 before:top-1/2 before:h-10 before:w-px before:-translate-y-1/2 before:bg-zb-gold/40 lg:before:hidden" : ""} ${i < 2 ? "border-b border-zb-gold/20 pb-4 lg:border-b-0 lg:pb-0" : "pt-4 lg:pt-0"}`}
              >
                {reduce ? (
                  content
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    {content}
                  </motion.div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
