import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-sand-200/80 bg-sand-50/95 backdrop-blur-sm">
      <div className="container-tight flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-brand-700 hover:text-brand-600"
          aria-label="Zanzibaba Real Estate home"
        >
          Zanzibaba <span className="text-sand-700">Real Estate</span>
        </Link>
        <nav className="flex items-center gap-6" aria-label="Main navigation">
          <Link
            href="/#listings"
            className="text-sm font-medium text-sand-600 hover:text-brand-600 focus-ring rounded px-2 py-1"
          >
            Properties
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-medium text-sand-600 hover:text-brand-600 focus-ring rounded px-2 py-1"
          >
            Contact
          </Link>
          <a
            href="https://wa.me/255716002790"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 focus-ring"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
