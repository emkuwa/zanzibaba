import Link from "next/link";
import { ListingForm } from "@/components/ListingForm";

export const metadata = {
  title: "Add listing",
  description: "Add a new property listing.",
};

export default function NewListingPage() {
  return (
    <div>
      <nav className="mb-6 text-sm text-sand-600">
        <Link href="/dashboard" className="hover:text-brand-600">
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        <span className="text-sand-900">Add listing</span>
      </nav>
      <h1 className="text-2xl font-bold text-sand-900">Add listing</h1>
      <p className="mt-1 text-sand-600">
        Fill in the details below. You can save as draft to publish later.
      </p>
      <div className="mt-6">
        <ListingForm mode="create" />
      </div>
    </div>
  );
}
