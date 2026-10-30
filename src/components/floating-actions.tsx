"use client";

import { useEffect, useState } from "react";

const whatsappHref = "https://wa.me/2348061396417?text=Hello%20Inspiro%2C%20I%27d%20like%20to%20start%20a%20conversation.";

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 560);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return <div className="floating-actions" aria-label="Quick actions">
    <a className="floating-whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Chat with Inspiro on WhatsApp">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.08 0C5.55 0 .24 5.3.24 11.83c0 2.09.55 4.13 1.6 5.92L.14 24l6.4-1.67a11.82 11.82 0 0 0 5.53 1.4h.01c6.52 0 11.83-5.31 11.83-11.83 0-3.16-1.23-6.13-3.41-8.4ZM12.08 21.7h-.01a9.83 9.83 0 0 1-5.02-1.37l-.36-.21-3.8.99 1.01-3.7-.23-.38a9.84 9.84 0 1 1 8.41 4.67Zm5.41-7.37c-.3-.15-1.78-.88-2.05-.98-.28-.1-.47-.15-.67.15-.2.3-.77.98-.94 1.18-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.08-.12-.27-.2-.57-.35Z" /></svg>
      <span>WhatsApp</span>
    </a>
    <button className={`floating-scroll-top${showScrollTop ? " floating-scroll-top-visible" : ""}`} type="button" onClick={scrollToTop} aria-label="Scroll to top" tabIndex={showScrollTop ? 0 : -1}>
      <span aria-hidden="true">↑</span>
    </button>
  </div>;
}
