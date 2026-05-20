"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FLAGSHIP_PROJECTS } from "@/data/homepage";
import { MotionReveal } from "./MotionReveal";
import { Section } from "./Section";

export function FlagshipProjects() {
  const reduce = useReducedMotion();

  return (
    <Section
      id="flagship"
      dark
      eyebrow="Flagship Projects"
      title="Programmes of distinction"
      subtitle="Indicative portfolio highlights — sector, location, and status for planning discussions. Not audited financials."
      align="center"
      showDivider
      className="relative overflow-hidden"
      containerClassName="relative z-10"
    >
      <div className="pointer-events-none absolute inset-0 pattern-architectural opacity-60" aria-hidden />
      <ul className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {FLAGSHIP_PROJECTS.map((project, i) => (
          <motion.li
            key={project.id}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={project.href}
              className="group relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-sm border border-white/10 shadow-zb-lg transition-all duration-500 hover:border-zb-gold/35 hover:shadow-zb-gold-glow sm:min-h-[20rem]"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/95 via-zb-navy-deep/50 to-zb-navy/20" />
              <div className="relative mt-auto p-6 sm:p-7">
                <div className="flex flex-wrap gap-2 text-[0.65rem] font-medium uppercase tracking-wider text-zb-gold/90">
                  <span>{project.sector}</span>
                  <span className="text-white/40">·</span>
                  <span className="text-white/70">{project.location}</span>
                </div>
                <h3 className="mt-3 font-serif text-lg font-semibold text-white sm:text-xl">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs font-light leading-relaxed text-white/70 sm:text-sm">
                  {project.description}
                </p>
                <span className="mt-3 inline-block text-[0.65rem] font-medium uppercase tracking-wider text-white/50">
                  {project.status} · Indicative
                </span>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
      <MotionReveal className="mt-10 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zb-gold transition-colors hover:text-white"
        >
          View full portfolio
          <span aria-hidden>→</span>
        </Link>
      </MotionReveal>
    </Section>
  );
}
