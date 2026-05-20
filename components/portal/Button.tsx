import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-zb-gold text-zb-navy-deep hover:bg-[#d4ab55] border border-transparent",
  secondary:
    "bg-zb-navy text-white hover:bg-zb-navy-deep border border-transparent",
  outline:
    "bg-transparent text-white border border-white/80 hover:bg-white/10",
  ghost:
    "bg-transparent text-zb-navy hover:text-zb-gold border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
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
  const base = `inline-flex items-center justify-center font-medium tracking-wide transition-colors duration-200 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-zb-gold focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`;

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
