import type { MetadataRoute } from "next";
import { getPublicSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getPublicSiteUrl();
  if (!siteUrl) return { rules: { userAgent: "*", disallow: "/" } };

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/dashboard/", "/login/"] },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
