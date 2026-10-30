import Link from "next/link";
import { getPrisma } from "@/lib/prisma";
import { requirePermission } from "@/modules/auth/authorization";
import { updateEnquiryStatus } from "@/modules/enquiries/dashboard-actions";

export default async function DashboardEnquiriesPage() {
  const user = await requirePermission("crm.enquiries.read");
  const enquiries = await getPrisma().enquiry.findMany({ orderBy: { createdAt: "desc" }, include: { contact: true } });
  const canUpdate = ["SUPER_ADMIN", "MANAGEMENT", "BUSINESS_DEVELOPMENT"].includes(user.role);
  return <main className="dashboard-content"><p className="eyebrow">Relationship desk</p><h1>Conversations with momentum.</h1><p className="dashboard-placeholder">Review inbound enquiries, understand the opportunity and keep the next step visible.</p><div className="dashboard-list-header"><strong>{enquiries.length} enquiries</strong><span>Newest first</span></div><div className="enquiry-list">{enquiries.length ? enquiries.map((enquiry) => <article className="enquiry-card" key={enquiry.id}><div><p className="eyebrow">{enquiry.enquiryType} · {enquiry.createdAt.toLocaleDateString("en-GB")}</p><h2>{enquiry.contact.firstName} {enquiry.contact.lastName}</h2><p>{enquiry.contact.organisation || "Independent enquiry"} · {enquiry.contact.email}</p><blockquote>{enquiry.message}</blockquote></div>{canUpdate ? <form action={updateEnquiryStatus}><input type="hidden" name="id" value={enquiry.id} /><label>Status<select name="status" defaultValue={enquiry.status}>{["NEW", "ASSIGNED", "CONTACTED", "QUALIFIED", "CONVERTED", "CLOSED"].map((status) => <option key={status}>{status}</option>)}</select></label><button className="form-submit" type="submit">Save status</button></form> : <span className="status-pill">{enquiry.status}</span>}</article>) : <p className="empty-state">No enquiries yet. New conversations from the public site will appear here.</p>}</div><Link className="text-arrow" href="/contact">View public contact page ↗</Link></main>;
}
