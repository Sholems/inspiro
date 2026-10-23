import { notFound } from "next/navigation";
import Link from "next/link";
import { getPrisma } from "@/lib/prisma";
import { requirePermission } from "@/modules/auth/authorization";
import { updateContent } from "@/modules/cms/actions";
import { isContentKind } from "@/modules/cms/content-kind";

type Item = { id: string; title: string; summary: string; body: string; status: string; slug: string };
export const instant = false;
export default async function ContentKindPage({ params }: { params: Promise<{ kind: string }> }) {
  await requirePermission("content.read"); const { kind } = await params; if (!isContentKind(kind)) notFound(); const prisma = getPrisma(); let items: Item[] = [];
  if (kind === "pages") items = (await prisma.page.findMany({ orderBy: { title: "asc" } })).map(x => ({ ...x, summary: x.summary, body: x.body }));
  if (kind === "services") items = (await prisma.service.findMany({ orderBy: { sortOrder: "asc" } })).map(x => ({ ...x, body: x.description }));
  if (kind === "work") items = (await prisma.workItem.findMany({ orderBy: { title: "asc" } })).map(x => ({ ...x, summary: x.shortDescription, body: x.fullDescription }));
  if (kind === "articles") items = (await prisma.article.findMany({ orderBy: { title: "asc" } })).map(x => ({ ...x, summary: x.excerpt, body: x.body }));
  if (kind === "episodes") items = (await prisma.cELiveEpisode.findMany({ orderBy: { title: "asc" } })).map(x => ({ ...x, body: x.transcript ?? "" }));
  if (kind === "team") items = (await prisma.teamMember.findMany({ orderBy: { sortOrder: "asc" } })).map(x => ({ ...x, title: x.name, summary: x.roleTitle, body: x.biography }));
  return <main className="dashboard-content"><Link href="/dashboard/content">← Content studio</Link><p className="eyebrow">{kind}</p><h1>Edit and publish.</h1><div className="content-editor-list">{items.map(item => <form action={updateContent} className="content-editor" key={item.id}><input type="hidden" name="kind" value={kind} /><input type="hidden" name="id" value={item.id} /><label>Title<input name="title" defaultValue={item.title} required /></label><label>Summary<input name="summary" defaultValue={item.summary} required /></label><label>Body<textarea name="body" defaultValue={item.body} rows={7} required /></label><label>Status<select name="status" defaultValue={item.status}><option>DRAFT</option><option>PUBLISHED</option><option>ARCHIVED</option></select></label><button className="form-submit">Save changes</button><small>/{item.slug}</small></form>)}</div></main>;
}
