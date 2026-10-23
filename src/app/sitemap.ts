import type { MetadataRoute } from "next";
import { getPrisma } from "@/lib/prisma";
import { getPublicSiteUrl } from "@/lib/site-url";
import { featuredPlatforms } from "@/lib/public-fallback-content";

const publicRoutes = ["/", "/about", "/what-we-do", "/who-we-work-with", "/how-we-work", "/our-work", "/creative-economy", "/experiences", "/gallery", "/insights", "/celive", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getPublicSiteUrl();
  if (!siteUrl) return [];

  const prisma = getPrisma();
  const [work, articles, episodes] = await Promise.all([
    prisma.workItem.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, publishedAt: true } }),
    prisma.article.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, publishedAt: true } }),
    prisma.cELiveEpisode.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, publishedAt: true } }),
  ]).catch(() => [[], [], []] as const);

  const paths: { path: string; lastModified?: Date }[] = [
    ...publicRoutes.map((path) => ({ path })),
    ...featuredPlatforms.filter((item) => !work.some((published) => published.slug === item.slug)).map((item) => ({ path: `/our-work/${item.slug}` })),
    ...work.map((item) => ({ path: `/our-work/${item.slug}`, lastModified: item.publishedAt ?? undefined })),
    ...articles.map((item) => ({ path: `/insights/${item.slug}`, lastModified: item.publishedAt ?? undefined })),
    ...episodes.map((item) => ({ path: `/celive/${item.slug}`, lastModified: item.publishedAt ?? undefined })),
  ];

  return paths.map(({ path, lastModified }) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified,
  }));
}
