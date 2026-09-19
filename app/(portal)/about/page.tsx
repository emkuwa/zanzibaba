import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FUNNEL_IMAGES } from "@/data/funnel-images";
import { SITE, SEO_KEYWORDS } from "@/data/site";
import { BreadcrumbJsonLd } from "@/components/seo/RealEstateJsonLd";

export const metadata: Metadata = {
  title: "About Zanzibaba Real Estate — Local Property Advisory in Zanzibar",
  description:
    "Zanzibaba Real Estate is a local property advisory based in Paje and Stone Town, Zanzibar. We help international buyers find, evaluate, and purchase property with local knowledge and professional support.",
  keywords: [...SEO_KEYWORDS, "Zanzibar property advisor", "who sells property in Zanzibar"],
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: "About Zanzibaba Real Estate",
    description: "Local property advisory in Zanzibar — offices in Paje and Stone Town.",
    url: `${SITE.url}/about`,
    siteName: SITE.name,
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE.url },
          { name: "About", url: `${SITE.url}/about` },
        ]}
      />
      <section className="bg-zb-navy-deep pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="container-portal">
          <p className="text-eyebrow text-zb-gold">About us</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
            About Zanzibaba Real Estate
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            Local property advisory for Zanzibar — helping buyers find, evaluate, and purchase property with local knowledge.
          </p>
        </div>
      </section>

      <section className="container-portal py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-xl font-semibold text-zb-navy">What does Zanzibaba Real Estate do?</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-zb-muted">
                <p>
                  Zanzibaba Real Estate is a local property advisory in Zanzibar. We help international
                  buyers find, evaluate, and purchase property — from beachfront villas to development
                  land and off-plan homes.
                </p>
                <p>
                  We operate from our offices in Paje and Stone Town — two locations that give us
                  direct access to the east coast market and the island's commercial centre. This
                  means we can arrange viewings, coordinate site visits, and provide first-hand
                  observations about properties and areas.
                </p>
                <p>
                  We are not a listing aggregator. Every property we present is either verified by
                  our team or introduced through our network of established local agents and
                  developers. We prioritise accuracy over volume.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-zb-navy">What services does Zanzibaba offer?</h2>
              <ul className="mt-4 space-y-3">
                {[
                  "Property search and shortlisting based on your requirements",
                  "Viewing coordination and site visit scheduling",
                  "Market observation and area recommendations",
                  "Due diligence coordination with local professionals",
                  "Introduction to established agents and developers",
                  "Buyer education — ownership structures, process, costs",
                  "After-sale support and property management introductions",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-zb-muted">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zb-gold" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={FUNNEL_IMAGES.stoneTownHarbor}
                alt="Zanzibaba Real Estate — Stone Town, Zanzibar"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="rounded-sm border border-zb-border bg-zb-surface-warm p-6">
              <h2 className="font-serif text-lg font-semibold text-zb-navy">Where are Zanzibaba offices located?</h2>
              <div className="mt-4 space-y-4 text-sm text-zb-muted">
                <div>
                  <p className="font-medium text-zb-navy">Paje Office</p>
                  <p>Beach road, Paje, Zanzibar</p>
                </div>
                <div>
                  <p className="font-medium text-zb-navy">Stone Town Office</p>
                  <p>Mlandege, Stone Town, Zanzibar</p>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-zb-border p-6">
              <h2 className="font-serif text-lg font-semibold text-zb-navy">How does Zanzibaba work with buyers?</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-zb-muted">
                <p>
                  We believe in direct communication. When you contact us, you speak with someone
                  who has local knowledge — not a call centre or automated system.
                </p>
                <p>
                  We encourage every buyer to obtain independent legal, tax, and financial advice
                  before making property purchases. We are not a law firm or financial advisor —
                  we are a property advisory with local presence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zb-navy-deep py-14 sm:py-20">
        <div className="container-portal text-center">
          <p className="text-eyebrow text-zb-gold">What Zanzibaba actually provides</p>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-white sm:text-3xl">
            How is Zanzibaba different from a property listing site?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 sm:text-base">
            We provide local access, independent market observation, and professional support throughout your property search.
          </p>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {[
              {
                title: "Property Discovery",
                description:
                  "We match your requirements against our network of agents, developers, and off-market opportunities across Zanzibar.",
              },
              {
                title: "Independent Market Observation",
                description:
                  "We share what we know — without the marketing gloss. Honest area assessments, realistic pricing, transparent communication.",
              },
              {
                title: "Local Access",
                description:
                  "From Paje to Nungwi, Stone Town to the emerging south — we have the local access to arrange viewings and site visits across the island.",
              },
              {
                title: "Professional Support",
                description:
                  "We coordinate with established agents, legal professionals, developers, and surveyors — connecting you with the right people.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-sm border border-white/10 bg-white/5 p-6 text-left"
              >
                <h3 className="font-serif text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/tell-us"
              className="inline-flex items-center justify-center rounded-sm bg-zb-gold px-6 py-3 text-sm font-semibold text-white transition hover:bg-zb-gold-light"
            >
              Tell Us What You're Looking For
            </Link>
          </div>
        </div>
      </section>

      <section className="container-portal py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <div>
              <p className="text-eyebrow text-zb-gold">Founder</p>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-zb-navy">
                Hamisi Mwangomi
              </h2>
              <p className="mt-1 text-sm text-zb-muted">Founder &amp; Managing Director</p>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-zb-muted">
              <p>
                Hamisi founded {SITE.name} with the belief that property buyers in Zanzibar deserve
                direct, honest communication and local expertise — not marketing promises.
              </p>
              <p>
                With deep roots in Zanzibar and experience working with international buyers, Hamisi
                leads the advisory with a focus on transparency, local knowledge, and professional
                standards.
              </p>
              <p>
                He oversees property search, client relationships, and the network of local
                professionals that {SITE.name} works with across the island.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-80 w-full max-w-md overflow-hidden rounded-sm border border-zb-border">
              <Image
                src={FUNNEL_IMAGES.stoneTownGolden}
                alt="Hamisi Mwangomi — Founder of Zanzibaba Real Estate"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zb-surface-warm py-14 sm:py-20">
        <div className="container-portal text-center">
          <h2 className="font-serif text-2xl font-semibold text-zb-navy">
            Start Your Property Search
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-zb-muted sm:text-base">
            Tell us what you're looking for and our local team will suggest matching opportunities across Zanzibar.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/tell-us"
              className="inline-flex items-center justify-center rounded-sm bg-zb-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-zb-navy-deep"
            >
              Tell Us What You Need
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center justify-center rounded-sm border border-zb-navy px-6 py-3 text-sm font-semibold text-zb-navy transition hover:bg-zb-navy hover:text-white"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
