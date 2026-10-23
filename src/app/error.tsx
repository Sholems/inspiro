"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="state-page">
      <p className="eyebrow">Something went wrong</p>
      <h1>We couldn&apos;t load this page.</h1>
      <p>Please try again. If the problem continues, contact the platform administrator.</p>
      <button onClick={reset} type="button">Try again</button>
    </main>
  );
}
