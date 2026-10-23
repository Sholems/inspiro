import "server-only";
import { getPrisma } from "@/lib/prisma";

export async function getPublishedServices() {
  return getPrisma().service.findMany({ where: { status: "PUBLISHED" }, orderBy: [{ pillar: "asc" }, { sortOrder: "asc" }] });
}

export async function getPublishedWork(featured?: boolean) {
  return getPrisma().workItem.findMany({ where: { status: "PUBLISHED", ...(featured === undefined ? {} : { featured }) }, orderBy: [{ publishedAt: "desc" }, { title: "asc" }] });
}

export async function getPublishedPage(slug: string) {
  return getPrisma().page.findFirst({ where: { slug, status: "PUBLISHED" } });
}

export async function getPublishedArticles() {
  return getPrisma().article.findMany({ where: { status: "PUBLISHED" }, orderBy: { publishedAt: "desc" } });
}

export async function getPublishedEpisodes() {
  return getPrisma().cELiveEpisode.findMany({ where: { status: "PUBLISHED" }, orderBy: [{ publishedAt: "desc" }, { episodeNumber: "desc" }] });
}
