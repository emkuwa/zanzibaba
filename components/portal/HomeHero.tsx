"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Button } from "./Button";
import { HeroStats } from "./HeroStats";
import { HERO_COPY, HERO_IMAGES } from "@/data/homepage";

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-zb-navy via-[#0c3278] to-zb-navy-deep lg:min-h-[32rem] lg:bg-gradient-to-br lg:from-zb-navy lg:via-[#243f6b] lg:to-[#5a6a7d]"
    >
      {/* Faint architectural texture — desktop */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        <Image
          src={HERO_IMAGES.primary}
          alt=""
          fill
          className="object-cover object-center opacity-[0.12]"
          sizes="100vw"
          priority
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zb-navy-deep/80 via-transparent to-zb-navy/30 lg:from-zb-navy-deep/60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-50 lg:opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 20% 0%, rgba(200,155,60,0.1), transparent 50%)",
        }}
        aria-hidden
      />

      <div className="container-portal relative z-10 py-12 sm:py-14 lg:flex lg:min-h-[32rem] lg:flex-col lg:justify-center lg:py-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <h1 className="text-hero-headline">
            <span className="block text-white lg:inline">
              BUILDING <span className="text-zb-gold">TODAY</span>,
            </span>
            <span className="mt-1 block text-white sm:mt-2 lg:mt-0 lg:inline">
              {" "}
              EMPOWERING <span className="text-zb-gold">TOMORROW</span>.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm font-normal leading-relaxed text-white/90 sm:text-base lg:mt-6 lg:text-lg">
            {HERO_COPY.subheading}
          </p>

          {/* Mobile CTAs */}
          <div className="mt-7 flex flex-row gap-3 sm:mt-8 sm:gap-4 lg:hidden">
            <Button
              href="/solutions"
              variant="gold"
              size="lg"
              className="min-w-0 flex-1 !text-zb-navy-deep sm:flex-none sm:min-w-[9.5rem]"
            >
              Our Services
            </Button>
            <Button
              href="/about"
              variant="outline-light"
              size="lg"
              className="min-w-0 flex-1 !border-white !bg-transparent !text-white hover:!bg-white/10 sm:flex-none sm:min-w-[9.5rem]"
            >
              About Us
            </Button>
          </div>

          {/* Desktop CTAs */}
          <div className="mt-8 hidden flex-row gap-4 lg:flex">
            <Button href="/contact" variant="gold" size="lg">
              Get Started
            </Button>
            <Button
              href="/about"
              variant="outline-light"
              size="lg"
              className="!border-white !bg-transparent !text-white hover:!bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Mobile: stats integrated in hero */}
        <HeroStats className="mt-10 sm:mt-12 lg:hidden" />
      </div>
    </section>
  );
}
