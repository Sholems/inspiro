import { getPrisma } from "@/lib/prisma";
import { requirePermission } from "@/modules/auth/authorization";

export default async function DashboardReportsPage() {
  await requirePermission("reports.read");
  const prisma = getPrisma();
  const [contacts, enquiries, events, orders, paidOrders] = await Promise.all([
    prisma.contact.count(), prisma.enquiry.count(), prisma.event.count(), prisma.ticketOrder.count(), prisma.ticketOrder.count({ where: { status: "PAID" } }),
  ]);
  const statusCounts = await prisma.enquiry.groupBy({ by: ["status"], _count: { _all: true } });
  return <main className="dashboard-content"><p className="eyebrow">Signals &amp; reporting</p><h1>See what is moving.</h1><p className="dashboard-placeholder">A compact operating view of audience interest, enquiries and live experiences.</p><dl className="report-stat-grid"><div><dt>Contacts</dt><dd>{contacts}</dd><small>People in the relationship desk</small></div><div><dt>Enquiries</dt><dd>{enquiries}</dd><small>Inbound conversations</small></div><div><dt>Events</dt><dd>{events}</dd><small>Programmed experiences</small></div><div><dt>Conversion</dt><dd>{orders ? Math.round((paidOrders / orders) * 100) : 0}%</dd><small>Ticket orders paid</small></div></dl><section className="report-panel"><div><p className="eyebrow">Enquiry pipeline</p><h2>Where conversations are today.</h2></div><div className="report-bars">{["NEW", "ASSIGNED", "CONTACTED", "QUALIFIED", "CONVERTED", "CLOSED"].map((status) => { const count = statusCounts.find((item) => item.status === status)?._count._all ?? 0; const max = Math.max(...statusCounts.map((item) => item._count._all), 1); return <div className="report-bar-row" key={status}><span>{status}</span><div><i style={{ width: `${Math.max((count / max) * 100, count ? 8 : 0)}%` }} /></div><strong>{count}</strong></div>; })}</div></section></main>;
}
