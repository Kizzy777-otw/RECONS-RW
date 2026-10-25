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

## Configure local admin access

Copy `.env.example` to `.env.local`, set a strong `ADMIN_PASSWORD`, and set `ADMIN_SESSION_SECRET` to a unique random value with at least 32 characters. Also configure `SMS_WEBHOOK_TOKEN` before receiving SMS webhooks. Restart the development server after changing environment variables.

The admin login issues an eight-hour, signed, HttpOnly, SameSite=Strict cookie. This starter intentionally uses one shared password; use an identity provider and individual accounts before production rollout for a team of administrators.

## Project structure

```text
app/
  api/
    admin/login/route.ts
    admin/logout/route.ts
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
  adminAuth.ts
  googleSheets.ts
  mockData.ts
  smsProcessor.ts
types/
  index.ts
```

## Integration notes

- `/api/sms/webhook` accepts a POST JSON body with sender/message fields (`from` or `phoneNumber`/`phone`, and `text` or `message`/`body`) and requires `Authorization: Bearer <SMS_WEBHOOK_TOKEN>`. It validates and acknowledges the payload but does not persist a ticket yet.
- Google Sheets functions intentionally throw until a service-account adapter and secure server-side credentials are configured.
- The public service explorer presents all nine sectors as a 3-by-3 grid of buttons. Selecting a service switches the detailed content panel below the grid. Light/dark mode follows the browser preference on first visit and can be switched with the navigation toggle; the selection is stored in local browser storage.
- Service detail photos are visual preview imagery loaded from Unsplash. Replace them with approved, locally hosted/licensed RECONS project photography before launch.
- The farmer, issue, and contract records are sample data in `lib/mockData.ts`. Admin status changes and contract notes are in-memory demo state; the “Sync Google Sheets” button does not call Google. Connect these operations to a database/Sheets adapter before production use.
- The inquiry form creates a prefilled email with the user's default mail application; it does not submit form data to RECONS until an email/API integration is added.
