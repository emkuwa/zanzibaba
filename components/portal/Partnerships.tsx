import { PARTNERSHIPS } from "@/data/homepage";
import { Section } from "./Section";
import { MotionReveal } from "./MotionReveal";
import { Button } from "./Button";

export function Partnerships() {
  return (
    <Section
      warm
      eyebrow="Partnerships"
      title="Trusted by institutions and innovators"
      subtitle="We collaborate with developers, investors, hospitality operators, and design studios — delivering integrated programmes with single accountability."
    >
      <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-20">
        <MotionReveal>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3">
            {PARTNERSHIPS.map((partner) => (
              <li
                key={partner}
                className="flex items-center gap-2 rounded-sm border border-zb-border/80 bg-white px-3 py-2.5 shadow-zb-sm transition-all duration-300 hover:border-zb-gold/35 sm:gap-3 sm:px-5 sm:py-4"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-zb-gold"
                  aria-hidden
                />
                <span className="text-xs font-light text-zb-ink sm:text-sm lg:text-base">
                  {partner}
                </span>
              </li>
            ))}
          </ul>
        </MotionReveal>
        <MotionReveal delay={0.1} direction="right">
          <div className="rounded-sm border border-zb-border bg-zb-navy p-5 text-white shadow-zb-lg sm:p-7 lg:p-10">
            <h3 className="font-serif text-xl font-semibold sm:text-2xl">
              Programme partnerships
            </h3>
            <p className="mt-3 text-sm font-light leading-relaxed text-white/75 sm:mt-4 sm:text-base">
              Whether you are buying a villa, structuring an Airbnb portfolio, or
              acquiring development land — we provide end-to-end advisory with
              local title coordination and investor-grade communication.
            </p>
            <div className="mt-5 sm:mt-6 lg:mt-8">
              <Button href="/contact" variant="gold" size="md">
                Discuss a Partnership
              </Button>
            </div>
          </div>
        </MotionReveal>
      </div>
    </Section>
  );
}
