"use client";

import Image from "next/image";
import { MotionReveal } from "./MotionReveal";
import { Button } from "./Button";
import { ABOUT_COPY, ABOUT_IMAGES } from "@/data/homepage";

function CompassWatermark() {
  return (
    <svg
      className="pointer-events-none absolute -right-8 top-1/2 h-64 w-64 -translate-y-1/2 opacity-[0.06] text-white lg:h-80 lg:w-80"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth={1.5} />
      <path stroke="currentColor" strokeWidth={1.5} d="M32 4v56M4 32h56M32 8l8 24-8 8-8-8 8-24z" />
      <path stroke="currentColor" strokeWidth={1} d="M8 8l48 48M56 8L8 56" opacity="0.5" />
    </svg>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="overflow-hidden bg-zb-navy">
      {/* Mobile layout */}
      <div className="container-portal py-12 sm:py-14 lg:hidden">
        <MotionReveal>
          <div className="flex flex-row items-start gap-5">
            <div className="min-w-0 flex-1">
              <p className="text-eyebrow">{ABOUT_COPY.eyebrow}</p>
              <h2 className="mt-3 font-serif text-xl font-semibold leading-[1.15] text-white sm:text-2xl">
                {ABOUT_COPY.headingMobile}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                {ABOUT_COPY.bodyMobile}
              </p>
              <div className="mt-6">
                <Button href="/about" variant="gold" size="lg">
                  Learn More About Us
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/5] w-[7rem] shrink-0 overflow-hidden rounded-sm shadow-lg sm:w-[8.5rem]">
              <Image
                src={ABOUT_IMAGES.mobile}
                alt="Stone Town skyline, Zanzibar"
                fill
                className="object-cover"
                sizes="140px"
              />
            </div>
          </div>
        </MotionReveal>
      </div>

      {/* Desktop: photo left, copy right */}
      <div className="hidden lg:grid lg:min-h-[28rem] lg:grid-cols-2">
        <div className="relative min-h-[24rem]">
          <Image
            src={ABOUT_IMAGES.desktop}
            alt="Coastal promenade and architecture in Zanzibar"
            fill
            className="object-cover"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zb-navy/40" aria-hidden />
        </div>
        <div className="relative flex flex-col justify-center px-12 py-16 xl:px-16 xl:py-20">
          <CompassWatermark />
          <MotionReveal>
            <p className="text-eyebrow-lined w-fit">{ABOUT_COPY.eyebrow}</p>
            <h2 className="mt-6 max-w-lg font-serif text-3xl font-semibold leading-[1.12] text-white xl:text-4xl">
              {ABOUT_COPY.headingDesktop}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/80">
              {ABOUT_COPY.bodyDesktop}
            </p>
            <div className="mt-8">
              <Button href="/about" variant="gold" size="lg">
                Learn More About Us
                <span aria-hidden>→</span>
              </Button>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
