"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Solution } from "@/data/solutions";
import { SolutionIcon } from "@/components/portal/icons/SolutionIcon";
import { Card } from "./Card";

interface SolutionCardProps {
  solution: Solution;
  index?: number;
  variant?: "compact" | "row" | "full";
}

function ChevronRight() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-zb-gold sm:h-5 sm:w-5"
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
  variant = "compact",
}: SolutionCardProps) {
  const reduce = useReducedMotion();
  const href = solution.externalUrl ?? `/solutions/${solution.slug}`;
  const external = Boolean(solution.externalUrl);

  if (variant === "row") {
    const card = (
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-zb-surface/50 sm:gap-5 sm:px-6 sm:py-5"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center text-zb-navy sm:h-14 sm:w-14">
          <SolutionIcon slug={solution.slug} className="h-11 w-11 sm:h-12 sm:w-12" />
        </div>
        <h3 className="min-w-0 flex-1 font-sans text-[0.9375rem] font-semibold leading-tight text-zb-navy sm:text-base">
          {solution.title}
        </h3>
        <ChevronRight />
      </Link>
    );

    if (reduce) return card;

    return (
      <motion.li
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{
          duration: 0.35,
          delay: index * 0.04,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {card}
      </motion.li>
    );
  }

  if (variant === "compact") {
    const card = (
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex items-center gap-3 rounded-md border border-zb-border/60 bg-white px-3.5 py-3 shadow-zb-sm transition-all duration-200 hover:border-zb-gold/30 hover:shadow-zb-card sm:gap-4 sm:px-4 sm:py-3.5"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center text-zb-navy sm:h-14 sm:w-14">
          <SolutionIcon slug={solution.slug} className="h-11 w-11 sm:h-12 sm:w-12" />
        </div>
        <h3 className="min-w-0 flex-1 font-sans text-sm font-semibold leading-tight text-zb-navy sm:text-[0.9375rem]">
          {solution.title}
        </h3>
        <ChevronRight />
      </Link>
    );

    if (reduce) return card;

    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{
          duration: 0.35,
          delay: index * 0.04,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {card}
      </motion.div>
    );
  }

  const card = (
    <Card
      as="article"
      className="group flex h-full flex-col border-zb-border/80 bg-white shadow-zb-card transition-all duration-300 hover:-translate-y-0.5 hover:border-zb-gold/25 hover:shadow-zb-card-hover"
    >
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex h-full flex-col p-6 sm:p-7"
      >
        <div className="mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-sm border border-zb-border/70 bg-white text-zb-navy shadow-zb-sm transition-colors group-hover:border-zb-gold/30">
          <SolutionIcon slug={solution.slug} className="h-14 w-14 text-zb-navy" />
        </div>
        <h3 className="font-sans text-lg font-bold text-zb-navy transition-colors group-hover:text-zb-navy sm:text-xl">
          {solution.title}
        </h3>
        <p className="mt-3 line-clamp-2 flex-1 text-sm font-normal leading-relaxed text-zb-muted">
          {solution.shortDescription}
        </p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-zb-navy transition-colors group-hover:text-zb-gold">
          Learn more
          <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
            →
          </span>
        </span>
      </Link>
    </Card>
  );

  if (reduce) return card;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {card}
    </motion.div>
  );
}
