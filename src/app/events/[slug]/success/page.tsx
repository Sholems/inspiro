import type { Metadata } from "next";
import Link from "next/link";
import { getPrisma } from "@/lib/prisma";
import { PublicPage } from "@/components/public-page";

export const metadata: Metadata = { title: "Tickets confirmed" };
export const instant = false;

export default async function TicketSuccessPage({ searchParams }: { searchParams: Promise<{ reference?: string }> }) {
  const reference = (await searchParams).reference;
  const order = reference ? await getPrisma().ticketOrder.findUnique({ where: { reference }, include: { event: true, tickets: true } }) : null;
  return <PublicPage eyebrow="Tickets confirmed" title={order?.status === "PAID" ? "You’re on the list." : "We’re checking your payment."} intro={order ? `${order.event.title} · ${order.event.date.toISOString().slice(0, 10)}` : "Your ticket request has been received."}>
    <section className="ticket-success"><p>{order?.status === "PAID" ? "Your place is confirmed. Keep these ticket codes for entry." : "Your payment is still being verified. If you completed payment, refresh this page in a moment."}</p>{order?.tickets.length ? <ul>{order.tickets.map((ticket) => <li key={ticket.code}><strong>{ticket.code}</strong><span>{order.firstName} {order.lastName}</span></li>)}</ul> : null}<Link className="text-arrow" href="/events">Back to events <span aria-hidden="true">↗</span></Link></section>
  </PublicPage>;
}
