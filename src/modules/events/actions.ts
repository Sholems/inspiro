"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/prisma";
import { recordAuditEvent } from "@/modules/audit/server";
import { requirePermission } from "@/modules/auth/authorization";

function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

function readEvent(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? title));
  const status = String(formData.get("status") ?? "DRAFT");
  const ticketType = String(formData.get("ticketType") ?? "PAID");
  const price = Number(formData.get("price") ?? 0);
  const date = String(formData.get("date") ?? "");
  if (!title || !slug || !date || !["DRAFT", "PUBLISHED", "ARCHIVED"].includes(status) || !["FREE", "PAID"].includes(ticketType) || !Number.isInteger(price) || price < 0) throw new Error("Complete the event details with a valid ticket type, price and date.");
  return { slug, title, category: String(formData.get("category") ?? "").trim(), summary: String(formData.get("summary") ?? "").trim(), description: String(formData.get("description") ?? "").trim(), image: String(formData.get("image") ?? "").trim(), date: new Date(`${date}T00:00:00.000Z`), time: String(formData.get("time") ?? "").trim(), venue: String(formData.get("venue") ?? "").trim(), address: String(formData.get("address") ?? "").trim(), ticketType: ticketType as "FREE" | "PAID", price: ticketType === "FREE" ? 0 : price, availability: String(formData.get("availability") ?? "").trim(), phone: String(formData.get("phone") ?? "").trim(), whatsapp: String(formData.get("whatsapp") ?? "").trim(), status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED", publishedAt: status === "PUBLISHED" ? new Date() : null };
}

export async function createEvent(formData: FormData) {
  const user = await requirePermission("content.write"); const input = readEvent(formData);
  if (input.status === "PUBLISHED") await requirePermission("content.publish");
  const event = await getPrisma().event.create({ data: input });
  await recordAuditEvent({ actorId: user.id, action: "event.created", entityType: "Event", entityId: event.id, metadata: { status: input.status } });
  revalidatePath("/events"); revalidatePath("/"); revalidatePath("/dashboard/events");
}

export async function updateEvent(formData: FormData) {
  const user = await requirePermission("content.write"); const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Invalid event request.");
  const input = readEvent(formData);
  if (input.status === "PUBLISHED") await requirePermission("content.publish");
  await getPrisma().event.update({ where: { id }, data: input });
  await recordAuditEvent({ actorId: user.id, action: "event.updated", entityType: "Event", entityId: id, metadata: { status: input.status } });
  revalidatePath("/events"); revalidatePath(`/events/${input.slug}`); revalidatePath("/"); revalidatePath("/dashboard/events");
}
