import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/site";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/RealEstateJsonLd";

export const metadata: Metadata = {
  title: "Buying Property in Zanzibar — Complete Guide for Foreign Buyers",
  description:
    "How to buy property in Zanzibar as a foreigner — leasehold rules, due diligence, purchase process, taxes, costs, and off-plan buying. From local property advisors in Paje and Stone Town.",
  keywords: [
    "buy property in Zanzibar",
    "Zanzibar foreign ownership rules",
    "how to buy villa in Zanzibar",
    "Zanzibar leasehold property",
    "off-plan property Zanzibar",
    "Zanzibar property taxes",
    "Zanzibar due diligence",
    "buying land in Zanzibar",
  ],
  alternates: { canonical: `${SITE.url}/buying-guide` },
  openGraph: {
    title: "Buying Property in Zanzibar — Guide for Foreign Buyers",
    description:
      "Complete guide to buying property in Zanzibar — ownership rules, process, taxes, and costs.",
    url: `${SITE.url}/buying-guide`,
    siteName: SITE.name,
  },
};

const BUYING_GUIDE_FAQS = [
  {
    q: "Can foreigners buy property in Zanzibar?",
    a: "International buyers can acquire property in Zanzibar through approved leasehold and investment structures. The standard lease term is 33, 66, or 99 years with renewal options. Freehold ownership for foreigners has specific restrictions. Zanzibaba Real Estate coordinates legal review to ensure your purchase structure meets current regulations.",
  },
  {
    q: "How much does it cost to buy property in Zanzibar?",
    a: "Property prices in Zanzibar vary by location and type. Entry-level land plots start from approximately $30,000 to $80,000. Beachfront villas in popular areas like Paje and Nungwi typically range from $250,000 to $1,500,000+. Off-plan purchases often offer 10 to 25 percent below completed property prices. Transaction costs including government taxes, legal fees, and registration typically add 5 to 10 percent to the purchase price.",
  },
  {
    q: "What are the best areas to buy property in Zanzibar?",
    a: "The best area depends on your goals. Paje is popular for beachfront villas and kite-surfing lifestyle. Nungwi offers luxury beachfront and nightlife. Jambiani and Bwejuu provide quieter coastal living. Stone Town offers heritage properties and apartments. Kiwengwa and Matemwe suit resort-style investments. Fumba is an emerging area with development potential.",
  },
  {
    q: "How do I buy off-plan property in Zanzibar?",
    a: "Off-plan purchases involve buying during or before construction, typically at 10 to 25 percent below completed property prices. Payment is usually staged across construction milestones. Key considerations include developer track record, payment structure, completion timeline, and quality specifications. Zanzibaba introduces buyers to vetted off-plan developments.",
  },
  {
    q: "How long does the property purchase process take in Zanzibar?",
    a: "The typical property purchase process takes 4 to 8 weeks from agreement to completion. This includes enquiry and shortlisting, property viewing, price negotiation and legal review, title search and due diligence, agreement signing and payment, and registration. Complex cases involving off-plan purchases may take longer.",
  },
  {
    q: "What due diligence is required before buying property in Zanzibar?",
    a: "Essential due diligence includes title search at the land registry, boundary confirmation, encumbrance checks, zoning verification, building permit eligibility, structural surveys for completed properties, and developer track record verification for off-plan. Zanzibaba coordinates these checks with local professionals.",
  },
  {
    q: "What taxes and fees do I pay when buying property in Zanzibar?",
    a: "Property transactions involve government transfer taxes typically 1 to 3 percent of property value, legal fees of 1 to 2 percent, registration fees, and agent commissions where applicable. Total transaction costs typically range from 5 to 10 percent of the purchase price. Independent tax advice is recommended.",
  },
  {
    q: "Can I get rental income from my Zanzibar property?",
    a: "Well-located properties in popular areas like Paje, Nungwi, and Stone Town can generate rental income through short-term holiday lets or long-term leases when professionally managed. Rental yields vary by location, property type, management quality, and market conditions. Beachfront villas in high-demand areas typically achieve higher occupancy.",
  },
];

const GUIDES = [
  {
    title: "Can foreigners buy property in Zanzibar?",
    answer:
      "International buyers can acquire property in Zanzibar through approved leasehold and investment structures. The standard lease term is 33, 66, or 99 years, with renewal options.",
    detail:
      "Freehold ownership for foreigners has specific restrictions. The most common compliant pathway is a government-approved leasehold arrangement. Some buyers also acquire property through investment permits or company structures. Zanzibaba Real Estate coordinates legal review to ensure your ownership structure meets current Zanzibar regulations.",
  },
  {
    title: "How do lease structures work?",
    answer:
      "Most foreign property ownership in Zanzibar is through leasehold arrangements. Lease terms, renewal conditions, and registration requirements vary by property and location.",
    detail:
      "Standard lease terms are 33, 66, or 99 years. Longer terms are generally more valuable but also more expensive. Lease registration at the land registry is essential to protect your interest. Zanzibaba coordinates with legal professionals to ensure your lease is properly documented and registered.",
  },
  {
    title: "What due diligence is required before buying?",
    answer:
      "Essential due diligence includes title search at the land registry, boundary confirmation, encumbrance checks, zoning verification, and structural surveys where applicable.",
    detail:
      "Before purchasing property in Zanzibar, thorough due diligence protects your investment. This includes title searches to confirm legal ownership, boundary verification to avoid disputes, encumbrance checks to identify any claims or liens, zoning confirmation to ensure intended use is permitted, and structural surveys for completed buildings. Zanzibaba coordinates these checks with local legal professionals and surveyors.",
  },
  {
    title: "How does buying off-plan property work?",
    answer:
      "Off-plan purchases involve buying during or before construction, typically at 10 to 25 percent below completed property prices. Payment is staged across construction milestones.",
    detail:
      "Key considerations include developer track record, payment milestone structures, completion timelines, and quality specifications. Typical payment milestones are deposit (10 to 20 percent), foundation completion, wall construction, roofing, and final handover. Zanzibaba introduces buyers to vetted off-plan developments and supports due diligence throughout the process.",
  },
  {
    title: "What is the purchase process?",
    answer:
      "The typical purchase process takes 4 to 8 weeks: enquiry and shortlisting, property viewing, price negotiation, legal review, title search, agreement signing, payment, and registration.",
    detail:
      "Step 1: Enquiry and shortlisting based on your requirements. Step 2: Property viewing in person or virtually. Step 3: Price negotiation and agreement on terms. Step 4: Legal review and title search. Step 5: Agreement signing and payment. Step 6: Registration at the land registry. Zanzibaba guides buyers through each step with local professional support.",
  },
  {
    title: "What taxes and fees apply?",
    answer:
      "Total transaction costs typically range from 5 to 10 percent of the purchase price, including government transfer taxes, legal fees, registration fees, and agent commissions.",
    detail:
      "Government transfer taxes are typically 1 to 3 percent of property value. Legal fees are usually 1 to 2 percent. Registration fees are set by the government. Agent commissions, where applicable, are typically 5 to 10 percent. Costs vary by property type, value, and buyer circumstances. Independent tax advice is recommended for your specific situation.",
  },
  {
    title: "How do I buy land to build on?",
    answer:
      "Land purchases require additional due diligence including zoning confirmation, building permit eligibility, access rights, and utility availability.",
    detail:
      "If you purchase land and plan to build, you will need building permits, architectural plans approved by local authorities, and construction management. Zanzibaba can connect you with local architects, contractors, and building material suppliers through our network. Building costs vary by specification and location.",
  },
  {
    title: "Can I rent out my Zanzibar property?",
    answer:
      "Well-located properties in popular areas can generate rental income through short-term holiday lets or long-term leases when professionally managed.",
    detail:
      "Short-term holiday lets through platforms like Airbnb and Booking.com are popular in tourist areas such as Paje, Nungwi, and Stone Town. Long-term rentals are more common in areas with expat communities. Rental yields vary by location, property type, management quality, and market conditions. Zanzibaba can introduce you to local property management companies.",
  },
  {
    title: "What should I check at a property viewing?",
    answer:
      "Key items to check include beach access, infrastructure (water, electricity, roads), construction quality, natural light, ventilation, storage, parking, and proximity to amenities.",
    detail:
      "When viewing property in Zanzibar, also consider: road access during rainy season, water supply reliability, electrical supply quality, security of the area, potential for rental income if applicable, neighboring properties and development plans, and any coastal erosion or flooding risks. Zanzibaba provides viewing checklists and accompanies buyers during visits.",
  },
  {
    title: "How do I verify a developer before buying off-plan?",
    answer:
      "Verify developer track record, previous completions, financial stability, and construction quality before committing to an off-plan purchase.",
    detail:
      "Key verification steps include: reviewing previously completed projects, visiting construction sites, checking client references, verifying company registration and licenses, reviewing payment terms and contract conditions, and understanding warranty provisions. Zanzibaba provides introductions to established developers and supports your evaluation process.",
  },
  {
    title: "What property management options exist?",
    answer:
      "Property management services handle maintenance, rental management, and oversight for buyers who do not reside in Zanzibar full-time.",
    detail:
      "Local property management companies offer services including regular maintenance, pool and garden care, tenant management, rental booking and guest communication, security monitoring, bill payment, and key holding. Management fees typically range from 10 to 20 percent of rental income or a monthly flat fee. Zanzibaba can introduce you to established management companies.",
  },
  {
    title: "How much does it cost to build in Zanzibar?",
    answer:
      "Construction costs in Zanzibar vary by specification, typically ranging from $400 to $1,200 per square meter for residential construction.",
    detail:
      "Basic construction starts from approximately $400 to $600 per square meter. Mid-range specification is typically $600 to $900 per square meter. High-end luxury villas with premium finishes can exceed $1,000 to $1,200 per square meter. Costs vary by location, materials, design complexity, and contractor. Zanzibaba connects buyers with local architects and contractors.",
  },
];

export default function BuyingGuidePage() {
  return (
    <>
      <FaqJsonLd items={BUYING_GUIDE_FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE.url },
          { name: "Buying Guide", url: `${SITE.url}/buying-guide` },
        ]}
      />
      <section className="bg-zb-navy-deep pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="container-portal">
          <p className="text-eyebrow text-zb-gold">Buyer Education</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
            Buying Property in Zanzibar — Complete Guide
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            Practical guidance for international buyers — from ownership structures and lease terms
            to the purchase process, taxes, and due diligence.
          </p>
        </div>
      </section>

      <section className="container-portal py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-8">
            {GUIDES.map((guide) => (
              <article
                key={guide.title}
                className="rounded-sm border border-zb-border bg-white p-6 sm:p-8"
              >
                <h2 className="font-serif text-xl font-semibold text-zb-navy">
                  {guide.title}
                </h2>
                <p className="mt-3 text-sm font-medium leading-relaxed text-zb-navy/80">
                  {guide.answer}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zb-muted">
                  {guide.detail}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-sm border border-zb-gold/30 bg-zb-surface-warm p-8 text-center">
            <h2 className="font-serif text-xl font-semibold text-zb-navy">
              Need Personal Guidance?
            </h2>
            <p className="mt-3 text-sm text-zb-muted">
              Every property purchase is different. We recommend obtaining independent legal, tax,
              and financial advice before making property purchases in Zanzibar. Our local team can
              help answer your specific questions.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/tell-us" className="btn-luxury-primary inline-flex">
                Tell Us What You Need
              </Link>
              <Link href="/contact" className="btn-luxury-outline inline-flex">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
