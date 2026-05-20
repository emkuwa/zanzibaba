"use client";

import { motion, useReducedMotion } from "framer-motion";
import trustMetrics from "@/data/trust-metrics.json";

type MetricIcon = "award" | "building" | "people" | "map";

function MetricIconSvg({
  type,
  light = false,
}: {
  type: MetricIcon;
  light?: boolean;
}) {
  const cls = `h-6 w-6 sm:h-7 sm:w-7 ${light ? "text-white" : "text-zb-gold"}`;
  switch (type) {
    case "award":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
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

interface HeroStatsProps {
  /** White icons for dark hero; gold for standalone bar */
  light?: boolean;
  className?: string;
}

export function HeroStats({ light = true, className = "" }: HeroStatsProps) {
  const { metrics } = trustMetrics;
  const reduce = useReducedMotion();

  return (
    <ul
      className={`grid grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:gap-8 lg:grid-cols-4 lg:gap-6 lg:pt-10 ${className}`}
      aria-label="Group experience metrics"
    >
      {metrics.map((m, i) => {
        const content = (
          <div className="flex flex-col items-center text-center">
            <MetricIconSvg type={m.icon as MetricIcon} light={light} />
            <p
              className={`mt-3 font-sans text-2xl font-bold tracking-tight sm:text-3xl ${
                light ? "text-white" : "text-zb-gold"
              }`}
            >
              {m.value}
            </p>
            <p className="mt-1.5 max-w-[9rem] text-[0.6875rem] font-medium leading-snug text-white/80 sm:max-w-none sm:text-xs">
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
                initial={{ opacity: 0, y: 12 }}
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
  );
}
