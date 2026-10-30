import { NextRequest, NextResponse } from "next/server";
import { fulfillPaidOrder, sendTicketConfirmation } from "@/modules/tickets/server";

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference");
  if (!reference || !process.env.PAYSTACK_SECRET_KEY) return NextResponse.redirect(new URL("/events?payment=unavailable", request.url));
  const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }, cache: "no-store" });
  const payload = await response.json() as { status?: boolean; data?: { status?: string; amount?: number; reference?: string } };
  if (response.ok && payload.status && payload.data?.status === "success" && payload.data.reference === reference) {
    const order = await fulfillPaidOrder(reference, payload.data.amount);
    if (order) { await sendTicketConfirmation(order); return NextResponse.redirect(new URL(`/events/${order.event.slug}/success?reference=${encodeURIComponent(reference)}`, request.url)); }
  }
  return NextResponse.redirect(new URL(`/events?payment=failed&reference=${encodeURIComponent(reference)}`, request.url));
}
