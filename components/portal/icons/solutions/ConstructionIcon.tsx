import { NAVY, strokeProps } from "./constants";

export function ConstructionIcon({
  className = "h-14 w-14",
}: {
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      {/* Ground base */}
      <path {...strokeProps} stroke={NAVY} d="M14 52h36" />
      {/* Lattice mast */}
      <path {...strokeProps} stroke={NAVY} d="M28 52V18" />
      <path {...strokeProps} stroke={NAVY} d="M24 24l8 8M24 32l8 8M24 40l8 8M32 24l-8 8M32 32l-8 8M32 40l-8 8" />
      {/* Jib arm */}
      <path {...strokeProps} stroke={NAVY} d="M28 18h30" />
      {/* Counterweight square (left) */}
      <rect {...strokeProps} stroke={NAVY} x="14" y="14" width="8" height="8" rx="1" />
      <path {...strokeProps} stroke={NAVY} d="M22 18h6" />
      {/* Top triangular cables */}
      <path {...strokeProps} stroke={NAVY} d="M28 18 L38 8 L58 18" />
      <path {...strokeProps} stroke={NAVY} d="M38 8V18" />
      {/* Hook cable + load square (right) */}
      <path {...strokeProps} stroke={NAVY} d="M52 18v12" />
      <path {...strokeProps} stroke={NAVY} d="M50 34h4" />
      <rect {...strokeProps} stroke={NAVY} x="47" y="36" width="10" height="10" rx="1" />
    </svg>
  );
}
