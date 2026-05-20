"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Button } from "./Button";
import { HERO_COPY, HERO_IMAGES } from "@/data/homepage";

interface HeroProps {
  title?: ReactNode;
  subtitle?: string;
  image?: string;
  compact?: boolean;
  children?: ReactNode;
}

export function Hero({
  title,
  subtitle,
  image = HERO_IMAGES.primary,
  compact = false,
  children,
}: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const minH = compact ? "min-h-[48vh]" : "min-h-[88vh] sm:min-h-[92vh]";

  return (
    <section
      ref={ref}
      className={`relative flex ${minH} items-center overflow-hidden bg-zb-navy-deep`}
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: imageY }}
      >
        <Image
          src={image}
          alt="Stone Town and Zanzibar coastline at golden hour"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      <div
        className={`absolute inset-0 bg-gradient-to-t ${
          compact
            ? "from-zb-navy-deep/90 via-zb-navy-deep/50 to-zb-navy/30"
            : "from-zb-navy-deep/75 via-transparent to-transparent"
        }`}
        aria-hidden
      />
      <div
        className={`absolute inset-0 bg-gradient-to-r ${
          compact
            ? "from-zb-navy-deep/90 via-zb-navy-deep/55 to-transparent"
            : "from-white/92 via-white/55 to-transparent sm:via-white/35 lg:via-white/20"
        }`}
        aria-hidden
      />

      <div className="container-portal relative z-10 py-24 sm:py-28 lg:py-32">
        {children ?? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <h1 className="text-hero-headline">
              {title ?? (
                <>
                  <span className="block text-zb-navy">{HERO_COPY.line1}</span>
                  <span className="mt-1 block text-zb-gold sm:mt-2">
                    {HERO_COPY.line2}
                  </span>
                </>
              )}
            </h1>
            {(subtitle || !compact) && (
              <p className="mt-7 max-w-2xl text-base font-medium leading-relaxed text-zb-ink/90 sm:mt-8 sm:text-lg">
                {subtitle ?? HERO_COPY.subheading}
              </p>
            )}
            {!compact && !children && (
              <div className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-5">
                <Button href="/solutions" variant="navy" size="lg">
                  Explore Our Solutions
                  <span aria-hidden>→</span>
                </Button>
                <Button href="/about" variant="outline-light" size="lg">
                  About Zanzibaba Group
                  <span aria-hidden>→</span>
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
