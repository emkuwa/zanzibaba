export function EditorialDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-5 ${className}`}
      aria-hidden
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-zb-gold/50 to-zb-gold/20" />
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span className="absolute h-2 w-2 rotate-45 border border-zb-gold/70 bg-zb-gold/20" />
        <span className="h-0.5 w-0.5 rounded-full bg-zb-gold" />
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-zb-gold/50 to-zb-gold/20" />
    </div>
  );
}
