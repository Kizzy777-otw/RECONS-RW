# RECONS Rwanda

A Next.js App Router website and admin portal built with TypeScript, Tailwind CSS and Lucide icons.

## Create the project from an empty directory

These commands create the framework starter. This repository already contains the corresponding application source files.

```powershell
npx create-next-app@14 recons-rw --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
cd recons-rw
npm install lucide-react
```

For the checked-in project, install dependencies and start the development server:

```powershell
npm install
npm run dev
```

Use Node.js 20.9.0 or newer (the project is currently built with Node.js 24).

## Configure local admin access

Copy `.env.example` to `.env.local`, set a strong `ADMIN_PASSWORD`, and set `ADMIN_SESSION_SECRET` to a unique random value with at least 32 characters. Also configure `SMS_WEBHOOK_TOKEN` before receiving SMS webhooks. Restart the development server after changing environment variables.

The admin login issues an eight-hour, signed, HttpOnly, SameSite=Strict cookie. This starter intentionally uses one shared password; use an identity provider and individual accounts before production rollout for a team of administrators.

## Configure the admin database

The admin portal uses Supabase PostgreSQL as its source of truth. Create a Supabase project, then apply `supabase/migrations/20261110000000_admin_data.sql` using the Supabase SQL Editor or Supabase CLI. The migration creates farmers, contracts, support issues, and contract notes. It enables row-level security without public policies.

Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` for local development and as server-side environment variables in Vercel. The service-role key bypasses row-level security, so keep it server-only: never prefix it with `NEXT_PUBLIC_`, expose it to browser code, or commit it. The admin page and mutation routes validate the signed admin session before accessing records.

The database starts empty; no sample records are copied into production. Import approved records before expecting the admin tables to show live data. Issue status updates, contract notes, and authenticated SMS webhook messages are persisted to PostgreSQL.

## Salesforce and Google Forms imports

Salesforce and Google Forms are intended as one-way data sources; the Supabase database remains canonical for the admin portal. Provider credentials and approved field mappings are not included, so external imports are not yet enabled.

- Google Forms responses should be read from the form's linked response spreadsheet using a server-side Google service account that has only the required spreadsheet access.
- Salesforce records should be read with a server-side integration user and a narrowly scoped OAuth connection.
- Normalize records into the types and server-only upsert functions in `lib/dataImports.ts`. Imports require stable external IDs; source plus external ID makes retries idempotent. Import farmers before contracts and linked issues.
- Keep provider secrets in Vercel server-side environment variables. Do not send secrets or real farmer data through chat, source control, or client-side code.

Before enabling either connector, confirm the Salesforce objects/fields, Google Form response columns, record ownership, duplicate policy, and permitted data access with the organization. Admin edits currently remain in Supabase and are not synced back to Salesforce or Google.

## Project structure

```text
app/
  api/
    admin/login/route.ts
    admin/logout/route.ts
    admin/issues/[id]/route.ts
    admin/contracts/[contractNumber]/notes/route.ts
    sms/webhook/route.ts
  admin/page.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  admin/AdminTables.tsx
  admin/AdminDashboard.tsx
  admin/AdminLogin.tsx
  Brand.tsx
  ContactForm.tsx
  Footer.tsx
  Navbar.tsx
  ServiceCards.tsx
  ThemeToggle.tsx
lib/
  adminData.ts
  adminDatabase.ts
  adminAuth.ts
  dataImports.ts
  mockData.ts
  smsProcessor.ts
supabase/migrations/
  20261110000000_admin_data.sql
types/
  index.ts
```

## Integration notes

- `/api/sms/webhook` accepts a POST JSON body with sender/message fields (`from` or `phoneNumber`/`phone`, and `text` or `message`/`body`) and requires a bearer token in `Authorization`. Valid messages are persisted as issues; pass a provider message ID in `messageId`, `message_id`, or `id` to make retries idempotent.
- The public service explorer presents all nine sectors as a 3-by-3 grid of buttons. Selecting a service switches the detailed content panel below the grid. Light/dark mode follows the browser preference on first visit and can be switched with the navigation toggle; the selection is stored in local browser storage.
- Service detail photos are visual preview imagery loaded from Unsplash. Replace them with approved, locally hosted/licensed RECONS project photography before launch.
- `lib/mockData.ts` contains prototype fixtures only and is no longer used by the admin portal. Do not import those records into production.
- The inquiry form creates a prefilled email with the user's default mail application; it does not submit form data to RECONS until an email/API integration is added.
