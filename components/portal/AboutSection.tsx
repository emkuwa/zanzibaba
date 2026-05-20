"use client";

import Image from "next/image";
import { MotionReveal } from "./MotionReveal";
import { Button } from "./Button";
import { ABOUT_COPY, ABOUT_IMAGES } from "@/data/homepage";

function CompassWatermark() {
  return (
    <svg
      className="pointer-events-none absolute -right-4 top-1/2 h-[22rem] w-[22rem] -translate-y-1/2 opacity-[0.08] text-white xl:-right-8 xl:h-[26rem] xl:w-[26rem]"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth={1.25} />
      <path stroke="currentColor" strokeWidth={1.25} d="M32 4v56M4 32h56M32 8l8 24-8 8-8-8 8-24z" />
      <path stroke="currentColor" strokeWidth={0.75} d="M8 8l48 48M56 8L8 56" opacity="0.45" />
      <ellipse cx="32" cy="32" rx="18" ry="10" stroke="currentColor" strokeWidth={0.75} opacity="0.35" />
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

      <div className="container-portal relative z-10 hidden py-20 xl:py-24 lg:block">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <MotionReveal>
            <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              <div className="rounded-sm border border-zb-gold/35 bg-zb-navy-deep/40 p-3 shadow-zb-xl sm:p-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm ring-1 ring-inset ring-white/15">
                  <Image
                    src={ABOUT_IMAGES.desktop}
                    alt="Aerial coastal town, Zanzibar"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 420px"
                  />
                </div>
              </div>
            </div>
          </MotionReveal>

          <div className="relative flex flex-col justify-center py-4">
            <div className="absolute inset-0 pattern-fine-lines opacity-50" aria-hidden />
            <CompassWatermark />
            <MotionReveal className="relative max-w-lg">
              <p className="text-eyebrow-lined w-fit">{ABOUT_COPY.eyebrow}</p>
              <h2 className="mt-6 font-serif text-3xl font-semibold leading-[1.1] text-white xl:text-[2.75rem]">
                {ABOUT_COPY.headingDesktop}
              </h2>
              <p className="mt-6 text-base font-light leading-relaxed text-white/80">
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
      </div>
    </section>
  );
}
