import type { Metadata } from "next";
import { Hero } from "@/components/portal/Hero";
import { Section } from "@/components/portal/Section";
import { Button } from "@/components/portal/Button";
import { SUBDOMAINS } from "@/data/site";

export const metadata: Metadata = {
  title: "Investments",
  description:
    "Zanzibar investment property programmes — business setup gateway and private investor portal for qualified buyers.",
};

export default function InvestmentsPage() {
  return (
    <>
      <Hero
        compact
        title={<span className="text-white">Investments</span>}
        subtitle="Structured pathways for Zanzibar investment property — from consultation to qualified investor documentation."
      />
      <Section title="Choose your path">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-sm border border-zb-border bg-white p-8 shadow-zb-card">
            <p className="text-eyebrow">Business setup</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-zb-navy">
              Zanzibar Investment Gateway
            </h2>
            <p className="mt-4 text-zb-muted leading-relaxed">
              Licensing facilitation, company registration, and investor support for buyers
              establishing a presence in Zanzibar before or alongside property acquisition.
            </p>
            <div className="mt-6">
              <Button
                href={SUBDOMAINS.investmentGateway}
                variant="navy"
                size="lg"
                external
              >
                Open investment.zanzibaba.com
              </Button>
            </div>
          </article>

          <article className="rounded-sm border border-zb-border bg-white p-8 shadow-zb-card">
            <p className="text-eyebrow">Private investors</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-zb-navy">
              Private Investor Portal
            </h2>
            <p className="mt-4 text-zb-muted leading-relaxed">
              Deal documentation, indicative programme metrics, and secure access for
              qualified investors evaluating Zanzibar real estate programmes.
            </p>
            <p className="mt-3 text-sm text-zb-muted/80">
              Indicative figures are not audited financials — legal review applies.
            </p>
            <div className="mt-6">
              <Button href={SUBDOMAINS.invest} variant="gold" size="lg" external>
                Open invest.zanzibaba.com
              </Button>
            </div>
          </article>
        </div>
      </Section>
    </>
  );
}
