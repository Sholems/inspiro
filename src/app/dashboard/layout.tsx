import type { ReactNode } from "react";
import { requirePermission } from "@/modules/auth/authorization";
import { requireUser } from "@/modules/auth/authorization";
import { DashboardShell } from "@/components/dashboard-shell";

// Authentication depends on request headers, so this private segment intentionally blocks.
export const instant = false;

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  await requirePermission("dashboard.read");
  const user = await requireUser();
  return <DashboardShell user={user}>{children}</DashboardShell>;
}
