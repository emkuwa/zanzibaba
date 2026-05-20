import { GOLD, NAVY, strokeProps } from "./constants";

export function BuildingMaterialsIcon({
  className = "h-14 w-14",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      <path
        {...strokeProps}
        stroke={NAVY}
        d="M12 40l9-5 9 5v10l-9 5-9-5V40z"
      />
      <path {...strokeProps} stroke={GOLD} d="M21 35l9-5 9 5" />
      <path {...strokeProps} stroke={NAVY} d="M30 30v10M39 35v10" />
      <path
        {...strokeProps}
        stroke={NAVY}
        d="M26 26l9-5 9 5v10l-9 5-9-5V26z"
      />
      <path {...strokeProps} stroke={GOLD} d="M35 21l9-5 9 5" />
      <path {...strokeProps} stroke={NAVY} d="M44 16v10M53 21v10" />
      <path
        {...strokeProps}
        stroke={NAVY}
        d="M8 48l9-5 9 5v10l-9 5-9-5V48z"
      />
      <path {...strokeProps} stroke={GOLD} d="M17 43l9-5 9 5" />
      <path {...strokeProps} stroke={NAVY} d="M26 38v10M35 43v10" />
    </svg>
  );
}
