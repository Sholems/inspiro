import type { Metadata } from "next";
import Link from "next/link";
import { PublicPage } from "@/components/public-page";
import { getPublishedEpisodes } from "@/modules/cms/server";
export const instant = false;
export const metadata: Metadata = { title: "CE Live", description: "Conversations with people building across the creative economy." };
export default async function CELivePage() { const episodes = await getPublishedEpisodes().catch(() => []); return <PublicPage eyebrow="CE Live" title="Creative economy, live." intro="Conversations with people building across the creative economy.">{episodes.length ? <section className="public-grid">{episodes.map(e => <Link className="public-card" href={`/celive/${e.slug}`} key={e.id}><span>{e.episodeNumber ? `Episode ${e.episodeNumber}` : "Conversation"}</span><h2>{e.title}</h2><p>{e.summary}</p><b aria-hidden>↗</b></Link>)}</section> : <p className="empty-state">Conversations will appear here when published. In the meantime, explore <Link href="/insights">our perspectives and press coverage ↗</Link>.</p>}</PublicPage>; }
