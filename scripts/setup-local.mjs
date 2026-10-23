import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const envPath = new URL("../.env", import.meta.url);
const defaults = {
  ADMIN_EMAIL: "admin@inspiro.local",
  ADMIN_NAME: "Inspiro Administrator",
  ADMIN_PASSWORD: "InspiroLocal2026!",
  BETTER_AUTH_URL: "http://localhost:3000",
  DATABASE_URL: "postgresql://inspiro:inspiro@localhost:55432/inspiro_dev",
};

if (!existsSync(envPath)) {
  writeFileSync(envPath, [
    `DATABASE_URL=${defaults.DATABASE_URL}`,
    `BETTER_AUTH_SECRET=${randomBytes(32).toString("hex")}`,
    `BETTER_AUTH_URL=${defaults.BETTER_AUTH_URL}`,
    `ADMIN_EMAIL=${defaults.ADMIN_EMAIL}`,
    `ADMIN_PASSWORD=${defaults.ADMIN_PASSWORD}`,
    `ADMIN_NAME=${defaults.ADMIN_NAME}`,
    "NEXT_PUBLIC_SITE_URL=http://localhost:3000",
    "NEXT_PUBLIC_CONTACT_EMAIL=",
    "RESEND_API_KEY=",
    "EMAIL_FROM=",
    "",
  ].join("\n"), { encoding: "utf8", mode: 0o600 });
}

const envText = readFileSync(envPath, "utf8");
if (!/^DATABASE_URL=postgresql:\/\/(?:[^@]+@)?(?:localhost|127\.0\.0\.1):/m.test(envText)) {
  throw new Error("setup:local only runs against a PostgreSQL database on localhost.");
}

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: new URL("..", import.meta.url),
    env: process.env,
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run("docker", ["compose", "up", "-d", "--wait"]);
if (!process.env.npm_execpath) throw new Error("npm_execpath is required to run local setup.");
run(process.execPath, [process.env.npm_execpath, "run", "db:deploy"]);
run(process.execPath, [process.env.npm_execpath, "run", "db:bootstrap"]);
run(process.execPath, [process.env.npm_execpath, "run", "db:seed"]);

console.log("\nLocal preview is ready.");
console.log(`Sign in: ${defaults.ADMIN_EMAIL} / ${defaults.ADMIN_PASSWORD}`);
console.log("Start the app with: npm run dev");
