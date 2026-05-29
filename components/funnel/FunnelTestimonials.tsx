import { FUNNEL_TESTIMONIALS } from "@/data/funnel";
import { FunnelSection } from "./FunnelSection";

export function FunnelTestimonials() {
  return (
    <FunnelSection
      eyebrow={FUNNEL_TESTIMONIALS.eyebrow}
      title={FUNNEL_TESTIMONIALS.title}
      className="bg-zb-surface-warm"
    >
      <ul className="grid gap-6 lg:grid-cols-3">
        {FUNNEL_TESTIMONIALS.items.map((item) => (
          <li
            key={item.location}
            className="funnel-card flex flex-col rounded-sm border border-zb-border bg-white p-8"
          >
            <span className="font-serif text-4xl leading-none text-zb-gold/40" aria-hidden>
              “
            </span>
            <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-zb-muted">
              {item.quote}
            </blockquote>
            <footer className="mt-6 border-t border-zb-border pt-4">
              <p className="text-sm font-semibold text-zb-navy">{item.name}</p>
              <p className="text-xs text-zb-muted">{item.location}</p>
            </footer>
          </li>
        ))}
      </ul>
      <ul className="mt-10 flex flex-wrap justify-center gap-6 text-xs font-medium uppercase tracking-wider text-zb-muted">
        {["Verified introductions", "International advisory", "Island-wide access", "Confidential enquiries"].map(
          (label) => (
            <li key={label} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-zb-gold" aria-hidden />
              {label}
            </li>
          )
        )}
      </ul>
    </FunnelSection>
  );
}
