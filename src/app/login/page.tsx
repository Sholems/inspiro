import type { Metadata } from "next";
import Link from "next/link";
import { SignInForm } from "@/modules/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Staff sign in | Inspiro",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="auth-page">
      <Link className="wordmark auth-wordmark" href="/" aria-label="Inspiro home">
        INSPIRO<span>.</span>
      </Link>
      <section className="auth-panel" aria-labelledby="login-title">
        <p className="eyebrow">Inspiro workspace</p>
        <h1 id="login-title">Welcome<br />back.</h1>
        <p className="auth-intro">Sign in with your staff account to continue.</p>
        <SignInForm />
        <p className="auth-help">Need access? Contact your Inspiro administrator.</p>
      </section>
      <p className="auth-footer">Creative Economy Strategy &amp; Development <span>·</span> Lagos, Nigeria</p>
    </main>
  );
}