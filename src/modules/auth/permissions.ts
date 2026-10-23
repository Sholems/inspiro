export const roles = [
  "SUPER_ADMIN",
  "MANAGEMENT",
  "BUSINESS_DEVELOPMENT",
  "PROJECT_MANAGER",
  "STAFF",
  "CONTENT_EDITOR",
  "PROGRAMME_MANAGER",
  "EXPERIENCES_MANAGER",
] as const;

export type Role = (typeof roles)[number];

export const permissions = [
  "dashboard.read",
  "users.manage",
  "settings.manage",
  "reports.read",
  "crm.contacts.read",
  "crm.contacts.write",
  "crm.organisations.read",
  "crm.organisations.write",
  "crm.enquiries.read",
  "crm.enquiries.write",
  "crm.opportunities.read",
  "crm.opportunities.write",
  "projects.all.read",
  "projects.manage",
  "projects.assigned.read",
  "projects.assigned.write",
  "content.read",
  "content.write",
  "content.publish",
  "programmes.manage",
  "experiences.manage",
] as const;

export type Permission = (typeof permissions)[number];

const everyPermission = new Set<Permission>(permissions);

const permissionMap: Record<Role, ReadonlySet<Permission>> = {
  SUPER_ADMIN: everyPermission,
  MANAGEMENT: new Set([
    "dashboard.read", "reports.read", "crm.contacts.read", "crm.organisations.read",
    "crm.enquiries.read", "crm.opportunities.read", "crm.opportunities.write",
    "projects.all.read", "projects.manage", "programmes.manage",
  ]),
  BUSINESS_DEVELOPMENT: new Set([
    "dashboard.read", "crm.contacts.read", "crm.contacts.write",
    "crm.organisations.read", "crm.organisations.write", "crm.enquiries.read",
    "crm.enquiries.write", "crm.opportunities.read", "crm.opportunities.write",
  ]),
  PROJECT_MANAGER: new Set([
    "dashboard.read", "crm.contacts.read", "crm.organisations.read",
    "projects.all.read", "projects.manage",
  ]),
  STAFF: new Set(["dashboard.read", "projects.assigned.read", "projects.assigned.write"]),
  CONTENT_EDITOR: new Set(["dashboard.read", "content.read", "content.write", "content.publish"]),
  PROGRAMME_MANAGER: new Set([
    "dashboard.read", "crm.contacts.read", "crm.organisations.read", "programmes.manage",
  ]),
  EXPERIENCES_MANAGER: new Set([
    "dashboard.read", "crm.contacts.read", "crm.organisations.read", "experiences.manage",
  ]),
};

export function isRole(value: string): value is Role {
  return roles.includes(value as Role);
}

export function can(role: Role, permission: Permission): boolean {
  return permissionMap[role].has(permission);
}
