import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zb-surface px-6 text-center">
      <h1 className="font-serif text-3xl font-semibold text-zb-navy">Page not found</h1>
      <p className="mt-3 max-w-md text-zb-muted">
        The page you requested does not exist. Browse properties or return home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-sm bg-zb-navy px-6 py-3 text-sm font-medium text-white hover:bg-zb-navy-deep"
        >
          Go home
        </Link>
        <Link
          href="/properties"
          className="rounded-sm border border-zb-border bg-white px-6 py-3 text-sm font-medium text-zb-navy hover:bg-zb-surface"
        >
          Browse properties
        </Link>
      </div>
    </div>
  );
}
