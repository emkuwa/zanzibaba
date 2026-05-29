"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { STRATEGIC_SECTORS } from "@/data/homepage";
import { Section } from "./Section";
import { SectorIcon } from "./SectorIcon";

export function StrategicSectors() {
  const reduce = useReducedMotion();

  return (
    <Section
      dark
      eyebrow="Strategic Sectors"
      title="Diversified across the value chain"
      subtitle="Four pillars anchoring our holding company model — property, infrastructure, hospitality, and corporate services."
      align="center"
      showDivider
    >
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {STRATEGIC_SECTORS.map((sector, i) => (
          <motion.li
            key={sector.id}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
          >
            <Link
              href={sector.href}
              className="group flex h-full flex-col rounded-sm border border-white/10 bg-white/5 p-4 shadow-zb-sm transition-all duration-300 hover:border-zb-gold/40 hover:bg-white/10 sm:p-6 lg:p-8 lg:hover:-translate-y-1 lg:hover:shadow-zb-gold-glow"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-sm border border-zb-gold/30 bg-zb-gold/10 sm:mb-4 sm:h-12 sm:w-12 lg:mb-6 lg:h-14 lg:w-14">
                <SectorIcon name={sector.icon} />
              </div>
              <h3 className="font-serif text-sm font-semibold text-white transition-colors group-hover:text-zb-gold sm:text-base lg:text-xl">
                {sector.title}
              </h3>
              <p className="mt-2 line-clamp-2 flex-1 text-[0.6875rem] font-light leading-relaxed text-white/70 sm:mt-3 sm:text-sm lg:line-clamp-none">
                {sector.description}
              </p>
              <span className="mt-3 text-xs font-medium text-zb-gold opacity-80 group-hover:opacity-100 sm:mt-4 lg:mt-6 lg:text-sm">
                Explore →
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}
