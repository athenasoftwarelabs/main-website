# Athena Software Labs Website

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
| `src/data/team.ts` | Team members on About (also used as blog authors) |
| `src/data/faqs.ts` | FAQ on Services |
| `src/content/blog/posts/*.ts` | Blog articles |

The brand assets are in `public/brand/` (logo mark, light and dark wordmarks, and PNG icons). The favicon is `src/app/icon.svg`.

## Blog

Articles live in `src/content/blog/posts/`, one file per post, written as structured blocks (paragraphs, headings, lists, tables, checklists, callouts, a call-to-action and FAQs). Inline text supports `**bold**` and `[links](/services#school-lms)`.

To add a post:

1. Copy an existing file in `src/content/blog/posts/` and change the `slug`, text, dates and `author` (must match a name in `src/data/team.ts`).
2. Register it in the `posts` array in `src/content/blog/index.ts`.

From that one file the site generates the article page, its share image, the table of contents, reading time, the sitemap entry, `BlogPosting` and `FAQPage` schema, and the `llms-full.txt` text. Keep the `seoTitle` under about 60 characters and the `description` between 140 and 160.

## SEO

- **Metadata:** every page sets a unique title, meta description, canonical URL, Open Graph and Twitter tags through `pageMetadata()` in `src/lib/seo.ts`.
- **Schema markup (JSON-LD):** Organization / LocalBusiness and WebSite on every page, plus breadcrumbs, Service list, FAQPage, AboutPage with Person entries, ContactPage, Blog and BlogPosting where relevant. The builders are in `src/lib/seo.ts`.
- **Generated files:** `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/llms.txt` and `/llms-full.txt` are all built from the content above, so they stay in sync automatically.
- **Share images:** branded 1200x630 images are generated in `src/app/**/opengraph-image.tsx` (site, blog and each article).
- **Search Console:** set `GOOGLE_SITE_VERIFICATION` (and optionally `BING_SITE_VERIFICATION`) in your hosting environment, then submit `https://www.athenasoftwarelabs.com/sitemap.xml`.
- **Social profiles:** once the real Facebook, LinkedIn and Instagram URLs are in `src/data/site.ts`, they are added to the schema (`sameAs`) automatically. Bare placeholders like `https://facebook.com` are skipped.
- When you change page content, bump `PAGES_UPDATED` in `src/lib/seo.ts` so the sitemap shows the new date.

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
  app/                  routes (page.tsx, about/, services/, blog/, contact/), api/contact route, layout,
                        sitemap, robots, manifest, llms.txt, share images
  components/
    blog/               article body, cards, cover art, table of contents, author, share links
    layout/             header, mobile nav, footer, logo, theme toggle
    seo/                JSON-LD renderer
    sections/<page>/    page sections
    shared/             section heading, page hero, CTA band, cards, backgrounds
    motion/             Reveal, Stagger, AnimatedCounter (respect prefers-reduced-motion)
    ui/                 shadcn/ui components
  content/blog/         blog articles and helpers
  data/                 editable content
  lib/                  utils, SEO and schema builders, share image renderer, llms.txt, contact schema, Google Sheets client
  proxy.ts              returns a real 404 for unknown blog URLs
```
