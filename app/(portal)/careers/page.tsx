import type { Metadata } from "next";
import { Hero } from "@/components/portal/Hero";
import { Section } from "@/components/portal/Section";
import { Button } from "@/components/portal/Button";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "Careers at Zanzibaba Group — join our team in Zanzibar.",
};

export default function CareersPage() {
  return (
    <>
      <Hero
        compact
        title={<span className="text-white">Careers</span>}
        subtitle="Build with a group that is shaping Zanzibar's development economy."
      />
      <Section title="Join us">
        <p className="max-w-2xl text-lg text-zb-muted leading-relaxed">
          We welcome enquiries from professionals in construction, procurement,
          real estate, hospitality, and digital. Send your CV and area of
          interest to our HR channel.
        </p>
        <div className="mt-10">
          <Button href={`mailto:${SITE.email}?subject=Careers%20Enquiry`} variant="primary">
            Email careers enquiry
          </Button>
        </div>
      </Section>
    </>
  );
}
