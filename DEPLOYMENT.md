# Deployment

## Environments

Maintain isolated Development, Staging, and Production environments. Use Vercel for application hosting, PostgreSQL for application data, and Cloudflare for DNS/CDN/security as appropriate to the final deployment design.

## Before Launch

- Set production-only secrets through the hosting provider; never commit them.
- Use a dedicated production database and verify backups and restoration procedures.
- Configure Better Auth's trusted origin and secret, email sender/domain, and private file storage.
- Confirm the production domain, canonical URL, privacy/legal copy, approved media, and real contact details.
- Review access controls, rate limits, private file authorization, and audit logging.
- Run lint, typecheck, tests, and production build in CI before deployment.
- Verify SEO metadata, sitemap/robots behavior, accessibility, performance, and analytics consent/data minimisation.

## Current State

No cloud resources or production deployment are configured. Do not deploy until the actual domain, database, email sender, legal copy, and approved brand assets are supplied.