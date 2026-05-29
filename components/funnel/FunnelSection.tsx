import type { ReactNode } from "react";

type FunnelSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
  centered?: boolean;
};

export function FunnelSection({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
  dark = false,
  centered = true,
}: FunnelSectionProps) {
  return (
    <section
      id={id}
      className={`section-py-sm lg:section-py ${dark ? "bg-zb-navy-deep text-white" : "bg-white"} ${className}`}
    >
      <div className="container-portal">
        <header className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
          {eyebrow && <p className="text-eyebrow">{eyebrow}</p>}
          <h2
            className={`mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem] ${
              dark ? "text-white" : "text-zb-navy"
            }`}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`mt-4 text-sm leading-relaxed sm:text-base ${
                dark ? "text-white/75" : "text-zb-muted"
              }`}
            >
              {subtitle}
            </p>
          )}
        </header>
        <div className="mt-10 lg:mt-14">{children}</div>
      </div>
    </section>
  );
}
