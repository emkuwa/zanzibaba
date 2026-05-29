import { FUNNEL_WHY } from "@/data/funnel";
import { FunnelSection } from "./FunnelSection";

export function FunnelWhyInvest() {
  return (
    <FunnelSection
      id="why-invest"
      eyebrow={FUNNEL_WHY.eyebrow}
      title={FUNNEL_WHY.title}
      subtitle={FUNNEL_WHY.subtitle}
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FUNNEL_WHY.items.map((item) => (
          <li
            key={item.title}
            className="funnel-card rounded-sm border border-zb-border bg-white p-7 transition hover:border-zb-gold/30 hover:shadow-zb-gold-glow"
          >
            <span className="inline-block h-px w-8 bg-zb-gold" aria-hidden />
            <h3 className="mt-4 font-serif text-xl font-semibold text-zb-navy">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zb-muted">{item.body}</p>
          </li>
        ))}
      </ul>
    </FunnelSection>
  );
}
