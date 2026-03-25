"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { DashboardRole } from "@/lib/auth";

export function DashboardNav({ role }: { role: DashboardRole }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="flex items-center gap-4">
      <span className="hidden text-xs font-medium uppercase tracking-wide text-sand-500 sm:inline">
        {role === "admin" ? "Admin" : "Agent"}
      </span>
      {role === "admin" && (
        <Link
          href="/dashboard/leads"
          className="text-sm text-sand-600 hover:text-brand-600"
        >
          Leads
        </Link>
      )}
      <Link
        href="/dashboard/listings/new"
        className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700"
      >
        Add listing
      </Link>
      <Link href="/" className="text-sm text-sand-600 hover:text-brand-600">
        View site
      </Link>
      <button
        type="button"
        onClick={handleLogout}
        className="text-sm text-sand-600 hover:text-sand-900"
      >
        Logout
      </button>
    </nav>
  );
}
