import type { Metadata } from "next";
import Link from "next/link";
import { PublicPage } from "@/components/public-page";
import { getPublishedWork } from "@/modules/cms/server";
import { featuredPlatforms } from "@/lib/public-fallback-content";

export const instant = false;
export const metadata: Metadata = { title: "Our work", description: "Explore selected Inspiro platforms, programmes and experiences, including the Lagos International Jazz Festival and Planet Afrobeats." };
export default async function WorkPage() {
  const published = await getPublishedWork().catch(() => []);
  const work = published.length ? published : featuredPlatforms;
  return <PublicPage eyebrow="Our work" title="Ideas, out in the world." intro="Selected platforms and creative properties from a longer story."><section className="public-grid work-index">{work.map((item, index) => <Link className="public-card" href={`/our-work/${item.slug}`} key={item.slug}><span>{String(index + 1).padStart(2, "0")} / {item.category}</span><h2>{item.title}</h2><p>{item.shortDescription}</p><b aria-hidden>↗</b></Link>)}</section></PublicPage>;
}
