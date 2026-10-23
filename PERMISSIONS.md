# Permissions

## Roles

The initial role set follows the product requirements:

- `SUPER_ADMIN`: full access, user and system administration
- `MANAGEMENT`: company-wide CRM, opportunities, projects, workload, and reports
- `BUSINESS_DEVELOPMENT`: contacts, organisations, enquiries, activities, and opportunities
- `PROJECT_MANAGER`: owned/assigned projects, project teams, tasks, milestones, and project files
- `STAFF`: assigned projects/tasks and permitted collaboration
- `CONTENT_EDITOR`: public content and media publishing
- `PROGRAMME_MANAGER`: programme delivery records (follow-on phase)
- `EXPERIENCES_MANAGER`: experience enquiries and booking records (follow-on phase)

## Authorization Rules

- Use permission names such as `crm.contacts.read`, `crm.contacts.write`, `projects.manage`, and `content.publish`.
- Check authorization in server-side actions, route handlers, and domain services for every protected operation.
- Apply record-level constraints for assigned project and task access; a role alone must not expose unrelated private files or CRM data.
- UI navigation and hidden controls are usability only, never a security boundary.
- Record role changes and other sensitive actions in the audit log.

Phase 0 defines the role enum and permission map in `src/modules/auth/permissions.ts`. Protected server code must call `requireUser` or `requirePermission`; role-aware UI remains usability only. Permission behavior has focused automated tests, and sensitive future mutations must write audit events. Record-level project/file constraints will be added with those domains rather than simulated before their records exist.
