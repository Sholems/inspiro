import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Space_Grotesk } from "next/font/google";
import { getPublicSiteUrl } from "@/lib/site-url";
import "./globals.css";
import "./culture.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });

const siteUrl = getPublicSiteUrl();
const metadataOrigin = siteUrl ?? new URL("http://localhost:3001");

export const metadata: Metadata = {
  metadataBase: metadataOrigin,
  title: { default: "Inspiro | Creative Economy Strategy & Development", template: "%s | Inspiro" },
  description:
    "INSPIRO is a Nigerian Creative Economy Strategy & Development company turning creative potential into economic value.",
  robots: siteUrl ? undefined : { index: false, follow: false },
  alternates: siteUrl ? { canonical: siteUrl.toString() } : undefined,
  openGraph: { siteName: "Inspiro", type: "website", locale: "en_NG", images: [{ url: "/images/inspiro-social.jpg", width: 1200, height: 630, alt: "Inspiro — Creative Economy Strategy & Development" }] },
  twitter: { card: "summary_large_image", title: "Inspiro | Creative Economy Strategy & Development", description: "Turning creative potential into economic value.", images: ["/images/inspiro-social.jpg"] },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const structuredData = { "@context": "https://schema.org", "@type": "Organization", name: "Inspiro", url: siteUrl?.toString(), description: "Creative Economy Strategy & Development company turning creative potential into economic value.", foundingDate: "2001", founder: { "@type": "Person", name: "Ayoola Olusegun Abayomi Sadare" }, address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" }, sameAs: ["https://www.facebook.com/weareinspirox", "https://www.instagram.com/weareinspirox", "https://x.com/weareinspirox", "https://www.tiktok.com/@weareinspirox"] };
  return <html lang="en" className={`${geistSans.variable} ${spaceGrotesk.variable}`}><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></body></html>;
}
