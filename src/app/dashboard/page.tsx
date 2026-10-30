import Link from "next/link";
import { getPrisma } from "@/lib/prisma";
import { requireUser } from "@/modules/auth/authorization";

export default async function DashboardPage() {
  const user = await requireUser();
  const prisma = getPrisma();
  const [eventCount, publishedEvents, paidOrders, enquiries] = await Promise.all([
    prisma.event.count(),
    prisma.event.count({ where: { status: "PUBLISHED" } }),
    prisma.ticketOrder.count({ where: { status: "PAID" } }),
    prisma.enquiry.count({ where: { status: "NEW" } }),
  ]);

  return (
    <main className="dashboard-content dashboard-overview">
        <p className="eyebrow">Staff workspace</p>
        <h1>Good to have you back, {user.name.split(" ")[0]}.</h1>
        <p className="dashboard-placeholder">A clear view of the public story, live experiences and the work moving through Inspiro.</p>
        <dl className="dashboard-stat-grid" aria-label="Workspace summary"><div><dt>All events</dt><dd>{eventCount}</dd><small>{publishedEvents} published</small></div><div><dt>Paid orders</dt><dd>{paidOrders}</dd><small>Ticketing activity</small></div><div><dt>New enquiries</dt><dd>{enquiries}</dd><small>Needs attention</small></div></dl>
        <section className="dashboard-quick-actions"><div><p className="eyebrow">Quick actions</p><h2>Move the work forward.</h2></div><div className="dashboard-action-grid"><Link href="/dashboard/content">Edit public content <span>↗</span></Link><Link href="/dashboard/events">Create an event <span>↗</span></Link><Link href="/dashboard/enquiries">Review enquiries <span>↗</span></Link></div></section>
        <section className="dashboard-account-card"><div><p className="eyebrow">Your access</p><h2>{user.role.replaceAll("_", " ")}</h2></div><div><p>{user.email}</p><small>Role-based access is active for this workspace.</small></div></section>
    </main>
  );
}
