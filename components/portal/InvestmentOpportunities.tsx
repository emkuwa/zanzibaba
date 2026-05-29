import { INVESTMENT_HIGHLIGHTS } from "@/data/homepage";
import { Section } from "./Section";
import { Button } from "./Button";
import { MotionReveal } from "./MotionReveal";

export function InvestmentOpportunities() {
  return (
    <Section
      id="investments"
      eyebrow="Investment Opportunities"
      title="Investor-grade programmes"
      subtitle="Curated access for qualified partners. Indicative metrics are not audited financials — legal review applies to all ROI language."
      className="gradient-gold-shine"
    >
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {INVESTMENT_HIGHLIGHTS.map((item, i) => (
          <MotionReveal key={item.title} delay={i * 0.08}>
            <article className="flex h-full flex-col rounded-sm border border-zb-border bg-white p-5 shadow-zb-card transition-all duration-300 hover:-translate-y-1 hover:border-zb-gold/25 hover:shadow-zb-gold-glow sm:p-7 lg:p-10">
              <h3 className="font-serif text-lg font-semibold text-zb-navy sm:text-xl lg:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zb-muted sm:mt-4 sm:text-base">
                {item.description}
              </p>
              <div className="mt-5 sm:mt-6 lg:mt-8">
                <Button
                  href={item.href}
                  variant={i === 1 ? "gold" : "navy"}
                  size="md"
                  className="w-full sm:w-auto"
                  external={"external" in item && item.external}
                >
                  {item.cta}
                </Button>
              </div>
            </article>
          </MotionReveal>
        ))}
      </div>
      <p className="mt-6 text-center text-xs font-light text-zb-muted sm:mt-8 lg:mt-10">
        Indicative figures for planning purposes only. Not audited financials.
      </p>
    </Section>
  );
}
