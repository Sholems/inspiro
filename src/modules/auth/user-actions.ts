"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/prisma";
import { requirePermission } from "./authorization";
import { isRole, type Role } from "./permissions";

export async function updateUserAccess(formData: FormData) {
  const actor = await requirePermission("users.manage");
  const id = String(formData.get("id") ?? "");
  const role = String(formData.get("role") ?? "");
  const isActive = formData.get("isActive") === "on";
  if (!id || !isRole(role)) throw new Error("Invalid user access update.");
  if (id === actor.id && !isActive) throw new Error("You cannot deactivate your own account.");
  const prisma = getPrisma();
  await prisma.user.update({ where: { id }, data: { role: role as Role, isActive } });
  await prisma.auditLog.create({ data: { actorId: actor.id, action: "auth.user_access_updated", entityType: "User", entityId: id, metadata: { role, isActive } } });
  revalidatePath("/dashboard/users");
}
