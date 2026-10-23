import Link from "next/link";
import { requireUser } from "@/modules/auth/authorization";
import { SignOutButton } from "@/modules/auth/sign-out-button";

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <Link className="wordmark" href="/">INSPIRO<span>.</span></Link>
        <SignOutButton />
      </header>
      <section className="dashboard-content">
        <p className="eyebrow">Staff workspace</p>
        <h1>Good to have you back, {user.name.split(" ")[0]}.</h1>
        <p className="dashboard-placeholder">Phase 0 is ready. Your operational dashboard will take shape here in the next phase.</p>
        <Link className="dashboard-primary-link" href="/dashboard/content">Open content studio ↗</Link>
        <dl className="foundation-status" aria-label="Foundation status">
          <div><dt>Account</dt><dd>{user.email}</dd></div>
          <div><dt>Role</dt><dd>{user.role.replaceAll("_", " ")}</dd></div>
          <div><dt>Access</dt><dd>Server verified</dd></div>
        </dl>
      </section>
    </main>
  );
}
