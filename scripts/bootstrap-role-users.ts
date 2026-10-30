import "dotenv/config";

import { roles, type Role } from "../src/modules/auth/permissions";

const roleUsers: Array<{ role: Role; email: string; name: string; password: string }> = roles.map((role) => ({
  role,
  email: `test-${role.toLowerCase()}@inspiro.local`,
  name: `Test ${role.replaceAll("_", " ")}`,
  password: `Inspiro${role.replaceAll("_", "")}2026!`,
}));

async function main() {
  if (process.env.NODE_ENV === "production") throw new Error("Role test accounts cannot be created in production.");
  process.env.AUTH_BOOTSTRAP = "true";
  const [{ getAuth }, { getPrisma }] = await Promise.all([import("../src/modules/auth/server"), import("../src/lib/prisma")]);
  const prisma = getPrisma();
  for (const account of roleUsers) {
    let user = await prisma.user.findUnique({ where: { email: account.email } });
    if (!user) {
      const result = await getAuth().api.signUpEmail({ body: { email: account.email, name: account.name, password: account.password } });
      user = await prisma.user.findUnique({ where: { email: result.user.email } });
    }
    if (!user) throw new Error(`Could not create ${account.role} test account.`);
    await prisma.user.update({ where: { id: user.id }, data: { name: account.name, role: account.role, emailVerified: true, isActive: true } });
  }
  console.table(roleUsers.map(({ role, email, password }) => ({ role, email, password })));
  await prisma.$disconnect();
}

main().catch((error: unknown) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
