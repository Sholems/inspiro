import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { galleryImages } from "@/lib/gallery";

export const metadata = {
  title: "Gallery | Inspiro",
  description: "A visual collection of performances, people and creative moments from Inspiro's world.",
};

export default function GalleryPage() {
  return <div className="public-site">
    <SiteHeader />
    <main className="gallery-page">
      <header className="gallery-page-intro">
        <Link href="/" className="gallery-back">← Back to home</Link>
        <p className="eyebrow">Inspiro / In pictures</p>
        <h1>Creativity, <span>in motion.</span></h1>
        <p>A collection of performances, people and moments from the creative communities and platforms around Inspiro.</p>
      </header>
      <div className="gallery-collection">
        {galleryImages.map((photo, index) => <figure className={`gallery-card gallery-card-${photo.shape}`} key={photo.src}>
          <a href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full image: ${photo.alt}`}>
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 680px) 100vw, (max-width: 1050px) 50vw, 33vw" />
            <span className="gallery-card-open" aria-hidden="true">↗</span>
          </a>
          <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{photo.label}</figcaption>
        </figure>)}
      </div>
    </main>
    <SiteFooter />
  </div>;
}
