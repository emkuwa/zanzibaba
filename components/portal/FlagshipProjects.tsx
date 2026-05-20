"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FLAGSHIP_PROJECTS } from "@/data/homepage";
import { Section } from "./Section";

export function FlagshipProjects() {
  const reduce = useReducedMotion();
  const [featured, ...rest] = FLAGSHIP_PROJECTS;

  return (
    <Section
      id="projects"
      eyebrow="Flagship Programmes"
      title="Portfolio of distinction"
      subtitle="Representative programmes across our integrated divisions — indicative case studies, not exhaustive listings."
      warm
      showDivider
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <motion.article
          className="group relative overflow-hidden rounded-sm lg:col-span-7"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link href={featured.href} className="block">
            <div className="relative aspect-[16/10] sm:aspect-[16/9]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/95 via-zb-navy/40 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
              <p className="text-eyebrow text-zb-gold/90">{featured.sector}</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-white sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-2 text-sm text-white/70">{featured.location}</p>
              <p className="mt-4 max-w-lg text-sm font-light leading-relaxed text-white/80">
                {featured.description}
              </p>
              <span className="mt-6 inline-flex text-sm font-medium text-zb-gold transition-transform group-hover:translate-x-1">
                View programme →
              </span>
            </div>
          </Link>
        </motion.article>

        <div className="flex flex-col gap-6 lg:col-span-5">
          {rest.map((project, i) => (
            <motion.article
              key={project.id}
              className="group relative flex-1 overflow-hidden rounded-sm border border-zb-border bg-white shadow-zb-card transition-shadow hover:shadow-zb-card-hover"
              initial={reduce ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            >
              <Link href={project.href} className="flex h-full flex-col sm:flex-row">
                <div className="relative aspect-[16/9] w-full shrink-0 sm:aspect-auto sm:w-44">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="200px"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-7">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-zb-gold">
                    {project.sector}
                  </p>
                  <h3 className="mt-2 font-serif text-lg font-semibold text-zb-navy group-hover:text-zb-gold transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs text-zb-muted">{project.location}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
