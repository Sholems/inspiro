"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryState } from "./actions";

const initialState: EnquiryState = { success: false };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitEnquiry, initialState);

  if (state.success) {
    return <div className="form-success" role="status"><h2>Conversation started.</h2><p>{state.message}</p></div>;
  }

  return <form className="contact-form" action={action} noValidate>
    {state.message && <p className="form-error" role="alert">{state.message}</p>}
    <div className="form-pair">
      <Field name="firstName" label="First name" maxLength={100} autoComplete="given-name" error={state.errors?.firstName} />
      <Field name="lastName" label="Last name" maxLength={100} autoComplete="family-name" error={state.errors?.lastName} />
    </div>
    <div className="form-pair">
      <Field name="email" label="Email" type="email" maxLength={254} autoComplete="email" error={state.errors?.email} />
      <Field name="phone" label="Phone" type="tel" maxLength={40} autoComplete="tel" error={state.errors?.phone} />
    </div>
    <Field name="organisation" label="Organisation" maxLength={150} autoComplete="organization" error={state.errors?.organisation} />
    <label htmlFor="enquiryType">What would you like to discuss?
      <select id="enquiryType" name="enquiryType" defaultValue="" required aria-invalid={Boolean(state.errors?.enquiryType)} aria-describedby={state.errors?.enquiryType ? "enquiryType-error" : undefined}>
        <option value="" disabled>Select one</option>
        <option>Creative economy strategy</option><option>Programme or experience</option><option>Partnership</option><option>Speaking or media</option><option>Something else</option>
      </select>
      {state.errors?.enquiryType && <small id="enquiryType-error">{state.errors.enquiryType}</small>}
    </label>
    <label htmlFor="message">Tell us about it
      <textarea id="message" name="message" rows={6} maxLength={5000} required aria-invalid={Boolean(state.errors?.message)} aria-describedby={state.errors?.message ? "message-error" : undefined} />
      {state.errors?.message && <small id="message-error">{state.errors.message}</small>}
    </label>
    <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <label className="consent" htmlFor="consent"><input id="consent" type="checkbox" name="consent" required aria-invalid={Boolean(state.errors?.consent)} aria-describedby={state.errors?.consent ? "consent-error" : undefined} /> I agree that Inspiro may use these details to respond to my enquiry.</label>
    {state.errors?.consent && <small id="consent-error">{state.errors.consent}</small>}
    <button className="form-submit" type="submit" disabled={pending}>{pending ? "Sending…" : "Send enquiry ↗"}</button>
  </form>;
}

function Field({ name, label, type = "text", maxLength, autoComplete, error }: { name: string; label: string; type?: string; maxLength: number; autoComplete: string; error?: string }) {
  return <label htmlFor={name}>{label}
    <input id={name} name={name} type={type} maxLength={maxLength} autoComplete={autoComplete} required aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} />
    {error && <small id={`${name}-error`}>{error}</small>}
  </label>;
}
