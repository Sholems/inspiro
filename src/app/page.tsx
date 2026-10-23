import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { galleryImages } from "@/lib/gallery";

const anniversaryCoverage = [
  {
    publication: "The Nation",
    title: "Inspiro @ 25 opens new chapter in Nigeria’s creative economy",
    description: "The Nation covers Inspiro’s 25-year milestone and its new direction in creative economy strategy and development.",
    href: "https://thenationonlineng.net/inspiro-25-opens-new-chapter-in-nigerias-creative-economy/",
  },
  {
    publication: "Vanguard",
    date: "23 September 2026",
    title: "25 years of inspiring creativity: Inspiro opens new chapter in Nigeria’s creative economy",
    description: "Vanguard looks at Inspiro’s move beyond event production into strategy, intellectual property, creative infrastructure and enterprise development.",
    href: "https://www.vanguardngr.com/2026/09/25-years-of-inspiring-creativity-inspiro-opens-new-chapter-in-nigerias-creative-economy/",
  },
];

export default function Home() {
  const capabilities = [
    { number: "01", name: "Creative Strategy & Business Development", detail: "Identify opportunities, structure initiatives and build commercially viable creative ventures." },
    { number: "02", name: "Branding & Marketing", detail: "Position brands, reach audiences and connect businesses with their markets." },
    { number: "03", name: "Talent & Creative Enterprise Development", detail: "Support talent, commercialisation and sustainable creative businesses." },
    { number: "04", name: "Events, Festivals & Experiences", detail: "Conceive and develop cultural programmes and brand experiences." },
    { number: "05", name: "Media, Content & Intellectual Property", detail: "Develop creative properties for audiences, partnerships and monetisation." },
    { number: "06", name: "Partnerships & Market Development", detail: "Connect brands, institutions, creatives and investors." },
  ];

  return (
    <div className="public-site">
      <SiteHeader />
      <main>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-gallery" aria-label="Inspiro creative platforms in pictures">
          <div className="hero-gallery-main"><Image src="/images/gallery/live-ensemble.jpeg" alt="Live ensemble performing on stage" fill sizes="(max-width: 700px) 100vw, 52vw" priority /></div>
          <div className="hero-gallery-jazz"><Image src="/images/gallery/saxophonist.jpeg" alt="Young saxophonist performing on stage" fill sizes="(max-width: 700px) 50vw, 24vw" /></div>
          <div className="hero-gallery-planet"><Image src="/images/gallery/dancers.jpeg" alt="Dancers performing in colourful attire" fill sizes="(max-width: 700px) 50vw, 24vw" /></div>
        </div>
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">Creative economy strategy &amp; development / Lagos</p>
          <h1 id="hero-title">See beyond.<br />Go beyond.<br /><span>Make it happen.</span></h1>
          <div className="hero-bottom"><p>Turning creative potential into economic value.</p><div className="hero-actions"><Link className="hero-primary" href="/what-we-do">Explore what we do <span aria-hidden="true">↗</span></Link><Link className="hero-secondary" href="/our-work">Explore our work <span aria-hidden="true">↗</span></Link></div></div>
        </div>
        <div className="hero-index" aria-hidden="true"><span>INSPIRO</span><span>2001 — 2026</span></div>
      </section>

      <section className="intro-section" id="about" aria-labelledby="intro-title">
        <div className="intro-copy">
          <p className="eyebrow">A new chapter, built on experience</p>
          <h2 id="intro-title">25 years of making creativity happen.</h2>
          <p className="intro-lead">Now we&apos;re building for what comes next.</p>
          <p>We work with businesses, institutions, creatives and partners to transform ideas into practical strategies, compelling experiences, market opportunities and sustainable ventures.</p>
          <Link className="text-arrow" href="/about">Get to know Inspiro <span aria-hidden="true">↗</span></Link>
          <div className="year-mark" aria-label="Established 2001; celebrating 25 years in 2026"><span>2001</span><i /><span>2026</span></div>
        </div>
        <figure className="intro-visual">
          <Image src="/images/gallery/saxophone-ensemble.jpeg" alt="Saxophonist performing with a live ensemble" fill sizes="(max-width: 800px) 100vw, 48vw" />
          <figcaption>Creative expression, made real.</figcaption>
        </figure>
      </section>

      <section className="home-audience" aria-labelledby="home-audience-heading">
        <div><p className="eyebrow">Who we work with</p><h2 id="home-audience-heading">Creative potential lives <em>everywhere.</em></h2></div>
        <div><p>From corporates and public institutions to creators, investors and development partners, we shape work around business growth, economic development, audience engagement and cultural impact.</p><Link className="text-arrow" href="/who-we-work-with">Explore who we work with <span aria-hidden="true">↗</span></Link><Link className="text-arrow" href="/how-we-work">See how we work <span aria-hidden="true">↗</span></Link></div>
      </section>

      <section className="founder-section" aria-labelledby="founder-name">
        <figure className="founder-portrait">
          <Image
            src="/images/ayoola-sadare-traditional.png"
            alt="Ayoola Sadare wearing traditional West African attire"
            fill
            sizes="(max-width: 860px) 100vw, 42vw"
            priority={false}
          />
          <span className="founder-portrait-rule" aria-hidden="true" />
          <figcaption><strong>Ayoola Sadare</strong><span>Founder, Inspiro</span></figcaption>
        </figure>
        <div className="founder-profile">
          <p className="eyebrow">Founder insight</p>
          <header className="founder-heading">
            <h2 id="founder-name">Ayoola Sadare</h2>
            <p>Founder, Inspiro</p>
          </header>
          <div className="founder-biography">
            <p>Ayoola Olusegun Abayomi Sadare, popularly known as Shaddie Bobo, is the founder of INSPIRO. A Nigerian entrepreneur, brands and marketing consultant, events and festivals producer, and advocate for arts and culture, he has spent more than two decades working across creativity, entertainment, marketing and enterprise.</p>
            <p>His vision is to build INSPIRO into an enduring institution that helps transform Africa&apos;s creative potential into sustainable economic value.</p>
          </div>
        </div>
      </section>

      <section className="capabilities-section" id="what-we-do">
        <div className="section-heading" id="creative-economy">
          <p className="eyebrow">What we do</p>
          <h2>Creativity is an<br /><em>economy.</em></h2>
        </div>
        <div className="capability-list">
          {capabilities.map((item) => (
            <article className="capability-row" key={item.number}>
              <span className="capability-number">{item.number}</span>
              <h3>{item.name}</h3>
              <p>{item.detail}</p>
              <span className="capability-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="work-heading">
          <div><p className="eyebrow">Selected work</p><h2>Ideas, out in the world.</h2></div>
          <span className="work-note">A few chapters from a longer story</span>
        </div>
        <div className="work-grid">
          <Link className="work-item work-item-featured" href="/our-work/lagos-international-jazz-festival">
            <div className="work-image jazz-image"><Image src="/images/lagos-jazz-festival.jpg" alt="Ayoola Sadare at the Lagos International Jazz Festival" fill sizes="(max-width: 800px) 100vw, 42vw" /><span className="image-index">01 / MUSIC &amp; CULTURE</span></div>
            <div className="work-caption"><h3>Lagos International<br />Jazz Festival</h3><span aria-hidden="true">↗</span></div>
          </Link>
          <Link className="work-item" href="/our-work/planet-afrobeats">
            <div className="work-image planet-image"><Image src="/images/planet-afrobeats.jpg" alt="Ayoola Sadare on stage wearing a Planet Afrobeats shirt" fill sizes="(max-width: 520px) 100vw, 30vw" /><span className="image-index">02 / CULTURE</span></div>
            <div className="work-caption"><h3>Planet Afrobeats</h3><span aria-hidden="true">↗</span></div>
          </Link>
          <Link className="work-item" href="/our-work/inspiro-creative-hub">
            <div className="work-image hub-image"><strong className="hub-image-title">Inspiro<br />Creative Hub<span aria-hidden="true">↗</span></strong><span className="image-index">03 / PLATFORM</span></div>
            <div className="work-caption"><h3>Inspiro Creative Hub</h3><span aria-hidden="true">↗</span></div>
          </Link>
        </div>
      </section>

      <section className="home-gallery" aria-labelledby="home-gallery-title">
        <div className="home-gallery-heading">
          <div><p className="eyebrow">In pictures</p><h2 id="home-gallery-title">The people.<br /><span>The energy.</span></h2></div>
          <div><p>Creative work comes alive through the people who make it and the communities who experience it.</p><Link className="text-arrow" href="/gallery">View the gallery <span aria-hidden="true">↗</span></Link></div>
        </div>
        <div className="home-gallery-grid">
          {galleryImages.slice(3, 6).map((photo) => <Link className="home-gallery-item" href="/gallery" key={photo.src} aria-label={`View gallery: ${photo.label}`}>
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />
            <span>{photo.label} <span aria-hidden="true">↗</span></span>
          </Link>)}
        </div>
      </section>

      <section className="press-section" id="press" aria-labelledby="press-heading">
        <div className="press-heading">
          <div>
            <p className="eyebrow">Inspiro at 25 / In the press</p>
            <h2 id="press-heading">The next chapter,<br /><em>in the headlines.</em></h2>
          </div>
          <p>Recent coverage of our 25th anniversary and the ideas shaping what comes next.</p>
        </div>
        <div className="press-grid">
          {anniversaryCoverage.map((story, index) => (
            <article className="press-story" key={story.href}>
              <div className="press-story-top"><span>{String(index + 1).padStart(2, "0")}</span><span>{story.publication}{"date" in story && story.date ? <> <span aria-hidden="true">·</span> {story.date}</> : null}</span></div>
              <h3><a href={story.href} target="_blank" rel="noopener noreferrer">{story.title}<span className="press-story-arrow" aria-hidden="true">↗</span></a></h3>
              <p>{story.description}</p>
              <a className="press-story-link" href={story.href} target="_blank" rel="noopener noreferrer">Read on {story.publication} <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-section" id="contact">
        <p className="eyebrow">The next chapter starts here</p>
        <h2>What&apos;s your creative<br />economy <em>strategy?</em></h2>
        <Link className="closing-link" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link>
      </section>

      </main>
      <SiteFooter />
    </div>
  );
}
