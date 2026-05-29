import Image from "next/image";
import Link from "next/link";
import { FUNNEL_OFF_PLAN } from "@/data/funnel";
import { FUNNEL_IMAGES } from "@/data/funnel-images";

export function FunnelOffPlan() {
  return (
    <section id="off-plan" className="bg-white py-14 sm:py-20">
      <div className="container-portal grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-eyebrow">Off-plan</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-zb-navy sm:text-3xl">
            {FUNNEL_OFF_PLAN.title}
          </h2>
          <p className="mt-4 text-zb-muted leading-relaxed">{FUNNEL_OFF_PLAN.body}</p>
          <ul className="mt-6 space-y-2">
            {FUNNEL_OFF_PLAN.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-zb-ink">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zb-gold" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
          <Link
            href="#qualify"
            className="mt-8 inline-flex rounded-sm bg-zb-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-zb-navy-deep"
          >
            Discuss off-plan programmes
          </Link>
        </div>
        <div className="relative min-h-[280px] overflow-hidden rounded-sm">
          <Image
            src={FUNNEL_IMAGES.development}
            alt="Luxury coastal development — off-plan investment in Zanzibar"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/90 via-zb-navy-deep/30 to-transparent" />
          <p className="absolute bottom-6 left-6 right-6 font-serif text-xl text-white">
            Future luxury — investor-grade programmes
          </p>
        </div>
      </div>
    </section>
  );
}
