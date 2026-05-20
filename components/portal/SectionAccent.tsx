export function SectionAccent({ variant = "light" }: { variant?: "light" | "dark" | "gold" }) {
  const line =
    variant === "dark"
      ? "via-white/20"
      : variant === "gold"
        ? "via-zb-gold/50"
        : "via-zb-navy/15";

  return (
    <div className="container-portal py-6 sm:py-8" aria-hidden>
      <div className="flex items-center gap-6">
        <span className={`h-px flex-1 bg-gradient-to-r from-transparent ${line} to-transparent`} />
        <svg
          className={`h-3 w-3 shrink-0 ${variant === "dark" ? "text-zb-gold/70" : "text-zb-gold/60"}`}
          viewBox="0 0 12 12"
          fill="currentColor"
        >
          <rect x="5" y="0" width="2" height="12" transform="rotate(45 6 6)" />
          <rect x="5" y="0" width="2" height="12" transform="rotate(-45 6 6)" />
        </svg>
        <span className={`h-px flex-1 bg-gradient-to-r from-transparent ${line} to-transparent`} />
      </div>
    </div>
  );
}
