import Link from "next/link";
import { getPrisma } from "@/lib/prisma";
import { requirePermission } from "@/modules/auth/authorization";

export default async function DashboardExperiencesPage() {
  await requirePermission("experiences.manage");
  const events = await getPrisma().event.findMany({ where: { status: "PUBLISHED" }, orderBy: { date: "asc" } });
  return <main className="dashboard-content"><p className="eyebrow">Experiences</p><h1>Make the moment matter.</h1><p className="dashboard-placeholder">A focused view of the public experiences currently available to audiences.</p><div className="experience-admin-grid">{events.length ? events.map((event) => <article className="experience-admin-card" key={event.id}><div className="experience-admin-date"><strong>{event.date.toLocaleDateString("en-GB", { day: "2-digit" })}</strong><span>{event.date.toLocaleDateString("en-GB", { month: "short" })}</span></div><div><h2>{event.title}</h2><p>{event.venue} · {event.time}</p><Link href={`/events/${event.slug}`}>View public experience ↗</Link></div></article>) : <p className="empty-state">No published experiences yet.</p>}</div><Link className="text-arrow" href="/dashboard/events">Plan an experience ↗</Link></main>;
}
