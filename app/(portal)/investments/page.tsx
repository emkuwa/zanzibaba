import type { Metadata } from "next";
import { Hero } from "@/components/portal/Hero";
import { Section } from "@/components/portal/Section";
import { Button } from "@/components/portal/Button";
import { SUBDOMAINS } from "@/data/site";

export const metadata: Metadata = {
  title: "Investments",
  description:
    "Zanzibaba investment opportunities — private investor portal for curated deals in Zanzibar.",
};

export default function InvestmentsPage() {
  return (
    <>
      <Hero
        compact
        title={<span className="text-white">Investments</span>}
        subtitle="Curated opportunities for qualified investors — access our private investment portal."
      />
      <Section title="Investor portal">
        <p className="max-w-2xl text-lg text-zb-muted leading-relaxed">
          Deal details, indicative returns, and programme documentation are
          available on our secure investment subdomain. Indicative figures are
          not audited financials — legal review applies to all ROI language.
        </p>
        <div className="mt-10">
          <Button href={SUBDOMAINS.invest} variant="primary" size="lg" external>
            Open invest.zanzibaba.com
          </Button>
        </div>
      </Section>
    </>
  );
}
