"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "./Button";
import { HERO_COPY, HERO_IMAGES } from "@/data/homepage";

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[18.5rem] overflow-hidden sm:min-h-[24rem] lg:min-h-[88vh]"
    >
      <motion.div
        className="absolute inset-0 bg-zb-navy-deep"
        style={reduce ? undefined : { y: imageY }}
      >
        <Image
          src={HERO_IMAGES.primary}
          alt="Stone Town Zanzibar at golden hour — historic Swahili architecture and harbor dhows"
          fill
          priority
          quality={90}
          className="object-cover object-[58%_62%] sm:object-[center_45%] lg:object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Readable scrim on all breakpoints — keeps headline legible on busy photos */}
      <div
        className="absolute inset-0 bg-zb-navy-deep/35"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/95 via-zb-navy-deep/55 to-zb-navy-deep/20"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-zb-navy-deep/90 via-zb-navy-deep/50 to-zb-navy-deep/10 lg:from-zb-navy-deep/92 lg:via-zb-navy-deep/45 lg:to-transparent"
        aria-hidden
      />

      <div className="container-portal relative z-10 flex flex-1 flex-col justify-end pb-8 pt-16 sm:justify-center sm:py-14 lg:py-24 xl:py-28">
        <motion.div
          variants={reduce ? undefined : stagger}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="max-w-3xl lg:max-w-2xl xl:max-w-3xl"
        >
          <motion.h1
            variants={reduce ? undefined : fadeUp}
            className="text-hero-headline sm:text-hero-headline-desktop [text-shadow:0_2px_28px_rgba(7,36,90,0.55)]"
          >
            <span className="block text-white">{HERO_COPY.line1}</span>
            <span className="mt-1 block text-zb-gold sm:mt-2">{HERO_COPY.line2}</span>
          </motion.h1>

          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="mt-3 max-w-xl text-[0.8125rem] font-normal leading-snug tracking-wide text-white/95 sm:mt-5 sm:text-sm lg:mt-7 lg:max-w-xl lg:text-lg xl:text-lg [text-shadow:0_1px_18px_rgba(7,36,90,0.45)]"
          >
            <span className="lg:hidden">{HERO_COPY.subheadingMobile}</span>
            <span className="hidden lg:inline">{HERO_COPY.subheadingDesktop}</span>
          </motion.p>

          <motion.div
            variants={reduce ? undefined : fadeUp}
            className="mt-5 flex flex-row gap-2 sm:mt-7 sm:gap-2.5 lg:hidden"
          >
            <Button
              href="/properties"
              variant="gold"
              size="md"
              className="min-w-0 flex-1 px-3 py-2.5 text-xs sm:flex-none sm:min-w-[9rem] sm:px-6 sm:py-3 sm:text-sm"
            >
              View Properties
            </Button>
            <Button
              href="/contact"
              variant="outline-light"
              size="md"
              className="min-w-0 flex-1 border-white/90 bg-transparent px-3 py-2.5 text-xs !text-white hover:!bg-white/10 sm:flex-none sm:min-w-[9rem] sm:px-6 sm:py-3 sm:text-sm"
            >
              Book Consultation
            </Button>
          </motion.div>

          <motion.div
            variants={reduce ? undefined : fadeUp}
            className="mt-10 hidden flex-row flex-wrap gap-4 lg:flex"
          >
            <Button href="/properties" variant="gold" size="lg">
              View Properties
              <span aria-hidden>→</span>
            </Button>
            <Button
              href="/contact"
              variant="outline-light"
              size="lg"
              className="!border-white/80 !bg-transparent !text-white hover:!bg-white/10"
            >
              Book Consultation
              <span aria-hidden>→</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
