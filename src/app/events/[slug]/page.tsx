import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicPage } from "@/components/public-page";
import { events, formatNaira, getPublicEvent } from "@/lib/events";
import { initializeTicketOrder } from "@/modules/tickets/actions";

export const instant = false;

export function generateStaticParams() { return events.map((event) => ({ slug: event.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const event = await getPublicEvent((await params).slug);
  return event ? { title: event.title, description: event.summary } : { title: "Event" };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const event = await getPublicEvent((await params).slug);
  if (!event) notFound();
  const reservationMessage = encodeURIComponent(`Hello Inspiro, I would like to reserve ${event.title}. Please share payment and ticket confirmation details.`);
  return <PublicPage eyebrow={event.category} title={event.title} intro={event.summary}>
    <section className="event-detail" aria-labelledby="event-details-title">
      <div className="event-detail-poster"><Image src={event.image} alt={`${event.title} poster`} fill sizes="(max-width: 800px) 100vw, 45vw" priority /></div>
      <div className="event-detail-copy"><p className="eyebrow">Event details</p><h2 id="event-details-title">Music. Stories. Africa. Jazz. Always.</h2><p>{event.description}</p><dl className="event-detail-meta"><div><dt>When</dt><dd>{event.dateLabel}<br />{event.time}</dd></div><div><dt>Where</dt><dd>{event.venue}<br />{event.address}</dd></div><div><dt>Tickets</dt><dd>{event.ticketType === "free" ? "Free registration" : `${formatNaira(event.price)} per ticket`}<br /><span>{event.availability}</span></dd></div></dl><form action={initializeTicketOrder} className="ticket-checkout"><input type="hidden" name="eventSlug" value={event.slug} /><p className="eyebrow">{event.ticketType === "free" ? "Reserve a free place" : "Secure checkout"}</p><div className="form-pair"><label>First name<input name="firstName" required autoComplete="given-name" /></label><label>Last name<input name="lastName" required autoComplete="family-name" /></label></div><div className="form-pair"><label>Email<input name="email" type="email" required autoComplete="email" /></label><label>Quantity<input name="quantity" type="number" min="1" max="10" defaultValue="1" required /></label></div><button className="event-primary-action" type="submit">{event.ticketType === "free" ? "Register free" : "Continue to payment"} <span aria-hidden="true">↗</span></button></form><div className="event-actions"><a className="event-secondary-action" href={`https://wa.me/234${event.whatsapp.replace(/^0/, "")}?text=${reservationMessage}`}>WhatsApp {event.whatsapp} <span aria-hidden="true">↗</span></a><a className="event-secondary-action" href={`tel:${event.phone}`}>Call {event.phone}</a></div><p className="event-note">Payments are initialized securely on the server. Your ticket is issued only after payment is verified by Paystack.</p></div>
    </section>
    <section className="story-section event-back"><Link className="text-arrow" href="/events">Back to all events <span aria-hidden="true">↗</span></Link><Link className="text-arrow" href="/contact">Ask about an experience <span aria-hidden="true">↗</span></Link></section>
  </PublicPage>;
}
