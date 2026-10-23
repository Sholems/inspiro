"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      });

      if (result.error) {
        setError("We couldn’t sign you in. Check your details or contact your administrator.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("We couldn’t sign you in. Check your details or contact your administrator.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <label htmlFor="email">Work email</label>
      <input
        autoComplete="username"
        id="email"
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        required
        type="email"
        value={email}
      />

      <label htmlFor="password">Password</label>
      <input
        autoComplete="current-password"
        id="password"
        name="password"
        onChange={(event) => setPassword(event.target.value)}
        required
        type="password"
        value={password}
      />

      {error ? <p className="sign-in-error" role="alert">{error}</p> : null}

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Signing in…" : "Sign in"}
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
