import { notFound } from "next/navigation";
import { PublicPage } from "@/components/public-page";
import { getPrisma } from "@/lib/prisma";
export const instant = false;
export default async function EpisodeDetail({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const episode = await getPrisma().cELiveEpisode.findFirst({ where: { slug, status: "PUBLISHED" } }).catch(() => null); if (!episode) notFound(); return <PublicPage eyebrow={episode.episodeNumber ? `CE Live · Episode ${episode.episodeNumber}` : "CE Live"} title={episode.title} intro={episode.summary}><article className="prose-panel">{episode.guestName && <h2>{episode.guestName}</h2>}<p>{episode.transcript ?? "Transcript coming soon."}</p>{episode.videoUrl && <a href={episode.videoUrl}>Watch the conversation ↗</a>}</article></PublicPage>; }
