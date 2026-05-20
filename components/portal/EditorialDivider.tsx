export function EditorialDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-4 ${className}`}
      aria-hidden
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-zb-gold/40 to-transparent" />
      <span className="h-1.5 w-1.5 rotate-45 bg-zb-gold/60" />
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-zb-gold/40 to-transparent" />
    </div>
  );
}
