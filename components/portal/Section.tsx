import type { ReactNode } from "react";
import { MotionReveal } from "./MotionReveal";
import { EditorialDivider } from "./EditorialDivider";

interface SectionProps {
  children?: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  dark?: boolean;
  warm?: boolean;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  animate?: boolean;
  align?: "left" | "center";
  wide?: boolean;
  showDivider?: boolean;
}

export function Section({
  children,
  id,
  className = "",
  containerClassName = "",
  dark = false,
  warm = false,
  eyebrow,
  title,
  subtitle,
  animate = true,
  align = "left",
  wide = false,
  showDivider = false,
}: SectionProps) {
  const bg = dark
    ? "bg-zb-navy text-white"
    : warm
      ? "bg-zb-surface-warm text-zb-ink pattern-grid"
      : "bg-white text-zb-ink";

  const headerAlign = align === "center" ? "mx-auto text-center" : "max-w-2xl";
  const header = (eyebrow || title || subtitle) && (
    <div className={`mb-14 sm:mb-16 lg:mb-20 ${headerAlign}`}>
      {eyebrow && <p className="text-eyebrow mb-4">{eyebrow}</p>}
      {title && (
        <h2
          className={`text-section-title ${
            dark ? "text-white" : "text-zb-navy"
          }`}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={`mt-5 text-body-luxury max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          } ${dark ? "!text-white/75" : ""}`}
        >
          {subtitle}
        </p>
      )}
      {showDivider && (
        <EditorialDivider className={`mt-10 max-w-xs ${align === "center" ? "mx-auto" : ""}`} />
      )}
    </div>
  );

  const Container = wide ? "container-wide" : "container-portal";

  const inner = (
    <section id={id} className={`${bg} ${className}`}>
      <div
        className={`${Container} section-py ${containerClassName}`}
      >
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
