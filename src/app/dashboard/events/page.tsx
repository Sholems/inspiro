import Link from "next/link";
import { getPrisma } from "@/lib/prisma";
import { requirePermission } from "@/modules/auth/authorization";
import { createEvent, updateEvent } from "@/modules/events/actions";

function dateValue(date: Date) { return date.toISOString().slice(0, 10); }

function EventFields({ event }: { event?: { id: string; slug: string; title: string; category: string; summary: string; description: string; image: string; date: Date; time: string; venue: string; address: string; ticketType: string; price: number; availability: string; phone: string; whatsapp: string; status: string } }) {
  return <>
    {event && <input type="hidden" name="id" value={event.id} />}
    <div className="form-pair"><label>Title<input name="title" defaultValue={event?.title} required /></label><label>Slug<input name="slug" defaultValue={event?.slug} placeholder="event-name" /></label></div>
    <div className="form-pair"><label>Category<input name="category" defaultValue={event?.category} required /></label><label>Image URL<input name="image" defaultValue={event?.image} placeholder="/images/events/poster.jpeg" required /></label></div>
    <label>Short summary<input name="summary" defaultValue={event?.summary} required /></label><label>Description<textarea name="description" defaultValue={event?.description} required rows={4} /></label>
    <div className="form-pair"><label>Date<input name="date" type="date" defaultValue={event ? dateValue(event.date) : undefined} required /></label><label>Time<input name="time" defaultValue={event?.time} placeholder="6:00 PM" required /></label></div>
    <div className="form-pair"><label>Venue<input name="venue" defaultValue={event?.venue} required /></label><label>Address<input name="address" defaultValue={event?.address} required /></label></div>
    <div className="form-pair"><label>Ticket type<select name="ticketType" defaultValue={event?.ticketType ?? "PAID"}><option value="PAID">Paid</option><option value="FREE">Free</option></select></label><label>Price (NGN)<input name="price" type="number" min="0" step="100" defaultValue={event?.price ?? 0} /></label></div>
    <div className="form-pair"><label>Availability<input name="availability" defaultValue={event?.availability} placeholder="Limited seats available" required /></label><label>Phone<input name="phone" defaultValue={event?.phone} required /></label></div>
    <label>WhatsApp number<input name="whatsapp" defaultValue={event?.whatsapp ?? "08061396417"} required /></label><label>Status<select name="status" defaultValue={event?.status ?? "DRAFT"}><option>DRAFT</option><option>PUBLISHED</option><option>ARCHIVED</option></select></label>
  </>;
}

export default async function DashboardEventsPage() {
  await requirePermission("content.read");
  const events = await getPrisma().event.findMany({ orderBy: { date: "asc" }, include: { orders: { select: { quantity: true, amount: true, status: true } } } });
  return <main className="dashboard-content"><Link href="/dashboard/content">← Content studio</Link><p className="eyebrow">Events &amp; tickets</p><h1>Build the room.</h1><p className="dashboard-placeholder">Create free or paid public events. Publishing makes an event appear on the website.</p><form action={createEvent} className="content-editor event-editor"><h2>Add an event</h2><EventFields /><button className="form-submit">Create event</button></form><section className="content-editor-list"><div className="event-list-heading"><div><p className="eyebrow">Inventory and publishing</p><h2>Existing events</h2></div><Link className="dashboard-outline-link" href="/dashboard/tickets">View ticket orders ↗</Link></div>{events.length ? events.map((event) => { const paidOrders = event.orders.filter((order) => order.status === "PAID"); const tickets = paidOrders.reduce((total, order) => total + order.quantity, 0); const revenue = paidOrders.reduce((total, order) => total + order.amount, 0); return <form action={updateEvent} className="content-editor event-editor" key={event.id}><div className="event-record-header"><div><p className="eyebrow">{event.status} · {event.date.toLocaleDateString("en-GB")}</p><h2>{event.title}</h2></div><dl className="event-record-stats"><div><dt>Tickets</dt><dd>{tickets}</dd></div><div><dt>Revenue</dt><dd>₦{revenue.toLocaleString("en-NG")}</dd></div></dl></div><EventFields event={event} /><button className="form-submit">Save event</button></form>; }) : <p className="empty-state">No events yet. Create the first event above.</p>}</section></main>;
}
