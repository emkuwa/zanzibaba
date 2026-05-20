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
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
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
              className="group flex h-full flex-col rounded-sm border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-zb-gold/40 hover:bg-white/10"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-sm border border-zb-gold/30 bg-zb-gold/10">
                <SectorIcon name={sector.icon} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-white group-hover:text-zb-gold transition-colors">
                {sector.title}
              </h3>
              <p className="mt-4 flex-1 text-sm font-light leading-relaxed text-white/70">
                {sector.description}
              </p>
              <span className="mt-6 text-sm font-medium text-zb-gold opacity-80 group-hover:opacity-100">
                Explore →
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}
