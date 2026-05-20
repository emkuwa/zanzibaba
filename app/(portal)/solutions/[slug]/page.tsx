import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DepartmentTemplate } from "@/components/portal/DepartmentTemplate";
import { getSolutionBySlug, SOLUTIONS } from "@/data/solutions";

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return { title: "Solution not found" };
  return {
    title: solution.title,
    description: solution.shortDescription,
    openGraph: {
      title: `${solution.title} | Zanzibaba Group`,
      description: solution.shortDescription,
    },
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();
  return <DepartmentTemplate solution={solution} />;
}
