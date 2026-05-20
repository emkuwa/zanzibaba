import Image from "next/image";
import { Hero } from "@/components/portal/Hero";
import { StatsBar } from "@/components/portal/StatsBar";
import { Section } from "@/components/portal/Section";
import { SolutionCard } from "@/components/portal/SolutionCard";
import { Button } from "@/components/portal/Button";
import { MotionReveal } from "@/components/portal/MotionReveal";
import { SOLUTIONS } from "@/data/solutions";
import { SUBDOMAINS } from "@/data/site";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1573844250598-d871b821bb88?w=1200&q=80&auto=format&fit=crop";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Section
        eyebrow="Our Solutions"
        title="Seven divisions. One ecosystem."
        subtitle="Integrated capabilities across real estate, materials, construction, and digital — delivered with investor-grade discipline."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SOLUTIONS.map((s) => (
            <SolutionCard key={s.slug} solution={s} />
          ))}
        </div>
      </Section>

      <section className="bg-zb-navy text-white">
        <div className="container-portal grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:py-24">
          <MotionReveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={ABOUT_IMAGE}
                alt="Stone Town, Zanzibar"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-zb-gold">
              About Us
            </p>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
              Rooted in Zanzibar. Built for tomorrow.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              Zanzibaba Company Limited unites real estate, building materials,
              construction, digital marketing, tours, security, and landscaping
              under one premium group brand — serving developers, investors, and
              institutions across Unguja and Tanzania.
            </p>
            <div className="mt-8">
              <Button href="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </MotionReveal>
        </div>
      </section>

      <Section
        eyebrow="Digital Estate"
        title="Live platforms"
        subtitle="Access our operational subdomains — materials procurement, investor relations, and internal systems."
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Building Materials", href: SUBDOMAINS.materials },
            { label: "Investments", href: SUBDOMAINS.invest },
            { label: "ZanziCore", href: SUBDOMAINS.zanzicore },
            { label: "Admin", href: SUBDOMAINS.admin },
          ].map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col justify-between rounded-sm border border-zb-border bg-zb-surface px-6 py-8 transition-colors hover:border-zb-gold hover:bg-white"
              >
                <span className="font-serif text-lg font-semibold text-zb-navy">
                  {item.label}
                </span>
                <span className="mt-4 text-sm text-zb-muted">Visit →</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section dark animate={false}>
        <div className="text-center">
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
            Partner with Zanzibaba Group
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/75">
            Speak with our team in Paje or Stone Town — we respond to programme
            enquiries across all divisions.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Get in Touch
            </Button>
            <Button href="/solutions" variant="outline" size="lg">
              Explore Solutions
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
