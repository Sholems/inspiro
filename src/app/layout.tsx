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

export const metadata: Metadata = {
  metadataBase: siteUrl ?? undefined,
  title: { default: "Inspiro | Creative Economy Strategy & Development", template: "%s | Inspiro" },
  description:
    "INSPIRO is a Nigerian Creative Economy Strategy & Development company turning creative potential into economic value.",
  robots: siteUrl ? undefined : { index: false, follow: false },
  openGraph: { siteName: "Inspiro", type: "website", locale: "en_NG" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" className={`${geistSans.variable} ${spaceGrotesk.variable}`}><body>{children}</body></html>;
}
