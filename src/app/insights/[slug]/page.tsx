import { notFound } from "next/navigation";
import { PublicPage } from "@/components/public-page";
import { getPrisma } from "@/lib/prisma";
export const instant = false;
export default async function InsightDetail({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const article = await getPrisma().article.findFirst({ where: { slug, status: "PUBLISHED" } }).catch(() => null); if (!article) notFound(); return <PublicPage eyebrow={`${article.topic} · ${article.authorName}`} title={article.title} intro={article.excerpt}><article className="prose-panel"><p>{article.body}</p></article></PublicPage>; }
