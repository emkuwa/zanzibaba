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
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const minH = compact ? "min-h-[48vh]" : "min-h-[88vh] sm:min-h-[92vh]";

  return (
    <section
      ref={ref}
      className={`relative flex ${minH} items-end overflow-hidden bg-zb-navy-deep sm:items-center`}
    >
      <motion.div
        className="absolute inset-0 scale-[1.02]"
        style={reduce ? undefined : { y: imageY }}
      >
        <Image
          src={image}
          alt="Zanzibar coastline and luxury development"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      <div
        className={`absolute inset-0 bg-gradient-to-t ${
          compact
            ? "from-zb-navy-deep/95 via-zb-navy-deep/60 to-zb-navy/40"
            : "from-zb-navy-deep/80 via-zb-navy-deep/25 to-transparent"
        }`}
        aria-hidden
      />
      <div
        className={`absolute inset-0 bg-gradient-to-r ${
          compact
            ? "from-zb-navy-deep/92 via-zb-navy-deep/70 to-zb-navy/30"
            : "from-white/95 via-white/70 to-white/10 sm:via-white/55 lg:via-white/25"
        }`}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-40 mix-blend-soft-light"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 85%, rgba(200,155,60,0.18), transparent 45%)",
        }}
        aria-hidden
      />

      {!compact && "accent" in HERO_IMAGES && (
        <div className="absolute bottom-0 right-0 top-0 hidden w-[42%] lg:block">
          <div className="relative h-full w-full">
            <Image
              src={HERO_IMAGES.accent}
              alt=""
              fill
              className="object-cover object-center"
              sizes="45vw"
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/30 to-white/90" />
            <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/50 to-transparent" />
          </div>
        </div>
      )}

      <div className="container-portal relative z-10 pb-16 pt-28 sm:pb-20 sm:py-28 lg:py-32">
        {children ?? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl lg:max-w-4xl"
          >
            <p className="text-eyebrow mb-5 text-zb-gold sm:mb-6">
              Zanzibar · Tanzania · Africa
            </p>
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
              <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-zb-ink/85 sm:mt-8 sm:text-lg">
                {subtitle ?? HERO_COPY.subheading}
              </p>
            )}
            {!compact && !children && (
              <div className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-5">
                <Button href="/solutions" variant="navy" size="lg">
                  Explore Our Solutions
                  <span aria-hidden>→</span>
                </Button>
                <Button href="/contact" variant="gold" size="lg">
                  Get in Touch
                  <span aria-hidden>→</span>
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {!compact && (
        <div
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
          aria-hidden
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-10 w-6 items-start justify-center rounded-full border border-zb-navy/20 p-1.5"
          >
            <span className="h-2 w-0.5 rounded-full bg-zb-gold" />
          </motion.div>
        </div>
      )}
    </section>
  );
}
