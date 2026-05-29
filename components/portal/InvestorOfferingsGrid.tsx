"use client";

import Image from "next/image";
import Link from "next/link";
import { INVESTOR_OFFERINGS } from "@/data/investor-offerings";
import { OFFERINGS_SECTION } from "@/data/homepage";
import { MotionReveal } from "./MotionReveal";
import { Card } from "./Card";

export function InvestorOfferingsGrid() {
  const row1 = INVESTOR_OFFERINGS.slice(0, 3);
  const row2 = INVESTOR_OFFERINGS.slice(3, 6);

  return (
    <section id="offerings" className="bg-white">
      <div className="container-portal py-6 sm:py-8 lg:section-py">
        <MotionReveal>
          <div className="max-w-2xl lg:mx-auto lg:max-w-3xl lg:text-center">
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.28em] text-zb-gold sm:text-eyebrow">
              {OFFERINGS_SECTION.eyebrow}
            </p>
            <h2 className="mt-2 font-serif text-[1.375rem] font-semibold leading-[1.15] text-zb-navy sm:mt-2.5 sm:text-[1.625rem] lg:mt-4 lg:text-section-title">
              <span className="lg:hidden">{OFFERINGS_SECTION.titleMobile}</span>
              <span className="hidden lg:inline">{OFFERINGS_SECTION.titleDesktop}</span>
            </h2>
            <p className="mt-2 line-clamp-2 text-xs leading-snug text-zb-muted sm:mt-3 sm:text-sm sm:leading-relaxed lg:mx-auto lg:mt-5 lg:line-clamp-none lg:max-w-2xl lg:text-base">
              <span className="lg:hidden">{OFFERINGS_SECTION.descriptionMobile}</span>
              <span className="hidden lg:inline">{OFFERINGS_SECTION.description}</span>
            </p>
          </div>
        </MotionReveal>

        <div className="mt-4 grid grid-cols-2 gap-1.5 sm:mt-5 sm:gap-2 lg:hidden">
          {INVESTOR_OFFERINGS.map((item) => (
            <Link key={item.slug} href={item.href} className="group block">
              <Card className="flex h-full flex-col p-3 transition-all group-hover:border-zb-gold/30">
                <Image
                  src={item.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="h-10 w-10 object-contain"
                />
                <h3 className="mt-2 font-serif text-sm font-semibold text-zb-navy">{item.title}</h3>
                <p className="mt-1 line-clamp-2 text-[0.65rem] leading-snug text-zb-muted">
                  {item.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 hidden space-y-5 lg:block lg:mt-14">
          <div className="grid gap-5 lg:grid-cols-3">
            {row1.map((item) => (
              <OfferingCard key={item.slug} item={item} />
            ))}
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {row2.map((item) => (
              <OfferingCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OfferingCard({ item }: { item: (typeof INVESTOR_OFFERINGS)[number] }) {
  return (
    <Link href={item.href} className="group block h-full">
      <Card className="flex h-full flex-col p-8 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-zb-gold/25 group-hover:shadow-zb-gold-glow">
        <Image src={item.icon} alt="" width={56} height={56} className="h-14 w-14 object-contain" />
        <h3 className="mt-5 font-serif text-xl font-semibold text-zb-navy">{item.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-zb-muted">{item.description}</p>
        <span className="mt-6 text-sm font-medium text-zb-gold">Learn more →</span>
      </Card>
    </Link>
  );
}
