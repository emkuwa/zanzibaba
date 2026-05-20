"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MotionReveal } from "./MotionReveal";
import { PORTFOLIO_ITEMS } from "@/data/homepage";

export function PortfolioSection() {
  const reduce = useReducedMotion();
  const [featured, residential, commercial] = PORTFOLIO_ITEMS;

  return (
    <section id="portfolio" className="bg-white">
      <div className="container-portal section-py-sm lg:section-py">
        <MotionReveal>
          <div className="max-w-2xl lg:mx-auto lg:max-w-3xl lg:text-center">
            <h2 className="font-serif text-2xl font-semibold leading-tight text-zb-navy sm:text-3xl lg:text-[2.5rem]">
              Portfolio Of Distinction
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zb-muted sm:mt-5 sm:text-base lg:text-lg">
              Explore our diverse range of projects across various sectors.
            </p>
          </div>
        </MotionReveal>

        {/* Mobile: 3 stacked vertical cards */}
        <div className="mt-8 flex flex-col gap-4 sm:mt-10 lg:hidden">
          <motion.article
            className="group relative min-h-[11rem] overflow-hidden rounded-sm sm:min-h-[12rem]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href={featured.href} className="flex h-full flex-col justify-end p-6 sm:p-8">
              <div
                className="absolute inset-0 bg-gradient-to-br from-zb-navy via-[#1a4a8f] to-zb-navy-deep"
                aria-hidden
              />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse at 70% 30%, rgba(200,155,60,0.25), transparent 55%)",
                }}
                aria-hidden
              />
              <div className="relative">
                <h3 className="font-sans text-xl font-bold text-white sm:text-2xl">
                  {featured.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-zb-gold">
                  Read More
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </motion.article>

          <motion.article
            className="group rounded-sm border border-zb-border bg-white p-6 shadow-zb-card transition-all hover:border-zb-gold/25 sm:p-8"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
          >
            <Link href={residential.href} className="block">
              <h3 className="font-sans text-xl font-bold text-zb-navy sm:text-2xl">
                {residential.title}
              </h3>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-zb-gold">
                Read More
                <span aria-hidden>→</span>
              </span>
            </Link>
          </motion.article>

          <motion.article
            className="group relative min-h-[11rem] overflow-hidden rounded-sm sm:min-h-[12rem]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            <Link href={commercial.href} className="block h-full">
              <Image
                src={commercial.image!}
                alt={commercial.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/90 via-zb-navy/50 to-zb-navy/20" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <h3 className="font-sans text-xl font-bold text-white sm:text-2xl">
                  {commercial.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-zb-gold">
                  Read More
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </motion.article>
        </div>

        {/* Desktop: featured left + stacked right */}
        <div className="mt-14 hidden gap-6 lg:grid lg:grid-cols-2">
          <motion.article
            className="group relative min-h-[28rem] overflow-hidden rounded-sm"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <Link href={featured.href} className="flex h-full flex-col justify-end p-10">
              <div
                className="absolute inset-0 bg-gradient-to-br from-zb-navy via-[#1a4a8f] to-zb-navy-deep transition-transform duration-700 group-hover:scale-[1.02]"
                aria-hidden
              />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse at 70% 30%, rgba(200,155,60,0.25), transparent 55%)",
                }}
                aria-hidden
              />
              <div className="relative">
                <h3 className="font-sans text-3xl font-bold text-white lg:text-4xl">
                  {featured.title}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-white/75">
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
              className="group flex flex-1 flex-col justify-center rounded-sm border border-zb-border bg-white p-10 shadow-zb-card transition-all hover:border-zb-gold/25 hover:shadow-zb-card-hover"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <Link href={residential.href} className="block">
                <h3 className="font-sans text-2xl font-bold text-zb-navy">{residential.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-zb-muted">
                  {residential.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-zb-navy transition-colors group-hover:text-zb-gold">
                  Read More
                  <span aria-hidden>→</span>
                </span>
              </Link>
            </motion.article>

            <motion.article
              className="group relative min-h-[16rem] flex-1 overflow-hidden rounded-sm"
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
                <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/90 via-zb-navy/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <h3 className="font-sans text-2xl font-bold text-white">{commercial.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-zb-gold transition-transform group-hover:translate-x-0.5">
                    Read More
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}
