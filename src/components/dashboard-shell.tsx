"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SignOutButton } from "@/modules/auth/sign-out-button";
import type { CurrentUser } from "@/modules/auth/authorization";
import { can, type Permission } from "@/modules/auth/permissions";

const navItems: Array<{ href: string; label: string; detail: string; permission: Permission }> = [
  { href: "/dashboard", label: "Overview", detail: "Workspace pulse", permission: "dashboard.read" },
  { href: "/dashboard/content", label: "Content studio", detail: "Public story", permission: "content.read" },
  { href: "/dashboard/events", label: "Events", detail: "Create experiences", permission: "content.read" },
  { href: "/dashboard/tickets", label: "Ticketing", detail: "Attendees & check-in", permission: "content.read" },
  { href: "/dashboard/enquiries", label: "Enquiries", detail: "Relationships & leads", permission: "crm.enquiries.read" },
  { href: "/dashboard/pipeline", label: "Pipeline", detail: "Opportunities & next steps", permission: "crm.opportunities.read" },
  { href: "/dashboard/contacts", label: "Contacts", detail: "People & organisations", permission: "crm.contacts.read" },
  { href: "/dashboard/reports", label: "Reports", detail: "Signals & performance", permission: "reports.read" },
  { href: "/dashboard/activity", label: "Activity", detail: "Workspace history", permission: "reports.read" },
  { href: "/dashboard/programmes", label: "Programmes", detail: "Calendar & delivery", permission: "programmes.manage" },
  { href: "/dashboard/experiences", label: "Experiences", detail: "Audience moments", permission: "experiences.manage" },
  { href: "/dashboard/projects", label: "Projects", detail: "Delivery & tasks", permission: "projects.assigned.read" },
  { href: "/dashboard/users", label: "Users", detail: "Roles & access", permission: "users.manage" },
];

export function DashboardShell({ user, children }: { user: CurrentUser; children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = navItems.filter((item) => can(user.role, item.permission));
  return <div className="dashboard-app">
    <aside className={open ? "dashboard-sidebar dashboard-sidebar-open" : "dashboard-sidebar"}>
      <div className="dashboard-brand"><Link href="/dashboard" onClick={() => setOpen(false)}><span className="dashboard-brand-mark">I</span><span>INSPIRO</span></Link><span className="dashboard-brand-label">Studio</span></div>
      <div className="dashboard-user"><span className="dashboard-avatar" aria-hidden="true">{user.name.slice(0, 1).toUpperCase()}</span><div><strong>{user.name}</strong><small>{user.role.replaceAll("_", " ")}</small></div></div>
      <nav className="dashboard-nav" aria-label="Dashboard navigation">
        <p className="dashboard-nav-label">Workspace</p>
        {items.map((item) => <Link className={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href)) ? "dashboard-nav-item dashboard-nav-item-active" : "dashboard-nav-item"} href={item.href} key={item.href} onClick={() => setOpen(false)}><span>{item.label}</span><small>{item.detail}</small></Link>)}
      </nav>
      <div className="dashboard-sidebar-footer"><Link href="/" target="_blank">View public site ↗</Link><SignOutButton /></div>
    </aside>
    <div className="dashboard-main"><header className="dashboard-topbar"><button className="dashboard-menu-toggle" type="button" aria-label="Toggle dashboard navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}><span /><span /><span /></button><div><span className="dashboard-topbar-kicker">Inspiro workspace</span><span className="dashboard-topbar-path"> / {pathname === "/dashboard" ? "Overview" : pathname.split("/").filter(Boolean).slice(-1)[0]?.replaceAll("-", " ")}</span></div><span className="dashboard-topbar-status"><i /> Local workspace</span></header>{children}</div>
  </div>;
}
