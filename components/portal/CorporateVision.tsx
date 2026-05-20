import { VISION_PILLARS } from "@/data/homepage";
import { MotionReveal } from "./MotionReveal";
import { EditorialDivider } from "./EditorialDivider";

export function CorporateVision() {
  return (
    <section className="bg-zb-navy-deep text-white">
      <div className="container-portal section-py-sm">
        <MotionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-eyebrow">Corporate Vision</p>
            <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
              Africa&apos;s next-generation
              <span className="text-zb-gold"> investment group</span>
            </h2>
            <EditorialDivider className="mx-auto mt-10 max-w-xs" />
          </div>
        </MotionReveal>

        <ul className="mt-16 grid gap-10 md:grid-cols-3 md:gap-12">
          {VISION_PILLARS.map((pillar, i) => (
            <MotionReveal key={pillar.title} delay={i * 0.1}>
              <li className="text-center md:text-left">
                <span className="font-serif text-5xl font-semibold text-zb-gold/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-serif text-xl font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-white/70 sm:text-base">
                  {pillar.text}
                </p>
              </li>
            </MotionReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
