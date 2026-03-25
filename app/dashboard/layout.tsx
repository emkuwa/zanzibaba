import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionRole } from "@/lib/auth";
import { DashboardNav } from "@/components/DashboardNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await getSessionRole();
  if (!role) redirect("/login");
  return (
    <div className="min-h-screen bg-sand-100">
      <header className="sticky top-0 z-50 border-b border-sand-200 bg-white/95 backdrop-blur-sm">
        <div className="container-tight flex h-14 items-center justify-between">
          <Link
            href="/dashboard"
            className="font-semibold text-brand-700"
          >
            Dashboard
          </Link>
          <DashboardNav role={role} />
        </div>
      </header>
      <div className="container-tight py-6">{children}</div>
    </div>
  );
}
