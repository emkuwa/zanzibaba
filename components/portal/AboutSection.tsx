"use client";

import Image from "next/image";
import { MotionReveal } from "./MotionReveal";
import { Button } from "./Button";
import { ABOUT_COPY, ABOUT_IMAGES } from "@/data/homepage";

export function AboutSection() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="grid lg:grid-cols-2">
        <MotionReveal direction="left" className="relative min-h-[22rem] sm:min-h-[26rem] lg:min-h-[36rem]">
          <Image
            src={ABOUT_IMAGES.primary}
            alt="Modern architectural structure"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </MotionReveal>

        <MotionReveal
          delay={0.1}
          direction="right"
          className="flex flex-col justify-center bg-zb-navy px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-14 lg:py-24 xl:px-20"
        >
          <h2 className="font-sans text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-[2.5rem]">
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
    </section>
  );
}
