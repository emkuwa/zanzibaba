import { NAVY, strokeProps } from "./constants";

export function BuildingMaterialsIcon({
  className = "h-14 w-14",
}: {
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      {/* Bottom-left cube */}
      <path {...strokeProps} stroke={NAVY} d="M11 38 L20 29 L29 38 L29 45 L20 49 L11 45 Z" />
      <path {...strokeProps} stroke={NAVY} d="M11 38 V45 L20 49 V42" />
      <path {...strokeProps} stroke={NAVY} d="M29 38 V45 L20 49" />
      {/* Bottom-right cube */}
      <path {...strokeProps} stroke={NAVY} d="M35 38 L44 29 L53 38 L53 45 L44 49 L35 45 Z" />
      <path {...strokeProps} stroke={NAVY} d="M35 38 V45 L44 49 V42" />
      <path {...strokeProps} stroke={NAVY} d="M53 38 V45 L44 49" />
      {/* Top center cube */}
      <path {...strokeProps} stroke={NAVY} d="M23 18 L32 9 L41 18 L41 25 L32 29 L23 25 Z" />
      <path {...strokeProps} stroke={NAVY} d="M23 18 V25 L32 29 V22" />
      <path {...strokeProps} stroke={NAVY} d="M41 18 V25 L32 29" />
    </svg>
  );
}
