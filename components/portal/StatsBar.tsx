"use client";

import { motion, useReducedMotion } from "framer-motion";
import trustMetrics from "@/data/trust-metrics.json";

type MetricIcon = "award" | "building" | "people" | "map";

function MetricIconSvg({ type }: { type: MetricIcon }) {
  const cls = "h-7 w-7 text-zb-gold sm:h-8 sm:w-8";
  switch (type) {
    case "award":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15l-2 5 2-1 2 1-2-5M8 8a4 4 0 118 0 4 4 0 01-8 0zM5 21h14" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3l1.5 2M15 3l-1.5 2" />
        </svg>
      );
    case "building":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01" />
        </svg>
      );
    case "people":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H2v-2a4 4 0 014-4h1m8-4a4 4 0 11-8 0 4 4 0 018 0zM16 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case "map":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z" />
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
    <section
      className="relative overflow-hidden bg-zb-navy-deep text-white"
      aria-label="Group experience metrics"
    >
      <div className="container-portal py-12 sm:py-14 lg:py-16">
        <ul className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-6">
          {metrics.map((m, i) => {
            const content = (
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <MetricIconSvg type={m.icon as MetricIcon} />
                <p className="mt-4 font-sans text-3xl font-bold tracking-tight text-zb-gold sm:text-4xl lg:text-[2.5rem]">
                  {m.value}
                </p>
                <p className="mt-2 max-w-[11rem] text-xs font-medium leading-snug text-white/90 sm:text-sm lg:max-w-none">
                  {m.label}
                </p>
              </div>
            );

            return (
              <li key={m.id}>
                {reduce ? (
                  content
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.45 }}
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
