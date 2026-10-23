import Link from "next/link";
import { requirePermission } from "@/modules/auth/authorization";
const kinds = [["pages", "Pages"], ["services", "Services"], ["work", "Work"], ["articles", "Insights"], ["episodes", "CE Live"], ["team", "Team"]];
export default async function ContentPage() { await requirePermission("content.read"); return <main className="dashboard-content"><p className="eyebrow">Content studio</p><h1>Publish the public story.</h1><p className="dashboard-placeholder">Edit core website content and control what is visible publicly.</p><div className="content-kinds">{kinds.map(([slug, label]) => <Link href={`/dashboard/content/${slug}`} key={slug}>{label}<span>Open ↗</span></Link>)}</div></main>; }
