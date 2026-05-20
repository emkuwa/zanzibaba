"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Solution } from "@/data/solutions";
import { SolutionIcon } from "@/components/portal/icons/SolutionIcon";
import { Card } from "./Card";

interface SolutionCardProps {
  solution: Solution;
  index?: number;
  variant?: "mobile-grid" | "full";
  titleOverride?: string;
}

function ChevronRight() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-zb-gold"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function SolutionCard({
  solution,
  index = 0,
  variant = "full",
  titleOverride,
}: SolutionCardProps) {
  const reduce = useReducedMotion();
  const href = solution.externalUrl ?? `/solutions/${solution.slug}`;
  const external = Boolean(solution.externalUrl);
  const title = titleOverride ?? solution.title;

  if (variant === "mobile-grid") {
    const card = (
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex h-full min-h-[6rem] flex-col justify-between rounded-sm border border-zb-border/70 bg-white p-4 shadow-zb-card transition-all duration-300 hover:-translate-y-0.5 hover:border-zb-gold/35 hover:shadow-zb-gold-glow sm:p-5"
      >
        <div className="flex h-10 w-10 items-center justify-center text-zb-navy">
          <SolutionIcon slug={solution.slug} className="h-9 w-9" />
        </div>
        <div className="mt-3 flex items-end justify-between gap-1">
          <h3 className="font-sans text-[0.8125rem] font-bold leading-tight text-zb-navy">
            {title}
          </h3>
          <ChevronRight />
        </div>
      </Link>
    );

    return reduce ? (
      card
    ) : (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      >
        {card}
      </motion.div>
    );
  }

  const card = (
    <Card
      as="article"
      className="group flex h-full flex-col border-zb-border/80 bg-white shadow-zb-card transition-all duration-300 hover:-translate-y-1 hover:border-zb-gold/30 hover:shadow-zb-gold-glow"
    >
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex h-full flex-col card-padding-lg"
      >
        <div className="mb-5 shrink-0 text-zb-gold">
          <SolutionIcon slug={solution.slug} className="h-12 w-12 sm:h-14 sm:w-14" />
        </div>
        <h3 className="font-sans text-lg font-bold text-zb-navy sm:text-xl">{title}</h3>
        <p className="mt-3 line-clamp-2 flex-1 text-sm font-normal leading-relaxed text-zb-muted">
          {solution.shortDescription}
        </p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-zb-navy transition-colors group-hover:text-zb-gold">
          Learn More
          <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
            →
          </span>
        </span>
      </Link>
    </Card>
  );

  return reduce ? (
    card
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {card}
    </motion.div>
  );
}
