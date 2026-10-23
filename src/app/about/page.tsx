import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PublicPage } from "@/components/public-page";

export const metadata: Metadata = {
  title: "About Inspiro",
  description: "Established in 2001, Inspiro connects creativity, culture, talent and enterprise to create economic value.",
};

const values = ["Creativity", "Enterprise", "Integrity", "Collaboration", "Impact", "Growth"];

export default function AboutPage() {
  return <PublicPage eyebrow="Who we are / Since 2001" title="See beyond. Go beyond. Make it happen." intro="INSPIRO is a Nigerian Creative Economy Strategy & Development company that connects creativity, culture, talent and enterprise to create economic value.">
    <section className="story-section story-section-split" aria-labelledby="about-story">
      <div><p className="eyebrow">01 / Our story</p><h2 id="about-story">Experience is our starting point. <em>Possibility is the work.</em></h2></div>
      <div className="story-copy">
        <p>Established in 2001, we bring experience across marketing, branding, media, entertainment, events, festivals and creative enterprise development.</p>
        <p>We work with businesses, institutions, creatives and partners to transform ideas into practical strategies, compelling experiences, market opportunities and sustainable ventures.</p>
        <p>As INSPIRO enters its next chapter, we are building on more than 25 years of experience to help unlock the commercial and developmental potential of Africa&apos;s creative economy.</p>
      </div>
    </section>
    <section className="story-section" aria-labelledby="about-direction"><p className="eyebrow">02 / Direction</p><h2 id="about-direction">What guides us.</h2>
      <div className="statement-grid">
        <article><span>Vision</span><p>To become a leading African Creative Economy Development &amp; Strategy Company, transforming creative ideas and talent into sustainable businesses, jobs, wealth and global influence.</p></article>
        <article><span>Mission</span><p>To help people and organisations turn creativity into practical solutions, valuable products, stronger businesses and sustainable economic opportunities.</p></article>
        <article><span>Purpose</span><p>To enable creativity to find expression, create value and generate wealth.</p></article>
      </div>
      <div className="values-line"><span>Our values</span><p>{values.join(" · ")}</p></div>
    </section>
    <section className="story-section leadership-block" aria-labelledby="about-founder">
      <div className="leadership-photo"><Image src="/images/ayoola-sadare-traditional.png" alt="Ayoola Sadare wearing traditional West African attire" fill sizes="(max-width: 800px) 100vw, 40vw" /></div>
      <div><p className="eyebrow">03 / Leadership</p><h2 id="about-founder">Ayoola Sadare</h2><p className="leadership-role">Founder, Inspiro</p>
        <div className="story-copy"><p>Ayoola Olusegun Abayomi Sadare, popularly known as Shaddie Bobo, is the founder of INSPIRO. A Nigerian entrepreneur, brands and marketing consultant, events and festivals producer, and advocate for arts and culture, he has spent more than two decades working across creativity, entertainment, marketing and enterprise.</p><p>His vision is to build INSPIRO into an enduring institution that helps transform Africa&apos;s creative potential into sustainable economic value.</p></div>
        <Link className="text-arrow" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  </PublicPage>;
}
