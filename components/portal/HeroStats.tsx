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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M8 9l-1.5 8 5.5-2.5L17.5 17 16 9M12 5V3"
          />
        </svg>
      );
    case "building":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01"
          />
        </svg>
      );
    case "people":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H2v-2a4 4 0 014-4h1m8-4a4 4 0 11-8 0 4 4 0 018 0zM16 7a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      );
    case "map":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          />
          <circle cx="12" cy="9" r="2.5" strokeWidth={1.75} />
        </svg>
      );
    default:
      return null;
  }
}

interface HeroStatsProps {
  className?: string;
}

export function HeroStats({ className = "" }: HeroStatsProps) {
  const { metrics } = trustMetrics;
  const reduce = useReducedMotion();

  return (
    <ul
      className={`grid grid-cols-2 gap-x-2 gap-y-6 border-t border-white/15 pt-8 sm:gap-y-8 sm:pt-10 lg:grid-cols-4 lg:gap-6 ${className}`}
      aria-label="Group experience metrics"
    >
      {metrics.map((m, i) => {
        const content = (
          <div className="flex flex-col items-center px-1 text-center sm:px-2">
            <MetricIconSvg type={m.icon as MetricIcon} />
            <p className="mt-2 font-sans text-lg font-bold tracking-tight text-zb-gold sm:mt-3 sm:text-xl lg:text-2xl">
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
              i % 2 === 0
                ? "after:absolute after:right-0 after:top-1/2 after:h-10 after:w-px after:-translate-y-1/2 after:bg-zb-gold/30 lg:after:hidden"
                : ""
            } ${i < 2 ? "border-b border-white/10 pb-6 lg:border-b-0 lg:pb-0" : "pt-0 lg:pt-0"}`}
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
  );
}
