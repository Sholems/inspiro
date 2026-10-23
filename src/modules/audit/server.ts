import "server-only";

import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/lib/prisma";

type AuditEvent = {
  action: string;
  actorId?: string;
  entityId?: string;
  entityType: string;
  ipAddress?: string;
  metadata?: Prisma.InputJsonValue;
};

export async function recordAuditEvent(event: AuditEvent): Promise<void> {
  await getPrisma().auditLog.create({ data: event });
}
