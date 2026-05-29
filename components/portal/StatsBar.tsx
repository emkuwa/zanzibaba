"use client";

import { motion, useReducedMotion } from "framer-motion";
import trustMetrics from "@/data/trust-metrics.json";

type MetricIcon = "award" | "building" | "people" | "map";

type Metric = {
  id: string;
  value: string;
  label: string;
  labelMobile?: string;
  icon: MetricIcon;
};

function MetricIconSvg({ type, className = "h-6 w-6 sm:h-7 sm:w-7 text-zb-gold" }: { type: MetricIcon; className?: string }) {
  switch (type) {
    case "award":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <circle cx="12" cy="9" r="4" strokeWidth={1.75} />
          <path strokeWidth={1.75} d="M8 9l-1.5 8 5.5-2.5L17.5 17 16 9M12 5V3" />
        </svg>
      );
    case "building":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path strokeWidth={1.75} d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
        </svg>
      );
    case "people":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path
            strokeWidth={1.75}
            d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H2v-2a4 4 0 014-4h1m8-4a4 4 0 11-8 0 4 4 0 018 0zM16 7a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      );
    case "map":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path strokeWidth={1.75} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" strokeWidth={1.75} />
        </svg>
      );
    default:
      return null;
  }
}

function TanzaniaMapIcon({ className = "h-7 w-7 text-zb-gold" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" aria-hidden>
      <path
        strokeWidth={1.6}
        strokeLinejoin="round"
        d="M10 8h8l3 4 5-1 4 3 2 6-1 8 3 5-2 4-6 2-9-1-5-4-3-7 2-5-4-2-6 1-4Z"
      />
    </svg>
  );
}

export function StatsBar() {
  const { metrics, disclaimer } = trustMetrics;
  const reduce = useReducedMotion();
  const typed = metrics as Metric[];

  return (
    <section className="relative border-b border-zb-gold/15 bg-zb-navy-deep" aria-label="Real estate experience metrics">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(200,155,60,0.06),transparent_60%)]" aria-hidden />
      <div className="container-portal relative z-10 py-3.5 sm:py-6 lg:py-12">
        <ul className="grid grid-cols-4 lg:grid-cols-4">
          {typed.map((m, i) => {
            const isLast = i === typed.length - 1;
            const isCoverage = m.id === "coverage";

            const content = (
              <div className="flex flex-col items-center px-1 py-1 text-center sm:px-4 sm:py-2 lg:px-5">
                {!isCoverage && (
                  <MetricIconSvg type={m.icon} className="hidden h-7 w-7 text-zb-gold lg:block" />
                )}

                {isCoverage ? (
                  <>
                    <TanzaniaMapIcon className="h-7 w-7 text-zb-gold sm:h-8 sm:w-8 lg:hidden" />
                    <MetricIconSvg type={m.icon} className="hidden h-7 w-7 text-zb-gold lg:block" />
                    <p className="hidden font-serif text-xl font-semibold tracking-tight text-zb-gold sm:text-2xl lg:mt-3 lg:block lg:text-4xl">
                      {m.value}
                    </p>
                  </>
                ) : (
                  <p className="font-serif text-xl font-semibold tracking-tight text-zb-gold sm:text-2xl lg:mt-3 lg:text-4xl">
                    {m.value}
                  </p>
                )}

                <p className="mt-1 text-[0.625rem] font-medium leading-snug text-white/85 sm:text-xs lg:mt-1.5">
                  <span className="lg:hidden">{m.labelMobile ?? m.label}</span>
                  <span className="hidden lg:inline">{m.label}</span>
                </p>
              </div>
            );

            return (
              <li
                key={m.id}
                className={`relative ${
                  !isLast
                    ? "after:absolute after:right-0 after:top-1/2 after:h-10 after:w-px after:-translate-y-1/2 after:bg-zb-gold/35 sm:after:h-12 lg:after:h-16"
                    : ""
                }`}
              >
                {reduce ? (
                  content
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.45 }}
                  >
                    {content}
                  </motion.div>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-center text-[0.625rem] font-light text-white/45 sm:mt-6 sm:text-xs lg:sr-only">
          {disclaimer}
        </p>
      </div>
    </section>
  );
}
