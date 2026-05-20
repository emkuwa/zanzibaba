import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
}

export function Card({ children, className = "", as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={`rounded-sm border border-zb-border/80 bg-white shadow-zb-card transition-all duration-300 ease-luxury ${className}`}
    >
      {children}
    </Tag>
  );
}
