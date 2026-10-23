import { prismaAdapter } from "@better-auth/prisma-adapter";
import { betterAuth } from "better-auth";
import { Resend } from "resend";
import { getPrisma } from "@/lib/prisma";

let authInstance: ReturnType<typeof buildAuth> | undefined;

async function sendAuthEmail(to: string, subject: string, url: string, action: string) {
  if (process.env.AUTH_BOOTSTRAP === "true") return;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) {
    throw new Error("RESEND_API_KEY and EMAIL_FROM are required to send account emails.");
  }

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to,
    subject,
    text: `${action}: ${url}`,
  });

  if (result.error) throw new Error(`Account email delivery failed: ${result.error.message}`);
}

function buildAuth() {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret) {
    throw new Error("BETTER_AUTH_SECRET is required for authentication.");
  }

  return betterAuth({
    appName: "Inspiro",
    secret,
    baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
    database: prismaAdapter(getPrisma(), { provider: "postgresql" }),
    rateLimit: {
      enabled: true,
      max: 10,
      window: 60,
    },
    emailAndPassword: {
      enabled: true,
      disableSignUp: process.env.AUTH_BOOTSTRAP !== "true",
      requireEmailVerification: true,
      sendResetPassword: async ({ user, url }) => {
        await sendAuthEmail(user.email, "Reset your Inspiro password", url, "Reset your password");
      },
    },
    user: {
      additionalFields: {
        role: {
          type: "string",
          required: false,
          defaultValue: "STAFF",
          input: false,
        },
        isActive: {
          type: "boolean",
          required: false,
          defaultValue: true,
          input: false,
        },
      },
    },
    emailVerification: {
      sendOnSignUp: true,
      sendVerificationEmail: async ({ user, url }) => {
        await sendAuthEmail(user.email, "Verify your Inspiro email", url, "Verify your email");
      },
    },
  });
}

export function getAuth(): ReturnType<typeof buildAuth> {
  if (!authInstance) authInstance = buildAuth();
  return authInstance;
}
