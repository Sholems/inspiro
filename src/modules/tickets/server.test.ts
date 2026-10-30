import { createHmac } from "node:crypto";
import { afterEach, describe, expect, it } from "vitest";
import { verifyPaystackSignature } from "./signature";

const originalSecret = process.env.PAYSTACK_SECRET_KEY;

afterEach(() => {
  if (originalSecret === undefined) delete process.env.PAYSTACK_SECRET_KEY;
  else process.env.PAYSTACK_SECRET_KEY = originalSecret;
});

describe("verifyPaystackSignature", () => {
  it("accepts a signature generated from the raw webhook body", () => {
    const body = JSON.stringify({ event: "charge.success", data: { reference: "INS-123" } });
    process.env.PAYSTACK_SECRET_KEY = "test-secret";
    const signature = createHmac("sha512", "test-secret").update(body).digest("hex");

    expect(verifyPaystackSignature(body, signature)).toBe(true);
  });

  it("rejects a missing, malformed, or mismatched signature", () => {
    process.env.PAYSTACK_SECRET_KEY = "test-secret";
    const body = JSON.stringify({ event: "charge.success" });

    expect(verifyPaystackSignature(body, null)).toBe(false);
    expect(verifyPaystackSignature(body, "not-a-paystack-signature")).toBe(false);
    expect(verifyPaystackSignature(body, "0".repeat(128))).toBe(false);
  });

  it("fails closed when the server secret is not configured", () => {
    delete process.env.PAYSTACK_SECRET_KEY;
    expect(verifyPaystackSignature("{}", "anything")).toBe(false);
  });
});
