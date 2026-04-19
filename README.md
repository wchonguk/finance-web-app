# LedgerFlow (Next.js + Azure SQL)

Production-focused finance web app built with Next.js App Router.

## Stack

- Next.js App Router (server components + route handlers)
- Azure SQL via `mssql`
- Managed Identity with `@azure/identity` in Azure
- NextAuth/Auth.js with Microsoft Entra ID
- Zod input validation

## Project structure

```txt
app/
  api/
    auth/[...nextauth]/route.ts
    dashboard/route.ts
    transactions/route.ts
    transactions/[id]/route.ts
    budgets/route.ts
    budgets/[id]/route.ts
  budgets/page.tsx
  login/page.tsx
  transactions/page.tsx
  page.tsx
lib/
  db.ts
  logger.ts
  api.ts
  auth-helpers.ts
  validation.ts
  repositories/
  services/
db/schema.sql
auth.ts
middleware.ts
```

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Run schema in Azure SQL or local SQL Server compatible instance: `db/schema.sql`.
3. Install dependencies and run:

```bash
npm install
npm run dev
```

## Azure deployment notes

- Deploy Next.js app to Azure App Service.
- Use App Settings for all env vars.
- Set `AZURE_SQL_USE_MANAGED_IDENTITY=true` in App Service.
- Grant managed identity SQL access with least privilege (db_datareader + db_datawriter for app schema).
- Build output is standalone (`next.config.mjs`).

## Security

- API routes require authenticated users.
- Data is partitioned by `UserId` on all transactional reads/writes.
- Uses parameterized SQL queries only.
