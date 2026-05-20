"use client";

import Image from "next/image";
import { MotionReveal } from "./MotionReveal";
import { Button } from "./Button";
import { ABOUT_COPY, ABOUT_IMAGES } from "@/data/homepage";

export function AboutSection() {
  return (
    <section id="about" className="overflow-hidden bg-zb-navy">
      <div className="container-portal py-14 sm:py-16 lg:py-20">
        <MotionReveal>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10 lg:gap-14">
            <div className="min-w-0 flex-1">
              <p className="text-eyebrow">{ABOUT_COPY.eyebrow}</p>
              <h2 className="mt-4 font-serif text-2xl font-semibold leading-[1.15] text-white sm:text-3xl lg:text-4xl">
                {ABOUT_COPY.heading}
              </h2>
              <p className="mt-5 text-sm font-normal leading-relaxed text-white/75 sm:mt-6 sm:text-base lg:max-w-xl">
                {ABOUT_COPY.body}
              </p>
              <div className="mt-8">
                <Button href="/about" variant="gold" size="lg">
                  Learn More About Us
                  <span aria-hidden>→</span>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto aspect-[4/3] w-full max-w-[11rem] shrink-0 overflow-hidden rounded-sm shadow-lg sm:mx-0 sm:max-w-[9rem] lg:max-w-[11rem]">
              <Image
                src={ABOUT_IMAGES.primary}
                alt="Aerial view of Stone Town, Zanzibar"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 40vw, 176px"
              />
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
