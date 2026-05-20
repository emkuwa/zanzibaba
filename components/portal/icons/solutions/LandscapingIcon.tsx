import { NAVY, strokeProps } from "./constants";

export function LandscapingIcon({
  className = "h-14 w-14",
}: {
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      {/* Vertical stem */}
      <path {...strokeProps} stroke={NAVY} d="M32 52V30" />
      {/* Top center teardrop leaf */}
      <path
        {...strokeProps}
        stroke={NAVY}
        d="M32 30 C28 22 28 14 32 10 C36 14 36 22 32 30"
      />
      <path {...strokeProps} stroke={NAVY} d="M32 30V14" />
      {/* Left diagonal teardrop leaf */}
      <path
        {...strokeProps}
        stroke={NAVY}
        d="M32 34 C24 32 18 28 14 24 C20 26 26 30 32 34"
      />
      <path {...strokeProps} stroke={NAVY} d="M32 34 L18 26" />
      {/* Right diagonal teardrop leaf */}
      <path
        {...strokeProps}
        stroke={NAVY}
        d="M32 34 C40 32 46 28 50 24 C44 26 38 30 32 34"
      />
      <path {...strokeProps} stroke={NAVY} d="M32 34 L46 26" />
      {/* Two curved ground lines */}
      <path {...strokeProps} stroke={NAVY} d="M8 52 C16 46 24 48 32 52 C40 56 48 54 56 52" />
      <path {...strokeProps} stroke={NAVY} d="M10 56 C18 52 26 54 32 56 C38 58 46 56 54 54" />
    </svg>
  );
}
