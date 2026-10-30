import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PublicPage } from "@/components/public-page";
import { formatNaira, getPublicEvents } from "@/lib/events";

export const metadata: Metadata = { title: "Events & tickets", description: "Find upcoming Inspiro festivals, live sessions and cultural experiences. Reserve free or paid tickets." };
export const instant = false;

export default async function EventsPage() {
  const events = await getPublicEvents();
  return <PublicPage eyebrow="Events & tickets" title="Meet the moment." intro="Discover live sessions, festivals and cultural experiences created by Inspiro. Reserve your place for what’s next.">
    <section className="events-list" aria-labelledby="upcoming-events">
      <div className="events-list-heading"><p className="eyebrow">What&apos;s on</p><h2 id="upcoming-events">Upcoming experiences</h2></div>
      <div className="event-cards">
        {events.map((event) => <article className="event-card" key={event.slug}>
          <Link className="event-card-image" href={`/events/${event.slug}`} aria-label={`View ${event.title}`}><Image src={event.image} alt={`${event.title} event poster`} fill sizes="(max-width: 800px) 100vw, 46vw" /></Link>
          <div className="event-card-copy"><p className="eyebrow">{event.category}</p><h3><Link href={`/events/${event.slug}`}>{event.title}</Link></h3><p>{event.summary}</p><dl className="event-meta"><div><dt>Date</dt><dd>{event.dateLabel}</dd></div><div><dt>Venue</dt><dd>{event.venue}</dd></div></dl><div className="event-card-footer"><strong>{event.ticketType === "free" ? "Free registration" : formatNaira(event.price)}</strong><Link className="text-arrow" href={`/events/${event.slug}`}>{event.ticketType === "free" ? "Register" : "Get tickets"} <span aria-hidden="true">↗</span></Link></div></div>
        </article>)}
      </div>
    </section>
  </PublicPage>;
}
