import type { Metadata } from "next";
import Link from "next/link";
import { PublicPage } from "@/components/public-page";
import { getPublishedArticles } from "@/modules/cms/server";
export const instant = false;
export const metadata: Metadata = { title: "Insights", description: "Perspectives from Inspiro on creative enterprise, culture and economic opportunity." };
export default async function InsightsPage() { const articles = await getPublishedArticles().catch(() => []); return <PublicPage eyebrow="Insights & coverage" title="Ideas in public." intro="Perspectives and coverage on creative enterprise, culture and economic opportunity.">
  {articles.length > 0 && <section className="public-grid">{articles.map(a => <Link className="public-card" href={`/insights/${a.slug}`} key={a.id}><span>{a.topic}</span><h2>{a.title}</h2><p>{a.excerpt}</p></Link>)}</section>}
  <section className="story-section"><p className="eyebrow">Inspiro at 25 / In the press</p><h2>The next chapter in the headlines.</h2><div className="public-grid">
    <a className="public-card" href="https://thenationonlineng.net/inspiro-25-opens-new-chapter-in-nigerias-creative-economy/" target="_blank" rel="noopener noreferrer"><span>The Nation</span><h2>Inspiro @ 25 opens new chapter in Nigeria’s creative economy</h2><p>Coverage of Inspiro&apos;s 25-year milestone and new direction.</p><b aria-hidden="true">↗</b></a>
    <a className="public-card" href="https://www.vanguardngr.com/2026/09/25-years-of-inspiring-creativity-inspiro-opens-new-chapter-in-nigerias-creative-economy/" target="_blank" rel="noopener noreferrer"><span>Vanguard</span><h2>25 years of inspiring creativity: Inspiro opens new chapter in Nigeria’s creative economy</h2><p>Coverage of Inspiro&apos;s next chapter in the creative economy.</p><b aria-hidden="true">↗</b></a>
  </div></section>
</PublicPage>; }
