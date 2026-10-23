import "dotenv/config";

async function main() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("The local bootstrap command cannot run in production.");
  }

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || "Inspiro Administrator";

  if (!email || !password || password.length < 12) {
    throw new Error("ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters are required.");
  }

  process.env.AUTH_BOOTSTRAP = "true";
  const [{ getAuth }, { getPrisma }] = await Promise.all([
    import("../src/modules/auth/server"),
    import("../src/lib/prisma"),
  ]);
  const prisma = getPrisma();
  let user = await prisma.user.findUnique({ where: { email } });
  const wasCreated = !user;

  if (!user) {
    const result = await getAuth().api.signUpEmail({ body: { email, name, password } });
    user = await prisma.user.findUnique({ where: { email: result.user.email } });
  }

  if (!user) throw new Error("The administrator account could not be created.");

  const needsUpdate = wasCreated || user.role !== "SUPER_ADMIN" || !user.emailVerified || !user.isActive || user.name !== name;
  if (needsUpdate) {
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true, isActive: true, name, role: "SUPER_ADMIN" },
    });
    await prisma.auditLog.create({
      data: {
        action: "auth.bootstrap_admin",
        actorId: user.id,
        entityId: user.id,
        entityType: "User",
        metadata: { localDevelopment: true },
      },
    });
  }

  console.log(`Local administrator ready: ${email}`);
  await prisma.$disconnect();
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
