"use server";

import { getPrisma } from "@/lib/prisma";
import { validateEnquiry, type EnquiryInput } from "./validation";

export type EnquiryState = { success: boolean; message?: string; errors?: ReturnType<typeof validateEnquiry> };

export async function submitEnquiry(_: EnquiryState, data: FormData): Promise<EnquiryState> {
  const input: EnquiryInput = {
    firstName: String(data.get("firstName") ?? ""), lastName: String(data.get("lastName") ?? ""), email: String(data.get("email") ?? "").trim().toLowerCase(), phone: String(data.get("phone") ?? ""), organisation: String(data.get("organisation") ?? ""), enquiryType: String(data.get("enquiryType") ?? ""), message: String(data.get("message") ?? ""), consent: data.get("consent") === "on", website: String(data.get("website") ?? ""),
  };
  const errors = validateEnquiry(input);
  if (Object.keys(errors).length) return { success: false, errors };

  try {
    await getPrisma().$transaction(async tx => {
      const contact = await tx.contact.upsert({ where: { email: input.email }, create: { firstName: input.firstName.trim(), lastName: input.lastName.trim(), email: input.email, phone: input.phone.trim(), organisation: input.organisation.trim() }, update: { firstName: input.firstName.trim(), lastName: input.lastName.trim(), phone: input.phone.trim(), organisation: input.organisation.trim() } });
      const enquiry = await tx.enquiry.create({ data: { contactId: contact.id, enquiryType: input.enquiryType, message: input.message.trim(), consent: true } });
      await tx.cRMActivity.create({ data: { contactId: contact.id, enquiryId: enquiry.id, type: "ENQUIRY_RECEIVED", summary: `New ${input.enquiryType} enquiry received through the website.` } });
      await tx.auditLog.create({ data: { action: "enquiry.created", entityType: "Enquiry", entityId: enquiry.id, metadata: { source: "website", enquiryType: input.enquiryType } } });
    });
    return { success: true, message: "Thank you. Your enquiry is safely with us, and the team will respond soon." };
  } catch (error) {
    console.error("Unable to save website enquiry", error);
    return { success: false, message: "We couldn’t send your enquiry right now. Please try again shortly." };
  }
}
