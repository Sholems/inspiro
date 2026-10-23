export function getPublicSiteUrl(): URL | null {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return null;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || ["localhost", "127.0.0.1", "::1"].includes(url.hostname)) return null;
    return new URL(url.origin);
  } catch {
    return null;
  }
}
