import { NAVY, strokeProps } from "./constants";

export function DigitalMarketingIcon({
  className = "h-14 w-14",
}: {
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      {/* Monitor */}
      <rect {...strokeProps} stroke={NAVY} x="10" y="14" width="40" height="28" rx="2" />
      <path {...strokeProps} stroke={NAVY} d="M24 46h12M30 42v4" />
      {/* 4 bar chart bars */}
      <path {...strokeProps} stroke={NAVY} d="M18 38V32M24 38V26M30 38V30M36 38V22" />
      {/* Upward trend line + arrow past top-right */}
      <path
        {...strokeProps}
        stroke={NAVY}
        d="M42 36 L48 28 L54 20 L60 12"
      />
      <path {...strokeProps} stroke={NAVY} d="M54 12h6v6" />
    </svg>
  );
}
