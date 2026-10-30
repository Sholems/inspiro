"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getPrisma } from "@/lib/prisma";
import { requirePermission } from "@/modules/auth/authorization";
import { fulfillPaidOrder, getPublicOrigin, sendTicketConfirmation } from "./server";

export async function initializeTicketOrder(formData: FormData) {
  const slug = String(formData.get("eventSlug") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const quantity = Number(formData.get("quantity") ?? 0);
  if (!slug || !email.includes("@") || !firstName || !lastName || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) throw new Error("Enter your name, a valid email and a quantity between 1 and 10.");
  const event = await getPrisma().event.findFirst({ where: { slug, status: "PUBLISHED" } });
  if (!event) throw new Error("This event is not available.");
  const reference = `INS-${randomUUID().replaceAll("-", "").slice(0, 20).toUpperCase()}`;
  const order = await getPrisma().ticketOrder.create({ data: { reference, eventId: event.id, email, firstName, lastName, quantity, amount: event.price * quantity, status: "PENDING" } });
  if (event.ticketType === "FREE") {
    const fulfilled = await fulfillPaidOrder(order.reference, 0);
    if (fulfilled) await sendTicketConfirmation(fulfilled);
    redirect(`/events/${event.slug}/success?reference=${encodeURIComponent(order.reference)}`);
  }
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) throw new Error("Ticket payments are not configured yet.");
  const response = await fetch("https://api.paystack.co/transaction/initialize", { method: "POST", headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" }, body: JSON.stringify({ email, amount: event.price * quantity * 100, currency: "NGN", reference, callback_url: `${getPublicOrigin()}/api/tickets/callback`, metadata: { eventSlug: event.slug, orderReference: reference, quantity } }) });
  const payload = await response.json() as { status?: boolean; data?: { authorization_url?: string; access_code?: string } };
  if (!response.ok || !payload.status || !payload.data?.authorization_url) {
    await getPrisma().ticketOrder.update({ where: { id: order.id }, data: { status: "FAILED" } });
    throw new Error("We could not start the payment. Please try again.");
  }
  await getPrisma().ticketOrder.update({ where: { id: order.id }, data: { authorizationUrl: payload.data.authorization_url, paystackAccessCode: payload.data.access_code } });
  redirect(payload.data.authorization_url);
}

export type CheckInState = { ok: boolean; message?: string };

export async function checkInTicket(formData: FormData): Promise<CheckInState> {
  await requirePermission("content.write");
  const code = String(formData.get("code") ?? "").trim().toUpperCase();
  if (!code) throw new Error("Ticket code is required.");
  const updated = await getPrisma().ticket.updateMany({ where: { code, status: "VALID" }, data: { status: "USED", usedAt: new Date() } });
  revalidatePath("/dashboard/tickets");
  return updated.count ? { ok: true, message: `Ticket ${code} checked in successfully.` } : { ok: false, message: `No valid ticket found for ${code}. It may be used, cancelled or mistyped.` };
}
