"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/prisma";
import { requirePermission } from "@/modules/auth/authorization";

const statuses = ["NEW", "ASSIGNED", "CONTACTED", "QUALIFIED", "CONVERTED", "CLOSED"] as const;

export async function updateEnquiryStatus(formData: FormData) {
  await requirePermission("crm.enquiries.write");
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !statuses.includes(status as (typeof statuses)[number])) throw new Error("Invalid enquiry update.");
  await getPrisma().enquiry.update({ where: { id }, data: { status: status as (typeof statuses)[number] } });
  revalidatePath("/dashboard/enquiries");
}
