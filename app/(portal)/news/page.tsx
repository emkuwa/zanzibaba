import type { Metadata } from "next";
import { Hero } from "@/components/portal/Hero";
import { Section } from "@/components/portal/Section";

export const metadata: Metadata = {
  title: "News",
  description: "Zanzibaba Group news and announcements.",
};

export default function NewsPage() {
  return (
    <>
      <Hero
        compact
        title={<span className="text-white">News</span>}
        subtitle="Group announcements and insights — coming soon."
      />
      <Section title="Latest updates">
        <p className="text-lg text-zb-muted">
          Our newsroom is being prepared. For immediate enquiries, contact{" "}
          <a href="mailto:info@zanzibaba.com" className="text-zb-navy font-medium hover:text-zb-gold">
            info@zanzibaba.com
          </a>
          .
        </p>
      </Section>
    </>
  );
}
