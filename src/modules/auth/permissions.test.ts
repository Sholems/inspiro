import { describe, expect, it } from "vitest";
import { can, isRole } from "./permissions";

describe("role permissions", () => {
  it("gives super administrators every registered permission", () => {
    expect(can("SUPER_ADMIN", "users.manage")).toBe(true);
    expect(can("SUPER_ADMIN", "content.publish")).toBe(true);
  });

  it("keeps staff access limited to assigned delivery work", () => {
    expect(can("STAFF", "projects.assigned.read")).toBe(true);
    expect(can("STAFF", "crm.contacts.read")).toBe(false);
    expect(can("STAFF", "users.manage")).toBe(false);
  });

  it("separates content publishing from CRM management", () => {
    expect(can("CONTENT_EDITOR", "content.publish")).toBe(true);
    expect(can("CONTENT_EDITOR", "crm.contacts.write")).toBe(false);
  });

  it("rejects unknown role strings", () => {
    expect(isRole("SUPER_ADMIN")).toBe(true);
    expect(isRole("OWNER")).toBe(false);
  });
});
