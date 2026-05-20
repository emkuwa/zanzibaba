"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Solution } from "@/data/solutions";
import { SolutionIcon } from "@/components/portal/icons/SolutionIcon";
import { Card } from "./Card";

interface SolutionCardProps {
  solution: Solution;
  index?: number;
}

export function SolutionCard({ solution, index = 0 }: SolutionCardProps) {
  const reduce = useReducedMotion();
  const href = solution.externalUrl ?? `/solutions/${solution.slug}`;
  const external = Boolean(solution.externalUrl);

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
        <div className="mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-sm border border-zb-border/70 bg-white shadow-zb-sm transition-colors group-hover:border-zb-gold/30">
          <SolutionIcon slug={solution.slug} className="h-14 w-14" />
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
