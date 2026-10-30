import { getPrisma } from "@/lib/prisma";
import { requirePermission } from "@/modules/auth/authorization";
import { roles } from "@/modules/auth/permissions";
import { updateUserAccess } from "@/modules/auth/user-actions";

export default async function DashboardUsersPage() {
  await requirePermission("users.manage");
  const users = await getPrisma().user.findMany({ orderBy: { createdAt: "asc" } });
  return <main className="dashboard-content"><p className="eyebrow">People &amp; permissions</p><h1>Keep access intentional.</h1><p className="dashboard-placeholder">Manage staff roles and active access to the Inspiro workspace. Changes are recorded in the audit trail.</p><div className="dashboard-list-header"><strong>{users.length} workspace users</strong><span>Access control</span></div><div className="user-list">{users.map((user) => <form className="user-card" action={updateUserAccess} key={user.id}><div className="contact-card-avatar" aria-hidden="true">{user.name.slice(0, 1).toUpperCase()}</div><div className="user-card-main"><h2>{user.name}</h2><p>{user.email}</p><small>Joined {user.createdAt.toLocaleDateString("en-GB")}</small></div><input type="hidden" name="id" value={user.id} /><label>Role<select name="role" defaultValue={user.role}>{roles.map((role) => <option key={role}>{role}</option>)}</select></label><label className="user-active-toggle"><input type="checkbox" name="isActive" defaultChecked={user.isActive} /> Active</label><button className="form-submit" type="submit">Save</button></form>)}</div></main>;
}
