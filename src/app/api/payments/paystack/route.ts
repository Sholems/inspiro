import { NextRequest, NextResponse } from "next/server";
import { fulfillPaidOrder, sendTicketConfirmation, verifyPaystackSignature } from "@/modules/tickets/server";

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  if (!verifyPaystackSignature(rawBody, request.headers.get("x-paystack-signature"))) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  const payload = JSON.parse(rawBody) as { event?: string; data?: { reference?: string; amount?: number; status?: string } };
  if (payload.event === "charge.success" && payload.data?.reference && payload.data.status === "success") {
    const order = await fulfillPaidOrder(payload.data.reference, payload.data.amount);
    if (order) await sendTicketConfirmation(order);
  }
  return NextResponse.json({ received: true });
}
