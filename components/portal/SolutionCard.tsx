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

function ChevronRight({ className = "h-4 w-4 shrink-0 text-zb-gold" }: { className?: string }) {
  return (
    <svg
      className={className}
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
  const href = `/solutions/${solution.slug}`;
  const title = titleOverride ?? solution.title;

  if (variant === "mobile-grid") {
    const card = (
      <Link
        href={href}
        className="group flex aspect-[3/2] min-h-0 flex-col items-center justify-center gap-1.5 overflow-hidden rounded-lg border border-zb-border/45 bg-white p-2 text-center shadow-[0_1px_6px_rgba(10,46,115,0.05)] transition-colors duration-200 hover:border-zb-gold/25 sm:gap-2 sm:p-2.5"
      >
        <SolutionIcon slug={solution.slug} className="h-12 w-12 sm:h-14 sm:w-14" />
        <div className="flex w-full items-center justify-center gap-1 px-0.5">
          <h3 className="font-sans text-[0.6875rem] font-bold leading-tight text-zb-navy sm:text-xs">
            {title}
          </h3>
          <ChevronRight className="h-3 w-3 shrink-0 text-zb-gold sm:h-3.5 sm:w-3.5" />
        </div>
      </Link>
    );

    return reduce ? (
      card
    ) : (
      <motion.div
        className="h-full"
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
        className="flex h-full flex-col card-padding-lg"
      >
        <div className="mb-5 flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-sm sm:h-[4.25rem] sm:w-[4.25rem]">
          <SolutionIcon slug={solution.slug} className="h-16 w-16 sm:h-[4.25rem] sm:w-[4.25rem]" />
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
