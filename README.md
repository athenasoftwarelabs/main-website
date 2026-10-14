# Athena Software Labs — Website

Company website for Athena Software Labs, an IT company in Nepal. It has four pages: **Home**, **Services**, **About** and **Contact**.

**Stack:** Next.js 16 (App Router, Turbopack, Cache Components) · React 19 · Tailwind CSS v4 · shadcn/ui (Radix, "nova" preset) · Motion · react-hook-form + Zod · Sonner.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages prerender as static)
npm run start    # serve the production build
npm run lint
```

## Editing content

All copy lives in `src/data/`, so you can change text without touching components:

| File | What it controls |
| --- | --- |
| `src/data/site.ts` | Company name, contact details (email and social links are **placeholders**), nav, home-page stats |
| `src/data/services.ts` | Services list (cards, Services page, footer, contact-form dropdown) |
| `src/data/lms-features.ts` | LMS tabs on Home and the module grid on Services |
| `src/data/team.ts` | Team members on About |
| `src/data/faqs.ts` | FAQ on Services |

The brand assets are in `public/brand/` (logo mark plus light and dark wordmarks). The favicon is `src/app/icon.svg`.

## Theme & colors

- Brand colors are defined as CSS variables in `src/app/globals.css`, under `:root` for light and `.dark` for dark. They come from the logo palette: blue `#047DFC`, teal `#10CFC7`, ocean `#0A8DD4`.
- Utilities: `bg-brand-gradient`, `text-gradient`, `bg-grid`, `gradient-border`; button variant `brand` and size `xl`.
- Light / dark / system theme comes from a small provider in `src/components/providers/theme-provider.tsx`. An inline `<head>` script applies the saved theme before first paint, so the page never flashes.

## Contact form → Google Sheets

When someone submits the contact form, the browser sends the data to `POST /api/contact` (`src/app/api/contact/route.ts`). The route validates it with the shared Zod schema (`src/lib/contact-schema.ts`) and appends one row to a Google Sheet through the Google Sheets API (`src/lib/google-sheets.ts`).

Each row has these columns: **Submitted at (NPT) · Name · Email · Phone · Organization · Service · Message**. The header row is written automatically the first time if the sheet is empty. Values are stored as plain text, so input like `=FORMULA()` never runs. A hidden "honeypot" field quietly drops bot submissions.

### One-time setup

1. **Create the sheet.** Make a new Google Sheet, e.g. "Website enquiries". Copy its ID from the URL, which is the part after `/d/` in `https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit`.
2. **Create a Google Cloud project.** Go to [console.cloud.google.com](https://console.cloud.google.com/), create a project (or pick one), then open **APIs & Services → Library** and enable the **Google Sheets API**.
3. **Create a service account.** Go to **IAM & Admin → Service Accounts → Create service account**; it needs no roles. Open it, go to **Keys → Add key → Create new key → JSON**, and download the file.
4. **Share the sheet with the service account.** In the sheet, click **Share**, paste the service account's email (`...@...iam.gserviceaccount.com`) and give it **Editor** access.
5. **Add the environment variables.** Copy `.env.example` to `.env.local` and fill in the values from the JSON key:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: the `client_email` value
   - `GOOGLE_PRIVATE_KEY`: the `private_key` value, kept on one line with the `\n` escapes and wrapped in double quotes
   - `GOOGLE_SHEET_ID`: the ID from step 1
   - `GOOGLE_SHEET_TAB`: the tab name (optional, defaults to `Sheet1`)
6. **Restart the dev server** (`npm run dev`) and send a test message. When you deploy (e.g. to Vercel), add the same four variables in the hosting dashboard.

Keep the JSON key and `.env.local` private. They are gitignored, so never commit them.

Until the variables are set, the form shows visitors a friendly "call or email us" message. The exact error is logged on the server.

## Project structure

```
src/
  app/                  routes (page.tsx, about/, services/, contact/), api/contact route, layout, sitemap, robots
  components/
    layout/             header, mobile nav, footer, logo, theme toggle
    sections/<page>/    page sections
    shared/             section heading, page hero, CTA band, cards, backgrounds
    motion/             Reveal, Stagger, AnimatedCounter (respect prefers-reduced-motion)
    ui/                 shadcn/ui components
  data/                 editable content
  lib/                  utils, contact schema, Google Sheets client
```
