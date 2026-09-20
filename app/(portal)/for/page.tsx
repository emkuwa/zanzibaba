import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/site";
import { BUYER_GUIDES } from "@/data/buyer-guides";
import { BreadcrumbJsonLd } from "@/components/seo/RealEstateJsonLd";

export const metadata: Metadata = {
  title: "Property Buying Guides by Buyer Type — Zanzibar",
  description:
    "Personalized property buying guides for different types of buyers — UK, UAE, diaspora, retirees, and investors. Find the right guidance for your Zanzibar property purchase.",
  alternates: { canonical: `${SITE.url}/for` },
  openGraph: {
    title: "Property Buying Guides by Buyer Type — Zanzibaba",
    description: "Guides for different types of property buyers in Zanzibar.",
    url: `${SITE.url}/for`,
    siteName: SITE.name,
  },
};

export default function ForBuyersPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE.url },
          { name: "For Buyers", url: `${SITE.url}/for` },
        ]}
      />
      <section className="bg-zb-navy-deep pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="container-portal">
          <p className="text-eyebrow text-zb-gold">For Buyers</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
            Property Guides by Buyer Type
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            Personalized guidance for different types of property buyers in Zanzibar.
          </p>
        </div>
      </section>

      <section className="container-portal py-10 sm:py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BUYER_GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={`/for/${guide.slug}`}
              className="group rounded-sm border border-zb-border bg-white p-6 transition hover:border-zb-gold/40 hover:shadow-zb-gold-glow"
            >
              <div className="text-3xl">{guide.icon}</div>
              <h2 className="mt-3 font-serif text-lg font-semibold text-zb-navy group-hover:text-zb-gold transition">
                {guide.title}
              </h2>
              <p className="mt-2 text-sm text-zb-muted line-clamp-3">{guide.description}</p>
              <p className="mt-3 text-xs font-semibold text-zb-gold">
                Budget: {guide.budgetRange}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
