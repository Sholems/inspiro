import "server-only";

import { randomBytes } from "node:crypto";
import { Resend } from "resend";
import { getPrisma } from "@/lib/prisma";
import { verifyPaystackSignature } from "./signature";

export { verifyPaystackSignature };

export function getPublicOrigin() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
}

export async function fulfillPaidOrder(reference: string, amountInKobo?: number) {
  const prisma = getPrisma();
  const order = await prisma.ticketOrder.findUnique({ where: { reference }, include: { event: true, tickets: true } });
  if (!order) return null;
  if (amountInKobo !== undefined && amountInKobo !== order.amount * 100) throw new Error("Payment amount does not match the ticket order.");
  if (order.status === "PAID" && order.tickets.length >= order.quantity) return order;
  return prisma.$transaction(async (tx) => {
    const claimed = await tx.ticketOrder.updateMany({ where: { id: order.id, status: "PENDING" }, data: { status: "PAID", paidAt: new Date() } });
    if (!claimed.count) return tx.ticketOrder.findUnique({ where: { id: order.id }, include: { event: true, tickets: true } });
    const updated = await tx.ticketOrder.findUniqueOrThrow({ where: { id: order.id } });
    for (let index = 0; index < order.quantity; index += 1) {
      await tx.ticket.create({ data: { orderId: updated.id, code: `INS-${randomBytes(5).toString("hex").toUpperCase()}` } });
    }
    return tx.ticketOrder.findUnique({ where: { id: updated.id }, include: { event: true, tickets: true } });
  });
}

export async function sendTicketConfirmation(order: NonNullable<Awaited<ReturnType<typeof fulfillPaidOrder>>>) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from || order.status !== "PAID" || order.confirmationSentAt) return;
  const claimed = await getPrisma().ticketOrder.updateMany({ where: { id: order.id, confirmationSentAt: null }, data: { confirmationSentAt: new Date() } });
  if (!claimed.count) return;
  const resend = new Resend(apiKey);
  const result = await resend.emails.send({ from, to: order.email, subject: `Your Inspiro tickets · ${order.event.title}`, text: [`Your place is confirmed for ${order.event.title}.`, `${order.event.date.toISOString().slice(0, 10)} · ${order.event.time}`, `Venue: ${order.event.venue}, ${order.event.address}`, "", "Ticket codes:", ...order.tickets.map((ticket) => ticket.code)].join("\n") });
  if (result.error) console.error("Ticket confirmation email failed", result.error);
}
