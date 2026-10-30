import Link from "next/link";
import { getPrisma } from "@/lib/prisma";
import { requirePermission } from "@/modules/auth/authorization";
import { updateEnquiryStatus } from "@/modules/enquiries/dashboard-actions";

const stages = ["NEW", "ASSIGNED", "CONTACTED", "QUALIFIED", "CONVERTED", "CLOSED"] as const;

export default async function DashboardPipelinePage() {
  await requirePermission("crm.opportunities.read");
  const enquiries = await getPrisma().enquiry.findMany({ orderBy: { updatedAt: "desc" }, include: { contact: true } });
  return <main className="dashboard-content"><p className="eyebrow">Opportunity pipeline</p><h1>Keep the next move visible.</h1><p className="dashboard-placeholder">Turn conversations into useful next steps. Move an enquiry as the relationship develops.</p><div className="pipeline-board">{stages.map((stage) => { const items = enquiries.filter((enquiry) => enquiry.status === stage); return <section className="pipeline-column" key={stage}><header><span>{stage}</span><strong>{items.length}</strong></header><div className="pipeline-column-items">{items.length ? items.map((enquiry) => <article className="pipeline-card" key={enquiry.id}><h2>{enquiry.contact.firstName} {enquiry.contact.lastName}</h2><p>{enquiry.contact.organisation || "Independent"}</p><small>{enquiry.enquiryType}</small><form action={updateEnquiryStatus}><input type="hidden" name="id" value={enquiry.id} /><select name="status" defaultValue={stage} aria-label={`Move ${enquiry.contact.firstName} ${enquiry.contact.lastName}`}><option value="NEW">New</option><option value="ASSIGNED">Assigned</option><option value="CONTACTED">Contacted</option><option value="QUALIFIED">Qualified</option><option value="CONVERTED">Converted</option><option value="CLOSED">Closed</option></select><button type="submit">Move</button></form></article>) : <p className="pipeline-empty">No conversations</p>}</div></section>; })}</div><Link className="text-arrow" href="/dashboard/enquiries">Open enquiry desk ↗</Link></main>;
}
