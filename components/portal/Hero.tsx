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
        className={`absolute inset-0 bg-zb-navy-deep/40`}
        aria-hidden
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t ${
          compact
            ? "from-zb-navy-deep/95 via-zb-navy-deep/65 to-zb-navy-deep/25"
            : "from-zb-navy-deep/90 via-zb-navy-deep/45 to-zb-navy-deep/15"
        }`}
        aria-hidden
      />
      <div
        className={`absolute inset-0 bg-gradient-to-r ${
          compact
            ? "from-zb-navy-deep/92 via-zb-navy-deep/60 to-transparent"
            : "from-zb-navy-deep/88 via-zb-navy-deep/50 to-transparent"
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
            <h1 className="text-hero-headline [text-shadow:0_2px_28px_rgba(7,36,90,0.55)]">
              {title ?? (
                <>
                  <span className="block text-white">{HERO_COPY.line1}</span>
                  <span className="mt-1 block text-zb-gold sm:mt-2">
                    {HERO_COPY.line2}
                  </span>
                </>
              )}
            </h1>
            {(subtitle || !compact) && (
              <p className="mt-7 max-w-2xl text-base font-normal leading-relaxed text-white/95 sm:mt-8 sm:text-lg [text-shadow:0_1px_18px_rgba(7,36,90,0.45)]">
                {subtitle ?? HERO_COPY.subheadingDesktop}
              </p>
            )}
            {!compact && !children && (
              <div className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-5">
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
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
