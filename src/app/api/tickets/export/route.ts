import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { requirePermission } from "@/modules/auth/authorization";

export async function GET(request: Request) {
  await requirePermission("content.read");
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.trim() ?? "";
  const statusValue = url.searchParams.get("status") ?? "";
  const status = ["PENDING", "PAID", "FAILED", "CANCELLED"].includes(statusValue) ? statusValue as "PENDING" | "PAID" | "FAILED" | "CANCELLED" : undefined;
  const orders = await getPrisma().ticketOrder.findMany({ where: { ...(status ? { status } : {}), ...(query ? { OR: [{ reference: { contains: query, mode: "insensitive" } }, { email: { contains: query, mode: "insensitive" } }, { firstName: { contains: query, mode: "insensitive" } }, { lastName: { contains: query, mode: "insensitive" } }] } : {}) }, orderBy: { createdAt: "desc" }, include: { event: true, tickets: true } });
  const escape = (value: string | number) => `"${String(value).replaceAll('"', '""')}"`;
  const rows = [["Reference", "Event", "Attendee", "Email", "Quantity", "Amount NGN", "Order status", "Ticket codes", "Created"], ...orders.map((order) => [order.reference, order.event.title, `${order.firstName} ${order.lastName}`, order.email, order.quantity, order.amount, order.status, order.tickets.map((ticket) => `${ticket.code} (${ticket.status})`).join("; "), order.createdAt.toISOString()])];
  const csv = rows.map((row) => row.map(escape).join(",")).join("\r\n");
  return new NextResponse(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="inspiro-ticket-orders-${new Date().toISOString().slice(0, 10)}.csv"` } });
}
