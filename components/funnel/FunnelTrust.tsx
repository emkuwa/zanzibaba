import Image from "next/image";
import { FUNNEL_TRUST, FUNNEL_FOUNDER } from "@/data/funnel";
import { SITE } from "@/data/site";

export function FunnelTrust() {
  return (
    <section className="bg-zb-surface-warm" aria-label="Trust and advisor">
      {/* Trust pillars */}
      <div className="section-py-sm lg:section-py">
        <div className="container-portal">
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-eyebrow">{FUNNEL_TRUST.eyebrow}</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-zb-navy sm:text-4xl lg:text-[2.75rem]">
              {FUNNEL_TRUST.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zb-muted sm:text-base">
              {FUNNEL_TRUST.subtitle}
            </p>
          </header>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {FUNNEL_TRUST.pillars.map((pillar) => (
              <li
                key={pillar.label}
                className="rounded-sm border border-zb-border bg-white p-6 transition hover:shadow-zb-card-hover"
              >
                <p className="font-serif text-2xl font-semibold text-zb-gold">{pillar.value}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-zb-navy">
                  {pillar.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zb-muted">{pillar.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Founder / Advisor section */}
      <div className="border-t border-zb-border py-14 sm:py-20">
        <div className="container-portal">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <div>
                <p className="text-eyebrow">{FUNNEL_FOUNDER.eyebrow}</p>
                <h2 className="mt-3 font-serif text-2xl font-semibold text-zb-navy sm:text-3xl">
                  {FUNNEL_FOUNDER.name}
                </h2>
                <p className="mt-1 text-sm text-zb-muted">{FUNNEL_FOUNDER.title}</p>
              </div>
              <p className="text-sm leading-relaxed text-zb-muted">
                {FUNNEL_FOUNDER.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-sm bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#20b858]"
                >
                  {FUNNEL_FOUNDER.whatsappCta}
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-sm border border-zb-navy px-6 py-3 text-sm font-semibold text-zb-navy transition hover:bg-zb-navy hover:text-white"
                >
                  {FUNNEL_FOUNDER.consultationCta}
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-80 w-full max-w-md overflow-hidden rounded-sm lg:h-96">
                <Image
                  src={FUNNEL_FOUNDER.image}
                  alt={`${FUNNEL_FOUNDER.name} — ${FUNNEL_FOUNDER.title} of Zanzibaba Real Estate`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
