import type { Metadata } from "next";
import Link from "next/link";
import { PublicPage } from "@/components/public-page";

export const metadata: Metadata = { title: "The creative economy", description: "The business and economic activity built around creativity, culture, talent, intellectual property and innovation." };

const examples = [
  ["Music", "Music can become a commercially successful business."],
  ["Festivals", "A festival can attract visitors, sponsors and investment."],
  ["Fashion", "Fashion can become a scalable brand."],
  ["Heritage", "Cultural heritage can generate tourism, employment and new markets."],
  ["Business", "Creative ideas can help businesses communicate, innovate and grow."],
];

export default function CreativeEconomyPage() {
  return <PublicPage eyebrow="Our point of view" title="Creativity is an economic resource." intro="The creative economy is the business and economic activity built around creativity, culture, talent, intellectual property and innovation.">
    <section className="story-section story-section-split"><div><p className="eyebrow">The opportunity</p><h2>More than artistic expression.</h2></div><div className="story-copy"><p>Creativity is more than artistic expression. It is also an economic resource.</p><p>INSPIRO works to bridge the gap between creative potential and commercial opportunity.</p><p className="story-pullquote">We don&apos;t just talk about the creative economy. We help build it.</p></div></section>
    <section className="story-section"><p className="eyebrow">From potential to value</p><h2>What this looks like.</h2><div className="statement-grid example-grid">{examples.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")} / {title}</span><p>{copy}</p></article>)}</div></section>
    <section className="story-section story-next"><h2>Let&apos;s build the connection.</h2><p>We work with organisations and creative enterprises to turn ideas into strategies, platforms, partnerships and sustainable opportunities.</p><Link className="text-arrow" href="/what-we-do">Explore what we do <span aria-hidden="true">↗</span></Link></section>
  </PublicPage>;
}
