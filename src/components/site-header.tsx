"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const groups = [
  { id: "explore", label: "Explore Inspiro", items: [
    { href: "/what-we-do", label: "What we do", description: "Strategy and development" },
    { href: "/creative-economy", label: "Creative economy", description: "Our perspective" },
    { href: "/who-we-work-with", label: "Who we work with", description: "People and partners" },
    { href: "/how-we-work", label: "How we work", description: "Our approach" },
  ] },
  { id: "discover", label: "Discover", items: [
    { href: "/experiences", label: "Experiences", description: "Platforms and moments" },
    { href: "/gallery", label: "Photo gallery", description: "Inspiro in pictures" },
    { href: "/insights", label: "Insights", description: "Ideas and perspectives" },
    { href: "/celive", label: "CE Live", description: "Creative economy conversations" },
  ] },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => { setMenuOpen(false); setOpenGroup(null); }, [pathname]);
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) { setMenuOpen(false); setOpenGroup(null); }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); setOpenGroup(null); }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("pointerdown", onPointerDown); document.removeEventListener("keydown", onKeyDown); };
  }, []);

  const closeNavigation = () => { setMenuOpen(false); setOpenGroup(null); };

  const renderGroup = (group: typeof groups[number]) => <div className="nav-group" key={group.id}>
    <button className={`nav-trigger${group.items.some((item) => item.href === pathname) ? " nav-trigger-current" : ""}`} type="button" aria-expanded={openGroup === group.id} aria-controls={`nav-panel-${group.id}`} onClick={() => setOpenGroup(openGroup === group.id ? null : group.id)}>
      {group.label}<span className="nav-chevron" aria-hidden="true" />
    </button>
    <div className="nav-panel" id={`nav-panel-${group.id}`} hidden={openGroup !== group.id}>
      <span className="nav-panel-eyebrow">{group.id === "explore" ? "Our world" : "Explore more"}</span>
      {group.items.map((item) => <Link href={item.href} key={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={closeNavigation}><span>{item.label}</span><small>{item.description}</small></Link>)}
    </div>
  </div>;

  return <header className="site-header public-header" ref={headerRef}>
    <Link className="brand-logo brand-logo-header" href="/" aria-label="Inspiro home" onClick={closeNavigation}>
      <Image src="/images/inspiro-lightbulb-logo.png" alt="Inspiro" width={2000} height={750} priority />
    </Link>
    <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => { setMenuOpen(!menuOpen); setOpenGroup(null); }}>
      <span aria-hidden="true">{menuOpen ? "Close" : "Menu"}</span><span className="menu-toggle-icon" aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
    </button>
    <nav className={`main-nav${menuOpen ? " main-nav-open" : ""}`} id="main-navigation" aria-label="Main navigation">
      {renderGroup(groups[0])}
      <Link className="nav-direct" href="/our-work" aria-current={pathname === "/our-work" ? "page" : undefined} onClick={closeNavigation}>Our work</Link>
      {renderGroup(groups[1])}
      <Link className="nav-direct" href="/about" aria-current={pathname === "/about" ? "page" : undefined} onClick={closeNavigation}>About us</Link>
      <Link className="mobile-nav-contact" href="/contact" onClick={closeNavigation}>Let&apos;s talk <span aria-hidden="true">↗</span></Link>
    </nav>
    <Link className="header-cta" href="/contact" onClick={closeNavigation}>Let&apos;s talk <span aria-hidden="true">↗</span></Link>
  </header>;
}
