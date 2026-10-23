import type { Metadata } from "next";
import Link from "next/link";
import { PublicPage } from "@/components/public-page";

export const metadata: Metadata = { title: "Who we work with", description: "Inspiro works with brands, institutions, creative businesses, investors, sponsors and development partners." };

const audiences = [
  ["Corporates & Brands", "Marketing strategy, brand experiences, campaigns, sponsorship activation and audience engagement."],
  ["Government & Public Institutions", "Creative economy programmes, cultural initiatives, festivals and enterprise development."],
  ["Creators & Creative Businesses", "Talent development, commercial strategy, marketing, events and intellectual property opportunities."],
  ["Investors, Sponsors & Development Partners", "Partnership development, creative ventures, sponsorship platforms and impact-driven initiatives."],
];

export default function WhoWeWorkWithPage() {
  return <PublicPage eyebrow="Who we work with" title="Different ambitions. Shared creative potential." intro="Our services are designed for organisations seeking to use creativity as a tool for business growth, economic development, audience engagement or cultural impact.">
    <section className="story-section"><p className="eyebrow">Where we can help</p><div className="statement-grid audience-grid">{audiences.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{copy}</p></article>)}</div></section>
    <section className="story-section story-next"><h2>Tell us what you&apos;re working towards.</h2><p>We can shape an approach around your challenge, audience and opportunity.</p><Link className="text-arrow" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link></section>
  </PublicPage>;
}
