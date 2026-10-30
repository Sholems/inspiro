import Link from "next/link";
import { getPrisma } from "@/lib/prisma";
import { requirePermission } from "@/modules/auth/authorization";

export default async function DashboardContactsPage() {
  await requirePermission("crm.contacts.read");
  const contacts = await getPrisma().contact.findMany({ orderBy: { updatedAt: "desc" }, include: { enquiries: { orderBy: { createdAt: "desc" }, take: 1 } } });
  return <main className="dashboard-content"><p className="eyebrow">Relationship desk</p><h1>People behind the opportunities.</h1><p className="dashboard-placeholder">A living view of the organisations and people who have started a conversation with Inspiro.</p><div className="dashboard-list-header"><strong>{contacts.length} contacts</strong><span>Recently active first</span></div><div className="contact-list">{contacts.length ? contacts.map((contact) => <article className="contact-card" key={contact.id}><div className="contact-card-avatar" aria-hidden="true">{contact.firstName.slice(0, 1)}{contact.lastName.slice(0, 1)}</div><div className="contact-card-main"><h2>{contact.firstName} {contact.lastName}</h2><p>{contact.organisation || "Independent"}</p><a href={`mailto:${contact.email}`}>{contact.email}</a></div><div className="contact-card-meta"><span>{contact.enquiries.length ? contact.enquiries[0].status : "No enquiry"}</span><small>{contact.phone || "No phone number"}</small></div></article>) : <p className="empty-state">No contacts yet. Website enquiries will appear here automatically.</p>}</div><Link className="text-arrow" href="/contact">Open public contact form ↗</Link></main>;
}
