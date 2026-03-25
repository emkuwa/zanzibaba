import { getAllListings } from "@/lib/listings-store";
import { DashboardListings } from "@/components/DashboardListings";
import { getSessionRole, getSessionAgentCode } from "@/lib/auth";
import { DashboardWhatsappImport } from "@/components/DashboardWhatsappImport";

export const metadata = {
  title: "Dashboard",
  description: "Manage your property listings.",
};

export default async function DashboardPage() {
  const role = await getSessionRole();
  const agentCode = await getSessionAgentCode();
  let listings = await getAllListings();
  if (role === "agent" && agentCode) {
    listings = listings.filter(
      (l) => (l.agentCode ?? "").toLowerCase() === agentCode.toLowerCase()
    );
  }
  const published = listings.filter((l) => !l.draft);
  const drafts = listings.filter((l) => l.draft);

  return (
    <div>
      <h1 className="text-2xl font-bold text-sand-900">Listings</h1>
      <p className="mt-1 text-sand-600">
        {listings.length} total · {published.length} published · {drafts.length} drafts
      </p>
      {role === "admin" && (
        <div className="mt-6">
          <DashboardWhatsappImport />
        </div>
      )}
      <div className="mt-6">
        <DashboardListings listings={listings} role={role ?? "agent"} />
      </div>
    </div>
  );
}
