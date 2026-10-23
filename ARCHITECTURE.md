# Architecture

## Approach

Start as a modular monolith in one Next.js application. Keep domain logic, validation, permissions, and persistence behind module boundaries. Do not introduce microservices for V1.

## Application Areas

- `src/app`: public routes, dashboard routes, route handlers, and layouts
- `src/components`: shared presentation components
- `src/lib`: cross-cutting configuration, database client, and utilities
- `src/modules/auth`: authentication, users, roles, and permissions
- `src/modules/cms`: pages, services, work, team, Insights, CELive, and media
- `src/modules/crm`: contacts, organisations, enquiries, activities, and opportunities
- `src/modules/projects`: projects, milestones, members, tasks, and comments
- `src/modules/programmes`: programmes, cohorts, applications, participants, and outcomes
- `src/modules/experiences`: experience services, enquiries, and bookings
- `src/modules/files`: private file metadata and authorised storage access
- `src/modules/notifications`: in-app and email notifications
- `src/modules/reports`: operational and management reporting

Each implemented domain should own its schemas/validation, permission checks, business operations, and data access. UI components call domain operations rather than mutating database records directly.

## Request Boundaries

- Render public, read-only content with Server Components where practical.
- Validate every mutation on the server.
- Use Server Actions for application workflows; use Route Handlers for external HTTP boundaries such as public form intake, webhooks, and file operations.
- Use database transactions for multi-record workflows such as contact matching plus enquiry creation.
- Enforce permissions in server-side domain operations. UI visibility is not authorization.
- Keep public media separate from private CRM, project, and programme files.

## Core Relationship Flow

`Enquiry -> Contact / Organisation -> Opportunity -> Project or Programme -> Tasks / Delivery -> Relationship history`

The same person and organisation records should be reused across these workflows.

## Current State

Phase 0 is implemented: the application shell and homepage, Docker-backed local PostgreSQL, committed Prisma migration, Better Auth routes and email hooks, repeatable local administrator bootstrap, staff login, protected dashboard, server-side permission checks, audit-log foundation, shared error/loading states, and test tooling. CMS/CRM/project modules remain to be built. Programme operations, full experience booking, advanced reporting, and integrations remain follow-on work.
