const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/weareinspirox", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/weareinspirox", icon: "instagram" },
  { label: "X / Twitter", href: "https://x.com/weareinspirox", icon: "x" },
  { label: "TikTok", href: "https://www.tiktok.com/@weareinspirox", icon: "tiktok" },
] as const;

function SocialIcon({ name }: { name: (typeof socialLinks)[number]["icon"] }) {
  if (name === "facebook") return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 8h3V4h-3c-3.3 0-5 1.9-5 5v3H6v4h3v4h4v-4h3.2l.8-4H13V9c0-.7.3-1 1-1Z" /></svg>;
  if (name === "instagram") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect fill="none" stroke="currentColor" strokeWidth="2" x="3" y="3" width="18" height="18" rx="5" /><circle fill="none" stroke="currentColor" strokeWidth="2" cx="12" cy="12" r="4" /><circle fill="currentColor" cx="17.5" cy="6.5" r="1.2" /></svg>;
  if (name === "x") return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 4h4.2l3.1 4.5L16 4h3l-5.2 6.1L20 20h-4.2l-3.6-5.2L7.6 20h-3l5.4-6.4L5 4Zm3.3 2 7.8 12h.7L9 6h-.7Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.2 4c.2 1.7 1.2 2.8 2.8 3.2v3a7 7 0 0 1-2.8-.8v5.2a5.3 5.3 0 1 1-4.6-5.2v3a2.3 2.3 0 1 0 1.6 2.2V4h3Z" /></svg>;
}

export function SocialLinks({ compact = false }: { compact?: boolean }) {
  return <nav className={compact ? "social-links social-links-compact" : "social-links"} aria-label="Social media">
    {socialLinks.map((social) => <a href={social.href} key={social.label} target="_blank" rel="noreferrer" aria-label={`Inspiro on ${social.label}`}><SocialIcon name={social.icon} /><span className="sr-only">{social.label}</span></a>)}
  </nav>;
}
