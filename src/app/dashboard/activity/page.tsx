import { getPrisma } from "@/lib/prisma";
import { requirePermission } from "@/modules/auth/authorization";

export default async function DashboardActivityPage() {
  await requirePermission("reports.read");
  const activity = await getPrisma().auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 80, include: { actor: true } });
  return <main className="dashboard-content"><p className="eyebrow">Workspace history</p><h1>Know what changed.</h1><p className="dashboard-placeholder">A transparent record of important actions across the Inspiro workspace.</p><div className="activity-list">{activity.length ? activity.map((entry) => <article className="activity-row" key={entry.id}><span className="activity-dot" aria-hidden="true" /><div><strong>{entry.action.replaceAll(".", " · ")}</strong><p>{entry.actor?.name || "System"} {entry.entityType ? `· ${entry.entityType}` : ""}</p></div><time dateTime={entry.createdAt.toISOString()}>{entry.createdAt.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</time></article>) : <p className="empty-state">Workspace activity will appear here as the team works.</p>}</div></main>;
}
