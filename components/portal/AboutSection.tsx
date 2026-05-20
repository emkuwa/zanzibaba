"use client";

import Image from "next/image";
import { MotionReveal } from "./MotionReveal";
import { Button } from "./Button";
import { ABOUT_COPY, ABOUT_IMAGES } from "@/data/homepage";

function CompassWatermark() {
  return (
    <svg
      className="pointer-events-none absolute -right-8 top-1/2 h-64 w-64 -translate-y-1/2 opacity-[0.07] text-white lg:h-80 lg:w-80"
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
    <section id="about" className="relative overflow-hidden bg-zb-navy">
      <div className="absolute inset-0 pattern-architectural opacity-40" aria-hidden />
      <div className="absolute inset-0 texture-noise opacity-30 mix-blend-overlay" aria-hidden />

      <div className="container-portal relative z-10 py-16 sm:py-20 lg:hidden">
        <MotionReveal>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
            <div className="relative aspect-[5/6] w-full max-w-[12rem] shrink-0 overflow-hidden rounded-sm shadow-zb-xl sm:max-w-[14rem]">
              <Image
                src={ABOUT_IMAGES.mobile}
                alt="Stone Town skyline, Zanzibar"
                fill
                className="object-cover"
                sizes="200px"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-eyebrow">{ABOUT_COPY.eyebrow}</p>
              <h2 className="mt-4 font-serif text-2xl font-semibold leading-[1.12] text-white sm:text-3xl">
                {ABOUT_COPY.headingMobile}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/80 sm:text-base">
                {ABOUT_COPY.bodyMobile}
              </p>
              <div className="mt-8">
                <Button href="/about" variant="gold" size="lg" className="shadow-zb-gold">
                  Learn More About Us
                </Button>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>

      <div className="relative z-10 hidden lg:grid lg:min-h-[32rem] lg:grid-cols-2">
        <div className="relative min-h-[28rem]">
          <Image
            src={ABOUT_IMAGES.desktop}
            alt="Coastal promenade and architecture in Zanzibar"
            fill
            className="object-cover"
            sizes="50vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-zb-navy/30 to-zb-navy"
            aria-hidden
          />
          <div className="absolute bottom-8 left-8 hidden aspect-[4/3] w-48 overflow-hidden rounded-sm border border-white/15 shadow-zb-xl xl:block">
            <Image
              src={ABOUT_IMAGES.mobile}
              alt="Stone Town detail"
              fill
              className="object-cover"
              sizes="200px"
            />
          </div>
        </div>
        <div className="relative flex flex-col justify-center px-12 py-20 xl:px-20 xl:py-24">
          <div className="absolute inset-0 pattern-fine-lines opacity-50" aria-hidden />
          <CompassWatermark />
          <MotionReveal className="relative">
            <p className="text-eyebrow-lined w-fit">{ABOUT_COPY.eyebrow}</p>
            <h2 className="mt-6 max-w-lg font-serif text-3xl font-semibold leading-[1.1] text-white xl:text-[2.75rem]">
              {ABOUT_COPY.headingDesktop}
            </h2>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-white/80">
              {ABOUT_COPY.bodyDesktop}
            </p>
            <div className="mt-10">
              <Button href="/about" variant="gold" size="lg" className="shadow-zb-gold">
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
