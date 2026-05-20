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
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[28rem] flex-col overflow-hidden sm:min-h-[32rem] lg:min-h-[88vh]"
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: imageY }}
      >
        <Image
          src={HERO_IMAGES.primary}
          alt="Stone Town coastal harbor at dusk"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/90 via-zb-navy-deep/50 to-zb-navy-deep/25"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-zb-navy-deep/70 via-zb-navy-deep/30 to-transparent lg:from-zb-navy-deep/60 lg:via-zb-navy-deep/25"
        aria-hidden
      />

      <div className="container-portal relative z-10 flex flex-1 flex-col justify-center py-14 sm:py-16 lg:py-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <h1 className="text-hero-headline">
            <span className="text-white">{HERO_COPY.line1}</span>
            <span className="mt-1 block text-zb-gold sm:mt-2">{HERO_COPY.line2}</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm font-normal leading-relaxed text-white/90 sm:mt-6 sm:text-base lg:text-lg">
            {HERO_COPY.subheading}
          </p>

          <div className="mt-7 flex flex-row flex-wrap gap-3 sm:mt-8 sm:gap-4">
            <Button
              href="/solutions"
              variant="gold"
              size="lg"
              className="min-w-0 flex-1 !text-zb-navy-deep sm:flex-none sm:min-w-[10rem]"
            >
              Our Solutions
            </Button>
            <Button
              href="/contact"
              variant="outline-light"
              size="lg"
              className="min-w-0 flex-1 !border-white !bg-transparent !text-white hover:!bg-white/10 sm:flex-none sm:min-w-[10rem]"
            >
              Get in Touch
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
