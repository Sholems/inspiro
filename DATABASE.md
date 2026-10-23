# Database

## Direction

Use PostgreSQL with Prisma. Keep local, staging, and production databases separate. Local setup must never point at production data.

## Planned Core Records

- Identity and access: User, Role, Permission, and role assignments
- Relationships: Contact, Organisation, Tag, and CRMActivity
- Lead intake: Enquiry and its assignment/follow-up history
- Delivery: Project, ProjectMember, Milestone, Task, and TaskComment
- Publishing: Page, Service, WorkItem, Article, CELiveEpisode, TeamMember, and MediaAsset
- Operations: FileRecord, Notification, AuditLog, and SiteSetting

Add programme and experience workflow records as those phases are approved for implementation. Use explicit join models for many-to-many relationships. Use consistent identifiers and timestamps; archive records where retention and legal requirements allow it.

## Required Data Invariants

- Public enquiry submission and matching/creation of related CRM records must be transactional.
- An opportunity's financial value always includes its currency; totals are grouped by currency unless a configured conversion rate exists.
- Private file metadata is not a public asset. Every file download must authorize the requesting user server-side.
- Audit sensitive state transitions without copying unnecessary personal or secret data into logs.

## Local Database and Migrations

The initial Prisma schema contains Better Auth identity/session/account/verification records, the staff role enum, and the audit-log foundation. The initial migration is exercised by `npm run setup:local`. Use `npm run db:migrate` only for development migrations and `npm run db:deploy` for applying committed migrations; never point a developer workstation at production.

Before creating the first migration, provision a local database and review the proposed CRM/project relations against the PRD. Seed only clearly identified demo content; never invent company metrics, testimonials, or project outcomes.
