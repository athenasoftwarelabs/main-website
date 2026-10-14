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

## Contact form

`src/app/contact/actions.ts` is a **mock** server action. It validates with the shared Zod schema (`src/lib/contact-schema.ts`) and logs the enquiry to the server console. To actually receive messages, connect it to an email service such as Resend or to a database.

## Project structure

```
src/
  app/                  routes (page.tsx, about/, services/, contact/), layout, sitemap, robots
  components/
    layout/             header, mobile nav, footer, logo, theme toggle
    sections/<page>/    page sections
    shared/             section heading, page hero, CTA band, cards, backgrounds
    motion/             Reveal, Stagger, AnimatedCounter (respect prefers-reduced-motion)
    ui/                 shadcn/ui components
  data/                 editable content
  lib/                  utils, contact schema
```
