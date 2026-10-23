import type { Metadata } from "next";
import Link from "next/link";
import { PublicPage } from "@/components/public-page";

export const metadata: Metadata = { title: "What we do", description: "Six connected service areas spanning creative strategy, branding, talent, experiences, media and partnerships." };

const services = [
  ["Creative Strategy & Business Development", "We help organisations identify opportunities, develop strategies, structure initiatives and build commercially viable creative ventures."],
  ["Branding & Marketing", "We develop brand positioning, marketing strategies, campaigns and audience engagement programmes that help businesses connect with their markets."],
  ["Talent & Creative Enterprise Development", "We support talent development, commercialisation, talent-to-wealth strategies and the development of sustainable creative businesses."],
  ["Events, Festivals & Experiences", "We conceptualise, develop, produce and commercialise events, festivals, cultural programmes and brand experiences."],
  ["Media, Content & Intellectual Property", "We develop content, media projects and creative properties with potential for audience growth, partnerships, licensing and monetisation."],
  ["Partnerships & Market Development", "We connect brands, institutions, creatives and investors to develop collaborations, sponsorship opportunities and new routes to market."],
];

export default function WhatWeDoPage() {
  return <PublicPage eyebrow="Our services" title="Strategy meets creative thinking. And practical execution." intro="INSPIRO combines strategy with creative thinking and practical execution across six service areas.">
    <section className="story-section"><p className="eyebrow">Six connected areas</p><div className="service-list">{services.map(([title, description], index) => <article className="service-line" key={title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{description}</p></article>)}</div></section>
    <section className="story-section story-next"><h2>The right mix depends on the opportunity.</h2><p>Our approach is collaborative, commercially aware and tailored to the needs of each engagement.</p><Link className="text-arrow" href="/contact">Discuss your project <span aria-hidden="true">↗</span></Link></section>
  </PublicPage>;
}
