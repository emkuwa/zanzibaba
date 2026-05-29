import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "navy" | "gold" | "secondary" | "outline" | "outline-light" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-zb-navy text-white hover:bg-zb-navy-deep border border-transparent",
  navy:
    "bg-zb-navy text-white hover:bg-zb-navy-deep border border-transparent",
  gold:
    "bg-zb-gold text-zb-navy-deep hover:bg-[#d4ab55] border border-zb-gold/80",
  secondary:
    "bg-zb-navy text-white hover:bg-zb-navy-deep border border-transparent",
  outline:
    "bg-transparent text-zb-navy border border-zb-navy hover:bg-zb-surface",
  "outline-light":
    "bg-transparent text-white border border-white/90 hover:bg-white/10",
  ghost:
    "bg-transparent text-zb-navy hover:text-zb-gold border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-3.5 text-base tracking-wide",
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  external,
  type = "button",
  onClick,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 rounded-[4px] focus:outline-none focus-visible:ring-2 focus-visible:ring-zb-gold focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={base}>
      {children}
    </button>
  );
}
