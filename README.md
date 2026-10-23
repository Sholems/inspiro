# Inspiro Digital Platform

Inspiro's public website and internal operating platform, built as a modular monolith. Phase 0 provides local PostgreSQL, staff authentication, protected routes, code-defined RBAC, audit foundations, error states, and automated checks. The Phase 1 baseline adds a database-backed public website, protected content studio, and transactional enquiry capture.

## Stack

- Next.js 16 App Router and TypeScript
- Tailwind CSS 4
- PostgreSQL and Prisma 7 with the `pg` driver adapter
- Better Auth with email/password, email verification, and password-reset hooks
- Resend for account email delivery

## Local Setup

Prerequisites: Node.js 22 or later, npm, and Docker Desktop.

```powershell
cd apps/web
npm install
npm run setup:local
npm run dev
```

Open http://localhost:3000.

`setup:local` creates an ignored `.env`, starts PostgreSQL on port `55432`, applies migrations, seeds starter website content without overwriting later edits, and provisions the local administrator. Sign in at `/login` using `admin@inspiro.local` and `InspiroLocal2026!`. These credentials are local-only and must never be reused outside development. Content editors work from `/dashboard/content`.

## Checks

```powershell
npm run lint
npm run typecheck
npm run test
npm run build
```

## Product Scope

- Launch foundation: responsive public website, authentication and roles, structured CMS, contacts, organisations, enquiries, projects, tasks, secure files, SEO, and analytics.
- Follow-on: full opportunity pipeline, programme operations, experience bookings, richer reporting, and integrations.
- Explicitly excluded from V1: accounting, payroll, HRMS, procurement ERP, complex inventory, and a full email client.

## Project Notes

- [Architecture](./ARCHITECTURE.md)
- [Setup](./SETUP.md)
- [Database](./DATABASE.md)
- [Permissions](./PERMISSIONS.md)
- [Deployment](./DEPLOYMENT.md)

Public sign-up is disabled. Local administrator provisioning is repeatable through `npm run setup:local`; production staff provisioning remains an administration feature for a later phase. The homepage uses temporary remote photography. Configure approved assets, contact details, production secrets, an email sender, and hosting resources before launch. No production statistics, testimonials, or project outcomes are included.
