"use server";
import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/prisma";
import { recordAuditEvent } from "@/modules/audit/server";
import { requirePermission } from "@/modules/auth/authorization";
import { isContentKind } from "./content-kind";

export async function updateContent(formData: FormData) {
  const user = await requirePermission("content.write");
  const kind = String(formData.get("kind")); const id = String(formData.get("id"));
  if (!isContentKind(kind) || !id) throw new Error("Invalid content request.");
  const status = String(formData.get("status"));
  if (status === "PUBLISHED") await requirePermission("content.publish");
  if (!(["DRAFT", "PUBLISHED", "ARCHIVED"] as string[]).includes(status)) throw new Error("Invalid status.");
  const title = String(formData.get("title") ?? "").trim(); const summary = String(formData.get("summary") ?? "").trim(); const body = String(formData.get("body") ?? "").trim();
  const prisma = getPrisma();
  if (kind === "pages") await prisma.page.update({ where: { id }, data: { title, summary, body, status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED", publishedAt: status === "PUBLISHED" ? new Date() : null } });
  if (kind === "services") await prisma.service.update({ where: { id }, data: { title, summary, description: body, status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED" } });
  if (kind === "work") await prisma.workItem.update({ where: { id }, data: { title, shortDescription: summary, fullDescription: body, status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED", publishedAt: status === "PUBLISHED" ? new Date() : null } });
  if (kind === "articles") await prisma.article.update({ where: { id }, data: { title, excerpt: summary, body, status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED", publishedAt: status === "PUBLISHED" ? new Date() : null } });
  if (kind === "episodes") await prisma.cELiveEpisode.update({ where: { id }, data: { title, summary, transcript: body, status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED", publishedAt: status === "PUBLISHED" ? new Date() : null } });
  if (kind === "team") await prisma.teamMember.update({ where: { id }, data: { name: title, biography: body, roleTitle: summary, status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED" } });
  await recordAuditEvent({ actorId: user.id, action: "content.updated", entityType: kind, entityId: id, metadata: { status } });
  revalidatePath("/", "layout"); revalidatePath(`/dashboard/content/${kind}`);
}
