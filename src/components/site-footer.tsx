import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  return <footer className="site-footer">
    <p className="footer-manifesto">See beyond. Go beyond. <span>Make it happen.</span></p>
    <div className="footer-grid">
      <div className="footer-brand">
        <Link className="brand-logo brand-logo-footer" href="/" aria-label="Inspiro home">
          <Image src="/images/inspiro-lightbulb-wordmark-footer.png" alt="Inspiro — Creative Economy Strategy & Development" width={2176} height={750} />
        </Link>
        <p>Established in 2001, we bring experience across marketing, branding, media, entertainment, events, festivals and creative enterprise development.</p>
      </div>
      <nav className="footer-column" aria-label="Explore">
        <h2>Explore</h2>
        <Link href="/what-we-do">What we do</Link>
        <Link href="/gallery">Photo gallery</Link>
        <Link href="/our-work">Our work</Link>
        <Link href="/about">About Inspiro</Link>
        <Link href="/who-we-work-with">Who we work with</Link>
        <Link href="/how-we-work">How we work</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <nav className="footer-column" aria-label="Focus areas">
        <h2>Focus areas</h2>
        <Link href="/creative-economy">Creative economy</Link>
        <Link href="/experiences">Experiences</Link>
        <Link href="/insights">Insights</Link>
        <Link href="/celive">CE Live</Link>
      </nav>
      <div className="footer-column footer-contact">
        <h2>Start a conversation</h2>
        <p>Lagos, Nigeria<br />Working everywhere</p>
        {contactEmail ? <a href={`mailto:${contactEmail}`}>{contactEmail}</a> : <Link href="/contact">Send an enquiry ↗</Link>}
      </div>
    </div>
    <div className="footer-base"><span>© Inspiro 2026</span><span>Creative Economy Strategy &amp; Development</span><span>See Beyond, Go Beyond, Make It Happen!</span></div>
  </footer>;
}
