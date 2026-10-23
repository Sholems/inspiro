export type EnquiryInput = { firstName: string; lastName: string; email: string; phone: string; organisation: string; enquiryType: string; message: string; consent: boolean; website?: string };
export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (input.website) errors.website = "Unable to submit this form.";
  if (input.firstName.trim().length < 2) errors.firstName = "Enter your first name.";
  else if (input.firstName.trim().length > 100) errors.firstName = "Use 100 characters or fewer.";
  if (input.lastName.trim().length < 2) errors.lastName = "Enter your last name.";
  else if (input.lastName.trim().length > 100) errors.lastName = "Use 100 characters or fewer.";
  if (input.email.length > 254 || !/^\S+@\S+\.\S+$/.test(input.email)) errors.email = "Enter a valid email address.";
  if (input.phone.trim().length < 7) errors.phone = "Enter a valid phone number.";
  else if (input.phone.trim().length > 40) errors.phone = "Use 40 characters or fewer.";
  if (input.organisation.trim().length < 2) errors.organisation = "Enter your organisation.";
  else if (input.organisation.trim().length > 150) errors.organisation = "Use 150 characters or fewer.";
  if (!["Creative economy strategy", "Programme or experience", "Partnership", "Speaking or media", "Something else"].includes(input.enquiryType)) errors.enquiryType = "Choose an enquiry type.";
  if (input.message.trim().length < 20) errors.message = "Tell us a little more (at least 20 characters).";
  else if (input.message.trim().length > 5000) errors.message = "Use 5,000 characters or fewer.";
  if (!input.consent) errors.consent = "Consent is required so we can respond.";
  return errors;
}
