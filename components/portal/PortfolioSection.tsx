"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MotionReveal } from "./MotionReveal";
import { PORTFOLIO_ITEMS } from "@/data/homepage";

function ProjectMeta({
  sector,
  location,
  status,
}: {
  sector: string;
  location: string;
  status: string;
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.65rem] font-medium uppercase tracking-wider text-zb-gold/90 sm:text-xs">
      <span>{sector}</span>
      <span className="text-white/35">·</span>
      <span className="text-white/65">{location}</span>
      <span className="text-white/45">· {status}</span>
    </div>
  );
}

export function PortfolioSection() {
  const reduce = useReducedMotion();
  const [featured, residential, commercial] = PORTFOLIO_ITEMS;

  return (
    <section id="portfolio" className="bg-white">
      <div className="container-portal section-py-sm lg:section-py">
        <MotionReveal>
          <div className="max-w-2xl lg:mx-auto lg:max-w-3xl lg:text-center">
            <p className="text-eyebrow">Portfolio</p>
            <h2 className="mt-3 text-section-title text-zb-navy sm:mt-4">
              Portfolio Of Distinction
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zb-muted sm:mt-5 sm:text-base lg:text-lg">
              Explore indicative programmes across residential, commercial, and hospitality sectors.
            </p>
          </div>
        </MotionReveal>

        <div className="mt-10 flex flex-col gap-5 sm:mt-12 lg:hidden">
          {PORTFOLIO_ITEMS.map((item, i) => (
            <motion.article
              key={item.id}
              className="group relative min-h-[12rem] overflow-hidden rounded-sm shadow-zb-card sm:min-h-[14rem]"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link href={item.href} className="block h-full">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="100vw"
                  />
                )}
                {!item.image && (
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-zb-navy via-[#1a4a8f] to-zb-navy-deep"
                    aria-hidden
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/95 via-zb-navy/55 to-zb-navy/15" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <ProjectMeta
                    sector={item.sector}
                    location={item.location}
                    status={item.status}
                  />
                  <h3 className="mt-2 font-sans text-xl font-bold text-white sm:text-2xl">
                    {item.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-zb-gold">
                    Read More
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 hidden gap-6 lg:grid lg:grid-cols-2">
          <motion.article
            className="group relative min-h-[32rem] overflow-hidden rounded-sm shadow-zb-lg"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <Link href={featured.href} className="flex h-full flex-col justify-end">
              {featured.image && (
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="50vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/95 via-zb-navy-deep/55 to-zb-navy/25" />
              <div className="relative p-10">
                <ProjectMeta
                  sector={featured.sector}
                  location={featured.location}
                  status={featured.status}
                />
                <h3 className="mt-4 font-sans text-3xl font-bold text-white lg:text-4xl">
                  {featured.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">
                  {featured.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-zb-gold transition-transform group-hover:translate-x-0.5">
                  Read More
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </motion.article>

          <div className="flex flex-col gap-6">
            <motion.article
              className="group relative min-h-[15rem] flex-1 overflow-hidden rounded-sm shadow-zb-card transition-shadow hover:shadow-zb-card-hover"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <Link href={residential.href} className="block h-full">
                {residential.image && (
                  <Image
                    src={residential.image}
                    alt={residential.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/90 via-zb-navy/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <ProjectMeta
                    sector={residential.sector}
                    location={residential.location}
                    status={residential.status}
                  />
                  <h3 className="mt-3 font-sans text-2xl font-bold text-white">
                    {residential.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-white/75">
                    {residential.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-zb-gold">
                    Read More
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </motion.article>

            <motion.article
              className="group relative min-h-[16rem] flex-1 overflow-hidden rounded-sm shadow-zb-card"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.14 }}
            >
              <Link href={commercial.href} className="block h-full">
                <Image
                  src={commercial.image!}
                  alt={commercial.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/95 via-zb-navy/45 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <ProjectMeta
                    sector={commercial.sector}
                    location={commercial.location}
                    status={commercial.status}
                  />
                  <h3 className="mt-3 font-sans text-2xl font-bold text-white">
                    {commercial.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-zb-gold transition-transform group-hover:translate-x-0.5">
                    Read More
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </motion.article>
          </div>
        </div>
        <p className="mt-8 text-center text-xs font-light text-zb-muted lg:mt-10">
          Project details indicative for planning. Not audited financials.
        </p>
      </div>
    </section>
  );
}
