import { redirect } from "next/navigation";
import { getListingBySlug } from "@/lib/listings-store";
import { ShareView } from "@/components/ShareView";
import type { Listing } from "@/lib/types";

export const metadata = {
  title: "Shared properties",
  description: "Properties shared with you.",
};

type SearchParams = { p?: string };

export default async function SharePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { p } = await searchParams;
  const slugs = p?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
  if (slugs.length === 0) redirect("/");

  const listings: Listing[] = (
    await Promise.all(slugs.map((slug) => getListingBySlug(slug)))
  ).filter((l): l is Listing => l != null);

  if (listings.length === 0) redirect("/");

  return <ShareView listings={listings} />;
}
