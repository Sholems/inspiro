# Setup

## Requirements

- Node.js 22 or later
- npm
- Docker Desktop for the isolated local PostgreSQL service

## Install and Run

```powershell
cd apps/web
npm install
npm run setup:local
npm run dev
```

The app is served at http://localhost:3000. The setup command creates an ignored `.env`, starts PostgreSQL, applies migrations, and provisions a local administrator. Keep `.env` out of source control.

Local sign-in:

```text
Email: admin@inspiro.local
Password: InspiroLocal2026!
```

These credentials are intentionally limited to local development.

## Environment Configuration

The Docker database listens on host port `55432` to avoid collisions with an existing PostgreSQL installation. `setup:local` refuses non-local database hosts. Configure Resend values to exercise password-reset and verification delivery; the local bootstrap account is marked verified without sending email. Storage, monitoring, and analytics credentials are only needed when their integrations are implemented. Do not put secrets in `NEXT_PUBLIC_*` variables.

## Validation

```powershell
npm run lint
npm run typecheck
npm run test
npm run build
```

## Current Limitations

The homepage, staff login, and protected dashboard are implemented. Public sign-up remains disabled; production user administration is not part of Phase 0. Contact links and remote imagery are temporary; database-backed public forms and business modules begin in Phase 1 and later phases.
