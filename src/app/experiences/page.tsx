import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PublicPage } from "@/components/public-page";

export const metadata: Metadata = { title: "Experiences", description: "Inspiro develops festivals, cultural programmes and brand experiences that connect people, audiences and opportunities." };

export default function ExperiencesPage() {
  return <PublicPage eyebrow="Events, festivals & experiences" title="Bring people together. Build something lasting." intro="We conceptualise, develop, produce and commercialise events, festivals, cultural programmes and brand experiences.">
    <section className="story-section story-section-split"><div><p className="eyebrow">Beyond the moment</p><h2>Experiences with a larger purpose.</h2></div><div className="story-copy"><p>A festival can attract visitors, sponsors and investment. A cultural programme can create space for talent, audiences and partners to meet.</p><p>Our work connects creative ideas with the strategy, people and commercial structures that can give them value beyond a single event.</p></div></section>
    <section className="story-section experience-feature"><div className="experience-photo"><Image src="/images/lagos-jazz-festival.jpg" alt="Ayoola Sadare at the Lagos International Jazz Festival" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div><p className="eyebrow">An Inspiro platform</p><h2>Lagos International Jazz Festival</h2><p>A longstanding platform conceived in 2005 to celebrate jazz, live music and cultural exchange.</p><Link className="text-arrow" href="/our-work/lagos-international-jazz-festival">Explore the platform <span aria-hidden="true">↗</span></Link></div></section>
    <section className="story-section story-next"><h2>What experience could do for you?</h2><p>Let&apos;s explore an event, festival or programme shaped around your audience and goals.</p><Link className="text-arrow" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link></section>
  </PublicPage>;
}
