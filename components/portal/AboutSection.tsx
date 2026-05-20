"use client";

import Image from "next/image";
import { MotionReveal } from "./MotionReveal";
import { Button } from "./Button";
import { ABOUT_COPY, ABOUT_IMAGES } from "@/data/homepage";

export function AboutSection() {
  return (
    <section id="about" className="overflow-hidden bg-zb-navy">
      <div className="container-portal py-12 sm:py-14 lg:py-20">
        <MotionReveal>
          <div className="flex flex-row items-start gap-6 sm:items-center sm:gap-10 lg:gap-16">
            <div className="min-w-0 flex-1">
              <p className="text-eyebrow">{ABOUT_COPY.eyebrow}</p>
              <h2 className="mt-3 font-serif text-xl font-semibold leading-[1.15] text-white sm:mt-4 sm:text-3xl lg:text-4xl">
                {ABOUT_COPY.heading}
              </h2>
              <p className="mt-4 text-sm font-normal leading-relaxed text-white/80 sm:mt-5 sm:text-base lg:max-w-xl lg:text-lg">
                {ABOUT_COPY.body}
              </p>
              <div className="mt-6 sm:mt-8">
                <Button href="/about" variant="gold" size="lg">
                  Learn More About Us
                </Button>
              </div>
            </div>

            <div className="relative aspect-[3/4] w-[7.5rem] shrink-0 overflow-hidden rounded-sm shadow-lg sm:w-[10rem] lg:aspect-[2/3] lg:w-[14rem] xl:w-[16rem]">
              <Image
                src={ABOUT_IMAGES.primary}
                alt="Stone archway in Zanzibar"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 160px, 256px"
              />
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
