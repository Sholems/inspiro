import Link from "next/link";
import { getPrisma } from "@/lib/prisma";
import { requirePermission } from "@/modules/auth/authorization";

export default async function DashboardProgrammesPage() {
  await requirePermission("programmes.manage");
  const events = await getPrisma().event.findMany({ where: { status: { not: "ARCHIVED" } }, orderBy: { date: "asc" }, include: { orders: { where: { status: "PAID" }, select: { quantity: true } } } });
  return <main className="dashboard-content"><p className="eyebrow">Programme management</p><h1>Shape the programme.</h1><p className="dashboard-placeholder">Track the experiences Inspiro is bringing into the world and the audience gathering around each one.</p><div className="programme-grid">{events.length ? events.map((event) => <article className="programme-card" key={event.id}><div><span className="status-pill">{event.status}</span><h2>{event.title}</h2><p>{event.date.toLocaleDateString("en-GB")} · {event.venue}</p></div><strong>{event.orders.reduce((total, order) => total + order.quantity, 0)} <small>tickets</small></strong><Link href={`/dashboard/events#${event.id}`}>Open event ↗</Link></article>) : <p className="empty-state">No programmes yet. Create an event to begin shaping the calendar.</p>}</div><Link className="text-arrow" href="/dashboard/events">Manage events ↗</Link></main>;
}
