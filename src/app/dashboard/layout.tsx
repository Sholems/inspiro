import type { ReactNode } from "react";
import { requirePermission } from "@/modules/auth/authorization";

// Authentication depends on request headers, so this private segment intentionally blocks.
export const instant = false;

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  await requirePermission("dashboard.read");
  return children;
}
