import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function PublicPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children?: ReactNode }) {
  return <div className="public-site"><SiteHeader /><main className="public-page"><header className="public-hero"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></header>{children}</main><SiteFooter /></div>;
}
