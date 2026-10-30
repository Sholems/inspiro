import Link from "next/link";

export default function NotFound() {
  return <main className="not-found-page"><p className="eyebrow">Inspiro / 404</p><h1>That page moved<br />somewhere else.</h1><p>We could not find the page you requested.</p><Link className="text-arrow" href="/">Return to the homepage <span aria-hidden="true">↗</span></Link></main>;
}
