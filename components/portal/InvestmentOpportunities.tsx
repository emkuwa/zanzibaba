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
      <div className="grid gap-8 lg:grid-cols-3">
        {INVESTMENT_HIGHLIGHTS.map((item, i) => (
          <MotionReveal key={item.title} delay={i * 0.08}>
            <article className="flex h-full flex-col rounded-sm border border-zb-border bg-white p-8 shadow-zb-card transition-shadow hover:shadow-zb-card-hover sm:p-10">
              <h3 className="font-serif text-xl font-semibold text-zb-navy sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-5 flex-1 text-body-luxury text-sm sm:text-base">
                {item.description}
              </p>
              <div className="mt-8">
                <Button
                  href={item.href}
                  variant={i === 1 ? "gold" : "navy"}
                  external={"external" in item && item.external}
                >
                  {item.cta}
                </Button>
              </div>
            </article>
          </MotionReveal>
        ))}
      </div>
      <p className="mt-10 text-center text-xs font-light text-zb-muted">
        Indicative figures for planning purposes only. Not audited financials.
      </p>
    </Section>
  );
}
