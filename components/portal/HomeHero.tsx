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
      className="relative flex min-h-[calc(100vh-5.5rem)] flex-col overflow-hidden bg-zb-navy-deep sm:min-h-[calc(100vh-6rem)] lg:min-h-[88vh]"
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: imageY }}
      >
        <Image
          src={HERO_IMAGES.primary}
          alt="Modern luxury architecture at dusk"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/95 via-zb-navy-deep/55 to-zb-navy-deep/30"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-zb-navy-deep/90 via-zb-navy-deep/45 to-transparent lg:from-zb-navy-deep/75 lg:via-zb-navy-deep/35"
        aria-hidden
      />

      <div className="container-portal relative z-10 flex flex-1 flex-col justify-center py-12 sm:py-16 lg:py-24">
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

          <p className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-white/85 sm:mt-8 sm:text-lg">
            {HERO_COPY.subheading}
          </p>

          <div className="mt-8 flex flex-row flex-wrap gap-3 sm:mt-10 sm:gap-4">
            <Button
              href="/solutions"
              variant="navy"
              size="lg"
              className="min-w-0 flex-1 !bg-zb-navy !shadow-md sm:flex-none sm:min-w-[10rem]"
            >
              Our Solutions
            </Button>
            <Button
              href="/about"
              variant="outline-light"
              size="lg"
              className="min-w-0 flex-1 !border-white !bg-transparent !text-white hover:!bg-white/10 sm:flex-none sm:min-w-[10rem]"
            >
              Learn More About Us
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
