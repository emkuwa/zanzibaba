import { SUBDOMAINS } from "@/data/site";
import { Section } from "./Section";
import { MotionReveal } from "./MotionReveal";

const platforms = [
  {
    label: "Building Materials",
    href: SUBDOMAINS.materials,
    description: "BOQ quoting, bulk supply, island delivery",
  },
  {
    label: "Investments",
    href: SUBDOMAINS.invest,
    description: "Private investor portal & deal documentation",
  },
  {
    label: "ZanziCore",
    href: SUBDOMAINS.zanzicore,
    description: "Operations & internal systems",
  },
  {
    label: "Admin",
    href: SUBDOMAINS.admin,
    description: "Group administration dashboard",
  },
];

export function DigitalEstate() {
  return (
    <Section
      eyebrow="Digital Estate"
      title="Live platforms"
      subtitle="Access our operational subdomains — materials procurement, investor relations, and internal systems."
      className="border-t border-zb-border/60"
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {platforms.map((item, i) => (
          <MotionReveal key={item.href} delay={i * 0.06}>
            <li>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between rounded-sm border border-zb-border bg-zb-surface px-7 py-9 transition-all duration-300 hover:border-zb-gold/50 hover:bg-white hover:shadow-zb-card-hover sm:px-8 sm:py-10"
              >
                <span className="font-serif text-xl font-semibold text-zb-navy transition-colors group-hover:text-zb-gold">
                  {item.label}
                </span>
                <p className="mt-4 text-sm font-light text-zb-muted">
                  {item.description}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-zb-navy transition-all group-hover:text-zb-gold">
                  Visit
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
            </li>
          </MotionReveal>
        ))}
      </ul>
    </Section>
  );
}
