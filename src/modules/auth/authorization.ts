import "server-only";

import { headers } from "next/headers";
import { forbidden, redirect } from "next/navigation";
import { cache } from "react";
import { getAuth } from "./server";
import { can, isRole, type Permission, type Role } from "./permissions";

export type CurrentUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

const getRequiredUser = cache(async (): Promise<CurrentUser> => {
  const session = await getAuth().api.getSession({ headers: await headers() });

  if (!session?.user || !session.user.isActive) redirect("/login");
  const role = session.user.role;
  if (!role || !isRole(role)) forbidden();

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role,
  };
});

export async function requireUser(): Promise<CurrentUser> {
  return getRequiredUser();
}

export async function requirePermission(permission: Permission): Promise<CurrentUser> {
  const user = await requireUser();
  if (!can(user.role, permission)) forbidden();
  return user;
}
