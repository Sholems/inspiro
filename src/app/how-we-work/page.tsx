import type { Metadata } from "next";
import Link from "next/link";
import { PublicPage } from "@/components/public-page";

export const metadata: Metadata = { title: "How we work", description: "Discover, develop, connect, deliver, evaluate and grow: Inspiro’s collaborative approach." };

const steps = [
  ["Discover", "Understand the challenge, audience and opportunity."],
  ["Develop", "Create the strategy, concept and business approach."],
  ["Connect", "Mobilise the right people, partners and resources."],
  ["Deliver", "Execute the programme, campaign or initiative."],
  ["Evaluate & Grow", "Assess results, identify lessons and build future value."],
];

const reasons = [
  ["Experience across disciplines", "We understand the connections between creativity, culture, marketing, media, entertainment and business."],
  ["Strategy with execution", "We develop ideas with a view to how they can be delivered, marketed and sustained."],
  ["Local understanding, wider ambition", "We bring Nigerian market experience to opportunities with African and international relevance."],
  ["An enterprise mindset", "We look beyond visibility and activity to consider value creation, commercial viability and long-term development."],
  ["Partnership-driven thinking", "We help bring the right stakeholders together around shared objectives."],
];

export default function HowWeWorkPage() {
  return <PublicPage eyebrow="Our approach" title="From possibility to practical value." intro="Our approach is collaborative, commercially aware and tailored to the needs of each engagement.">
    <section className="story-section"><p className="eyebrow">The process</p><div className="service-list">{steps.map(([title, copy], index) => <article className="service-line" key={title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{copy}</p></article>)}</div></section>
    <section className="story-section"><p className="eyebrow">Why Inspiro</p><h2>Built to connect the dots.</h2><div className="statement-grid reasons-grid">{reasons.map(([title, copy]) => <article key={title}><span>{title}</span><p>{copy}</p></article>)}</div></section>
    <section className="story-section story-next"><h2>Let&apos;s build what comes next.</h2><p>Creativity is a resource. Talent is an asset. Ideas are opportunities.</p><Link className="text-arrow" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link></section>
  </PublicPage>;
}
