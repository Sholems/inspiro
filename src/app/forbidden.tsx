import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="state-page">
      <p className="eyebrow">Access restricted</p>
      <h1>You don&apos;t have permission to view this area.</h1>
      <p>Your account is active, but its role does not allow this action.</p>
      <Link href="/dashboard">Return to dashboard</Link>
    </main>
  );
}
