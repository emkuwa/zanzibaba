"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SOLUTIONS } from "@/data/solutions";

const showcase = SOLUTIONS.slice(0, 4);

export function PortfolioShowcase() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-white">
      <div className="container-wide section-py">
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:mb-20">
          <div className="max-w-xl">
            <p className="text-eyebrow">Portfolio Showcase</p>
            <h2 className="mt-4 text-section-title text-zb-navy">
              Excellence across every division
            </h2>
          </div>
          <Link
            href="/solutions"
            className="text-sm font-medium text-zb-navy transition-colors hover:text-zb-gold"
          >
            View all solutions →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {showcase.map((item, i) => (
            <motion.div
              key={item.slug}
              className={`group relative overflow-hidden rounded-sm ${
                i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <Link
                href={`/solutions/${item.slug}`}
                className="block"
              >
                <div
                  className={`relative ${
                    i === 0 ? "aspect-[4/3] sm:aspect-auto sm:min-h-[420px]" : "aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={item.heroImage}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes={
                      i === 0
                        ? "(max-width: 640px) 100vw, 50vw"
                        : "(max-width: 640px) 50vw, 25vw"
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/90 via-zb-navy/30 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h3
                    className={`font-serif font-semibold text-white ${
                      i === 0 ? "text-2xl sm:text-3xl" : "text-lg"
                    }`}
                  >
                    {item.title}
                  </h3>
                  {i === 0 && (
                    <p className="mt-2 max-w-sm text-sm font-light text-white/75">
                      {item.shortDescription}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
