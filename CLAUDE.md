# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start dev server (http://localhost:3000, Turbopack)
- `npm run build` — Production build
- `npm run start` — Serve production build
- `npm run lint` — ESLint
- `npx shadcn@latest add <component>` — Add a shadcn/ui component
- `node scripts/import-blog.mjs path/to/file.zip` — Import blog article from ZIP

## Architecture

Italian-language educational portfolio site for **Orizzonti Educativi** — guida per educatori italiani nel sistema educativo australiano. Built with Next.js 16 App Router, Tailwind CSS v4, and shadcn/ui (New York style).

**Key conventions:**
- Path alias `@/*` maps to `./src/*`
- Server Components by default; add `"use client"` only when needed (e.g., Header, Tabs sections, Pricing toggle)
- shadcn/ui components live in `src/components/ui/` — these are generated, avoid manual edits
- `cn()` utility from `src/lib/utils.ts` (clsx + tailwind-merge) for conditional class merging
- Tailwind v4 CSS-first config — theming via CSS variables in `src/app/globals.css`, no `tailwind.config.js`
- Radix UI (unified `radix-ui` package) as headless foundation for shadcn components
- Lucide React for icons

**Font stack:**
- Body: **Geist Sans** (Vercel `geist` package, shadcn default)
- Decorative labels: **Caveat** (Google Font, handwriting style — used in Hero label, section labels, footer)
- CSS variables: `--font-geist-sans`, `--font-caveat` in `globals.css`

**Color palette:**
- Primary accents: emerald, violet, amber, rose (consistent across all sections)
- Secondary: sky, teal (service cards)
- Neutral: white, gray, black

### Routes

```
src/app/
├── page.tsx                                 ← Homepage (single-page portfolio)
├── layout.tsx                               ← Root layout (Geist + Caveat fonts)
├── globals.css                              ← Tailwind v4 + CSS variables + typography plugin
├── blog/
│   ├── page.tsx                             ← Blog gallery (grid layout)
│   └── [slug]/page.tsx                      ← Individual article (MDX rendering)
├── sistema-educativo-australiano/page.tsx   ← Placeholder page
└── consulenze/page.tsx                      ← Placeholder page
```

### Component organization

- `src/components/layout/` — Header (shadcn NavigationMenu, mobile Sheet menu), Footer
- `src/components/sections/` — Homepage sections:
  - `hero.tsx` — Centered layout, floating service card, children artwork background with gradient fade
  - `about.tsx` — 2-column letter-style layout, Malaguzzi quote (Caveat font)
  - `services.tsx` — 2×2 colored card grid (sky/amber/violet/emerald) with internal links
  - `projects.tsx` — **Consulenze section** with 4 interactive tabs (form, calendar, time picker, testimonials)
  - `contact.tsx` — Dashboard (social icons) + Pricing section (Consulenze/Percorsi toggle)
- `src/components/blog/` — Blog system:
  - `blog-card.tsx` — Gallery card (image, title, description, date, tag badges)
  - `blog-header.tsx` — Section header with Caveat decorative label
  - `mdx-content.tsx` — MDX rendering wrapper (Server Component)
- `src/components/ui/` — shadcn/ui primitives: Button, Card, Badge, Separator, Sheet, Tabs, Input, NavigationMenu
- `src/lib/utils.ts` — `cn()` utility
- `src/lib/blog.ts` — MDX article functions (read, parse frontmatter, reading time, sort by date)
- `src/hooks/` — Custom React hooks (alias configured, not yet populated)

### Blog system

MDX-based blog with no backend. Articles stored as `.mdx` files in `content/blog/`.

**Frontmatter schema:**
```yaml
title: "Article Title"
description: "Short description"
slug: "article-slug"
date: "2026-03-05"
image: "/images/blog/image.jpg"
tags: ["tag1", "tag2"]
```

**Dependencies:** `gray-matter` (frontmatter parsing), `next-mdx-remote/rsc` (server-side MDX rendering), `@tailwindcss/typography` (prose styling)

**Gallery** (`/blog`): responsive grid (1/2/3 cols), Server Component, cards with hover transitions.
**Article** (`/blog/[slug]`): centered editorial layout (max-w-3xl), hero image, reading time, `generateStaticParams` for SSG, `generateMetadata` for SEO.

**Import script:** `scripts/import-blog.mjs` — Node.js ES module that extracts a ZIP file, copies images to `public/images/blog/[slug]/`, generates `.mdx` with auto-populated frontmatter.

### Content & assets

```
content/blog/*.mdx              ← Blog articles (MDX + YAML frontmatter)
public/images/blog/             ← Blog images organized by slug
public/images/children-artwork  ← Hero decorative artwork (.png/.avif)
public/images/hero-fab.png      ← Hero floating decorative element
scripts/import-blog.mjs         ← Blog article importer from ZIP
docs/                           ← Project documentation per feature
```

### Homepage sections & anchors

Homepage (`/`) composes all sections with anchor navigation:
- `#chi-sono` — About/Chi Sono
- `#servizi` — Services (4 cards with links to subpages)
- `#consulenze` — Interactive consultation tabs (form, calendar, time, testimonials)
- `#contatti` — Social dashboard + Pricing (Consulenze/Percorsi)

### Header navigation

| Voce | Destinazione |
|------|-------------|
| Home | `/` |
| Blog | `/blog` |
| Tools | `/consulenze` |

Mobile: Sheet (slide-out) menu with same items.

## Stack Versions

- Next.js 16.1.6, React 19.2.3, TypeScript 5, Tailwind CSS v4, shadcn/ui 3.8.4
- gray-matter, next-mdx-remote, @tailwindcss/typography, geist (fonts)

## Workflow — Documento di progetto

Ogni volta che viene richiesta una nuova funzionalità o implementazione, **prima di scrivere codice** devi:

1. **Verificare la data e ora correnti** tramite comando di sistema (`date`), per usare la data reale nel nome del file.
2. **Creare un documento di progetto** nella cartella `docs/` con nome nel formato `YYYY-MM-DD-HH-mm-ss-nome-funzione.md` (es. `2026-02-14-autenticazione-utente.md`).
3. **Descrivere nel documento** cosa verrà implementato: obiettivo, approccio tecnico, file coinvolti, eventuali dipendenze e passaggi previsti.
4. **Attendere conferma esplicita dell'utente** prima di procedere con l'implementazione.

Non iniziare a scrivere codice di implementazione finché l'utente non ha approvato il documento di progetto.

5. **Al termine dell'implementazione**, aggiornare il documento di progetto corrispondente in `docs/` aggiungendo una sezione `## Lavoro svolto` che includa: data di completamento, dipendenze installate, tabella dei file modificati con descrizione, eventuali nuovi file creati, esito della verifica (build/test) e note rilevanti. Impostare inoltre `**Stato:** Completato` nell'intestazione del documento.

## Regola — Cronologia prompt

Quando l'utente dice **"salvami la cronologia del prompt"**, devi:

1. Creare (o aggiornare se già esiste) il file `docs/prompt-history.md`.
2. Il file deve contenere **tutti i messaggi/comandi scritti dall'utente** durante la sessione corrente, in ordine cronologico.
3. Formato del file:

```
# Cronologia Prompt

**Sessione del:** YYYY-MM-DD

| # | Prompt |
|---|--------|
| 1 | testo del primo comando... |
| 2 | testo del secondo comando... |
| ... | ... |
```

4. Se il file esiste già da una sessione precedente, **aggiungere** la nuova sessione in coda, separata da un divisore `---`, senza sovrascrivere le sessioni precedenti.
