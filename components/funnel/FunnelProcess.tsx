import { FUNNEL_PROCESS } from "@/data/funnel";
import { FunnelSection } from "./FunnelSection";

export function FunnelProcess() {
  return (
    <FunnelSection
      eyebrow={FUNNEL_PROCESS.eyebrow}
      title={FUNNEL_PROCESS.title}
      dark
      className="!bg-zb-navy"
    >
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FUNNEL_PROCESS.steps.map((step) => (
          <li
            key={step.step}
            className="rounded-sm border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          >
            <p className="font-serif text-3xl font-semibold text-zb-gold">{step.step}</p>
            <h3 className="mt-3 font-serif text-lg font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{step.body}</p>
          </li>
        ))}
      </ol>
    </FunnelSection>
  );
}
