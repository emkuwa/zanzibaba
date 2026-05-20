"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "./Button";
import { HERO_COPY, HERO_IMAGES } from "@/data/homepage";

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section ref={ref} className="relative flex min-h-[26rem] overflow-hidden sm:min-h-[30rem] lg:min-h-[88vh]">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y: imageY }}>
        <Image
          src={HERO_IMAGES.primary}
          alt="Stone Town harbor at sunset, Zanzibar"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/95 via-zb-navy-deep/55 to-zb-navy/25 lg:from-zb-navy-deep/85 lg:via-zb-navy-deep/45 lg:to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-zb-navy-deep/70 via-transparent to-transparent lg:from-zb-navy-deep/50"
        aria-hidden
      />

      <div className="container-portal relative z-10 flex flex-1 flex-col justify-center py-14 sm:py-16 lg:py-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {/* Mobile: serif headline */}
          <h1 className="text-hero-headline lg:hidden">
            <span className="block text-white">{HERO_COPY.line1}</span>
            <span className="mt-1 block text-zb-gold sm:mt-2">{HERO_COPY.line2}</span>
          </h1>

          {/* Desktop: sans bold — navy line 1 on light gradient, gold line 2 */}
          <h1 className="hidden text-hero-headline-desktop lg:block">
            <span className="block text-white drop-shadow-sm">{HERO_COPY.line1}</span>
            <span className="mt-2 block text-zb-gold">{HERO_COPY.line2}</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm font-normal leading-relaxed text-white/90 sm:text-base lg:mt-6 lg:max-w-2xl lg:text-lg">
            <span className="lg:hidden">{HERO_COPY.subheadingMobile}</span>
            <span className="hidden lg:inline">{HERO_COPY.subheadingDesktop}</span>
          </p>

          {/* Mobile CTAs */}
          <div className="mt-7 flex flex-row gap-3 sm:mt-8 sm:gap-4 lg:hidden">
            <Button
              href="/solutions"
              variant="gold"
              size="lg"
              className="min-w-0 flex-1 !text-zb-navy-deep sm:flex-none sm:min-w-[9.5rem]"
            >
              Our Solutions
            </Button>
            <Button
              href="/contact"
              variant="outline-light"
              size="lg"
              className="min-w-0 flex-1 !border-white !bg-transparent !text-white hover:!bg-white/10 sm:flex-none sm:min-w-[9.5rem]"
            >
              Get in Touch
            </Button>
          </div>

          {/* Desktop CTAs */}
          <div className="mt-8 hidden flex-row flex-wrap gap-4 lg:flex">
            <Button href="/solutions" variant="navy" size="lg">
              Explore Our Solutions
              <span aria-hidden>→</span>
            </Button>
            <Button
              href="/about"
              variant="outline-light"
              size="lg"
              className="!border-white !bg-transparent !text-white hover:!bg-white/10"
            >
              About Zanzibaba Group
              <span aria-hidden>→</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
