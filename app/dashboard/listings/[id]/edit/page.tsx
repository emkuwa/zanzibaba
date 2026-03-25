import Link from "next/link";
import { notFound } from "next/navigation";
import { getListingById } from "@/lib/listings-store";
import { getSessionRole, getSessionAgentCode } from "@/lib/auth";
import { ListingForm } from "@/components/ListingForm";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) notFound();
  const role = await getSessionRole();
  if (role === "agent") {
    const sessionCode = await getSessionAgentCode();
    const listingCode = (listing.agentCode ?? "").toLowerCase();
    if (!sessionCode || listingCode !== sessionCode.toLowerCase()) {
      notFound();
    }
  }

  return (
    <div>
      <nav className="mb-6 text-sm text-sand-600">
        <Link href="/dashboard" className="hover:text-brand-600">
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        <span className="text-sand-900">Edit</span>
      </nav>
      <h1 className="text-2xl font-bold text-sand-900">Edit listing</h1>
      <p className="mt-1 text-sand-600">{listing.title}</p>
      <div className="mt-6">
        <ListingForm key={listing.id} listing={listing} mode="edit" />
      </div>
    </div>
  );
}
