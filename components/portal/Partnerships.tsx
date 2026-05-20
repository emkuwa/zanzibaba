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
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <MotionReveal>
          <ul className="grid gap-3 sm:grid-cols-2">
            {PARTNERSHIPS.map((partner) => (
              <li
                key={partner}
                className="flex items-center gap-3 rounded-sm border border-zb-border/80 bg-white px-5 py-4 shadow-zb-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zb-gold/35 hover:shadow-zb-card-hover"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-zb-gold"
                  aria-hidden
                />
                <span className="text-sm font-light text-zb-ink sm:text-base">
                  {partner}
                </span>
              </li>
            ))}
          </ul>
        </MotionReveal>
        <MotionReveal delay={0.1} direction="right">
          <div className="rounded-sm border border-zb-border bg-zb-navy p-8 text-white shadow-zb-lg transition-shadow hover:shadow-zb-xl sm:p-10">
            <h3 className="font-serif text-2xl font-semibold">
              Programme partnerships
            </h3>
            <p className="mt-5 text-base font-light leading-relaxed text-white/75">
              Whether you are launching a resort, securing materials for a
              master plan, or need digital and security integration — our group
              structure reduces vendor fragmentation and elevates delivery
              standards.
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="gold">
                Discuss a Partnership
              </Button>
            </div>
          </div>
        </MotionReveal>
      </div>
    </Section>
  );
}
