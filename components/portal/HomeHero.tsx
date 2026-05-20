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
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const accentX = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[28rem] overflow-hidden sm:min-h-[32rem] lg:min-h-[92vh]"
    >
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y: imageY }}>
        <Image
          src={HERO_IMAGES.primary}
          alt="Stone Town harbor at sunset, Zanzibar"
          fill
          priority
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
      </motion.div>

      <motion.div
        className="absolute inset-y-0 right-0 hidden w-[38%] lg:block"
        style={reduce ? undefined : { x: accentX }}
        aria-hidden
      >
        <div className="relative h-full w-full">
          <Image
            src={HERO_IMAGES.accent}
            alt=""
            fill
            className="object-cover object-center opacity-90"
            sizes="40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-zb-navy-deep/40 to-zb-navy-deep/90" />
        </div>
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep via-zb-navy-deep/70 to-zb-navy/30"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-zb-navy-deep/90 via-zb-navy-deep/40 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(200,155,60,0.12),transparent_50%)]"
        aria-hidden
      />
      <div className="absolute inset-0 texture-noise opacity-40 mix-blend-overlay" aria-hidden />

      <div className="container-portal relative z-10 flex flex-1 flex-col justify-center py-16 sm:py-20 lg:py-28">
        <motion.div
          variants={reduce ? undefined : stagger}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="max-w-3xl lg:max-w-4xl"
        >
          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="text-eyebrow mb-4 sm:mb-5"
          >
            Zanzibaba Group
          </motion.p>

          <motion.h1 variants={reduce ? undefined : fadeUp} className="text-hero-headline lg:hidden">
            <span className="block text-white">{HERO_COPY.line1}</span>
            <span className="mt-1 block text-zb-gold sm:mt-2">{HERO_COPY.line2}</span>
          </motion.h1>

          <motion.h1
            variants={reduce ? undefined : fadeUp}
            className="hidden text-hero-headline-desktop lg:block"
          >
            <span className="block text-white drop-shadow-md">{HERO_COPY.line1}</span>
            <span className="mt-2 block text-zb-gold">{HERO_COPY.line2}</span>
          </motion.h1>

          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="mt-6 max-w-xl text-base font-light leading-relaxed tracking-wide text-white/90 sm:text-lg lg:mt-8 lg:max-w-2xl lg:text-xl"
          >
            <span className="lg:hidden">{HERO_COPY.subheadingMobile}</span>
            <span className="hidden lg:inline">{HERO_COPY.subheadingDesktop}</span>
          </motion.p>

          <motion.div
            variants={reduce ? undefined : fadeUp}
            className="mt-8 flex flex-row gap-3 sm:mt-10 sm:gap-4 lg:hidden"
          >
            <Button
              href="/solutions"
              variant="gold"
              size="lg"
              className="min-w-0 flex-1 shadow-zb-gold sm:flex-none sm:min-w-[10rem]"
            >
              Our Solutions
            </Button>
            <Button
              href="/contact"
              variant="outline-light"
              size="lg"
              className="min-w-0 flex-1 !border-white/80 !bg-transparent !text-white hover:!bg-white/10 sm:flex-none sm:min-w-[10rem]"
            >
              Get in Touch
            </Button>
          </motion.div>

          <motion.div
            variants={reduce ? undefined : fadeUp}
            className="mt-10 hidden flex-row flex-wrap gap-4 lg:flex"
          >
            <Button href="/solutions" variant="gold" size="lg">
              Explore Our Solutions
              <span aria-hidden>→</span>
            </Button>
            <Button
              href="/about"
              variant="outline-light"
              size="lg"
              className="!border-white/80 !bg-transparent !text-white hover:!bg-white/10"
            >
              About Zanzibaba Group
              <span aria-hidden>→</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
