"use client";

import { useActionState } from "react";
import { checkInTicket, type CheckInState } from "./actions";

const initialState: CheckInState = { ok: false };

export function CheckInForm() {
  const [state, action, pending] = useActionState(
    (_previousState: CheckInState, formData: FormData) => checkInTicket(formData),
    initialState,
  );
  return <form action={action} className="ticket-checkin"><label>Check in a ticket<input name="code" placeholder="INS-XXXXXXXXXX" autoComplete="off" required /></label><button className="form-submit" disabled={pending}>{pending ? "Checking…" : "Mark as used"}</button>{state.message && <p className={state.ok ? "ticket-feedback ticket-feedback-success" : "ticket-feedback ticket-feedback-error"} role="status">{state.message}</p>}</form>;
}
