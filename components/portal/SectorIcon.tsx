import type { ReactNode } from "react";

type IconKey = "building" | "crane" | "compass" | "globe";

const paths: Record<IconKey, ReactNode> = {
  building: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"
    />
  ),
  crane: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M4 21h16M8 21V9l4-3 4 3v12M12 6V3m0 0l3 3m-3-3L9 6"
    />
  ),
  compass: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 0l2.5 7.5L12 12 9.5 10.5 12 3z"
    />
  ),
  globe: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9m0-18c-2.5 2.7-4 6-4 9s1.5 6.3 4 9"
    />
  ),
};

export function SectorIcon({
  name,
  className = "h-7 w-7",
}: {
  name: IconKey;
  className?: string;
}) {
  return (
    <svg
      className={`text-zb-gold ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
