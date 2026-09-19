import Image from "next/image";
import Link from "next/link";
import { FUNNEL_OFF_PLAN_SECTION, OFF_PLAN_PROJECTS } from "@/data/funnel";
import { FunnelSection } from "./FunnelSection";

export function FunnelOffPlanProjects() {
  return (
    <FunnelSection
      id="off-plan"
      eyebrow={FUNNEL_OFF_PLAN_SECTION.eyebrow}
      title={FUNNEL_OFF_PLAN_SECTION.title}
      subtitle={FUNNEL_OFF_PLAN_SECTION.subtitle}
      className="bg-zb-surface-warm"
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8">
        {OFF_PLAN_PROJECTS.map((project) => (
          <li key={project.id}>
            <article className="group funnel-card overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.name} off-plan property — ${project.location}, Zanzibar`}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/90 via-zb-navy-deep/20 to-transparent" />
                <span className="absolute left-4 top-4 rounded-sm bg-zb-gold px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-zb-navy-deep">
                  {project.roiLabel}
                </span>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-zb-gold">
                    {project.location}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl font-semibold text-white">{project.name}</h3>
                </div>
              </div>
              <div className="border-t border-zb-border bg-white p-6">
                <p className="text-sm font-medium text-zb-navy">{project.highlight}</p>
                <dl className="mt-4 grid gap-2 text-xs text-zb-muted sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold uppercase tracking-wider text-zb-navy/70">
                      Completion
                    </dt>
                    <dd className="mt-0.5">{project.completion}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold uppercase tracking-wider text-zb-navy/70">
                      Payment plan
                    </dt>
                    <dd className="mt-0.5">{project.paymentPlan}</dd>
                  </div>
                </dl>
                <Link
                  href={project.href}
                  className="mt-6 inline-flex text-sm font-bold uppercase tracking-wider text-zb-navy transition hover:text-zb-gold"
                >
                  Enquire about this project →
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </FunnelSection>
  );
}
