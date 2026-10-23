import { notFound } from "next/navigation";
import { PublicPage } from "@/components/public-page";
import { getPrisma } from "@/lib/prisma";
import { featuredPlatforms } from "@/lib/public-fallback-content";

export const instant = false;
export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const published = await getPrisma().workItem.findFirst({ where: { slug, status: "PUBLISHED" } }).catch(() => null);
  const item = published ?? featuredPlatforms.find((platform) => platform.slug === slug);
  if (!item) notFound();
  return <PublicPage eyebrow={item.category} title={item.title} intro={item.shortDescription}><article className="prose-panel"><p>{item.fullDescription}</p>{item.location && <dl><dt>Location</dt><dd>{item.location}</dd></dl>}</article></PublicPage>;
}
