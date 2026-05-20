"use client";

import Image from "next/image";
import { MotionReveal } from "./MotionReveal";
import { Button } from "./Button";
import { ABOUT_COPY, ABOUT_IMAGES } from "@/data/homepage";

export function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-zb-navy text-white">
      <div
        className="pointer-events-none absolute -right-8 top-1/2 hidden -translate-y-1/2 opacity-[0.06] lg:block xl:right-4"
        aria-hidden
      >
        <Image
          src="/brand/logos/icon-favicon.svg"
          alt=""
          width={420}
          height={420}
          className="h-[22rem] w-[22rem] object-contain xl:h-[26rem] xl:w-[26rem]"
        />
      </div>

      <div className="container-portal section-py">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <MotionReveal direction="left">
            <div className="relative mx-auto max-w-xl lg:mx-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-zb-xl ring-1 ring-white/10 sm:aspect-[5/4]">
                <Image
                  src={ABOUT_IMAGES.primary}
                  alt="Zanzibar harbor and coastline"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1} direction="right">
            <p className="text-eyebrow">{ABOUT_COPY.eyebrow}</p>
            <h2 className="mt-5 font-sans text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-[2.5rem]">
              {ABOUT_COPY.heading}
            </h2>
            <p className="mt-7 text-base font-normal leading-relaxed text-white/80 sm:text-lg">
              {ABOUT_COPY.body}
            </p>
            <div className="mt-10">
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
