"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/prisma";
import { requireUser } from "@/modules/auth/authorization";
import { can } from "@/modules/auth/permissions";

export async function createProject(formData: FormData) {
  const actor = await requireUser();
  if (!can(actor.role, "projects.manage")) throw new Error("You do not have permission to create projects.");
  const name = String(formData.get("name") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  if (!name || !summary) throw new Error("Project name and summary are required.");
  const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now().toString(36)}`;
  await getPrisma().project.create({ data: { name, slug, summary, clientName: String(formData.get("clientName") ?? "").trim() || null, ownerId: actor.id, status: "PLANNING" } });
  revalidatePath("/dashboard/projects");
}

export async function updateProjectTask(formData: FormData) {
  const actor = await requireUser();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !["TODO", "IN_PROGRESS", "BLOCKED", "DONE"].includes(status)) throw new Error("Invalid task update.");
  const task = await getPrisma().projectTask.findUnique({ where: { id } });
  if (!task) throw new Error("Task not found.");
  if (!can(actor.role, "projects.manage") && !(can(actor.role, "projects.assigned.write") && task.assigneeId === actor.id)) throw new Error("You do not have permission to update this task.");
  await getPrisma().projectTask.update({ where: { id }, data: { status: status as "TODO" | "IN_PROGRESS" | "BLOCKED" | "DONE" } });
  revalidatePath("/dashboard/projects");
}

export async function createProjectTask(formData: FormData) {
  const actor = await requireUser();
  if (!can(actor.role, "projects.manage")) throw new Error("You do not have permission to create tasks.");
  const projectId = String(formData.get("projectId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const assigneeId = String(formData.get("assigneeId") ?? "").trim();
  if (!projectId || !title) throw new Error("Project and task title are required.");
  await getPrisma().projectTask.create({ data: { projectId, title, assigneeId: assigneeId || null, status: "TODO" } });
  revalidatePath("/dashboard/projects");
}

export async function updateProjectStatus(formData: FormData) {
  const actor = await requireUser();
  if (!can(actor.role, "projects.manage")) throw new Error("You do not have permission to update projects.");
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !["PLANNING", "ACTIVE", "ON_HOLD", "COMPLETED", "ARCHIVED"].includes(status)) throw new Error("Invalid project update.");
  await getPrisma().project.update({ where: { id }, data: { status: status as "PLANNING" | "ACTIVE" | "ON_HOLD" | "COMPLETED" | "ARCHIVED" } });
  revalidatePath("/dashboard/projects");
}
