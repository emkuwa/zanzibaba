import type { ReactNode } from "react";
import { MotionReveal } from "./MotionReveal";

interface SectionProps {
  children?: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  dark?: boolean;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  animate?: boolean;
}

export function Section({
  children,
  id,
  className = "",
  containerClassName = "",
  dark = false,
  eyebrow,
  title,
  subtitle,
  animate = true,
}: SectionProps) {
  const bg = dark ? "bg-zb-navy text-white" : "bg-white text-zb-ink";
  const header = (eyebrow || title || subtitle) && (
    <div className="mb-12 max-w-2xl">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-zb-gold">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2
          className={`font-serif text-3xl font-semibold leading-tight sm:text-4xl ${
            dark ? "text-white" : "text-zb-navy"
          }`}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            dark ? "text-white/75" : "text-zb-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );

  const inner = (
    <section id={id} className={`${bg} ${className}`}>
      <div className={`container-portal py-16 sm:py-20 lg:py-24 ${containerClassName}`}>
        {header}
        {children}
      </div>
    </section>
  );

  if (animate) {
    return <MotionReveal>{inner}</MotionReveal>;
  }
  return inner;
}
