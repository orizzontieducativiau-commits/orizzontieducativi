# Replica stile sito Qatch Up con contenuti Lorem Ipsum

**Data:** 2026-02-14
**Stato:** Completato

## Obiettivo

Ricostruire l'intero sito replicando fedelmente lo stile visivo e la struttura del sito di riferimento Qatch Up (www.qatchup.com), sostituendo tutti i testi con Lorem Ipsum e i contenuti placeholder.

## Sezioni identificate dallo screenshot

1. **Header** — Logo "Q" a sinistra, hamburger menu, bottone "Start Now" scuro
2. **Hero** — Testo corsivo "hello", titolo grande "Lorem Ipsum Dolor Sit, Amet Consectetur?", sottotitolo, lista di 4 feature con icone colorate (cerchi colorati + testo), illustrazioni decorative ai lati
3. **Letter Section** — Testo corsivo "dear", titolo "Lorem Ipsum Dolor! Sit Amet Consectetur Adipiscing Elit" stile lettera, layout due colonne con testo paragrafo
4. **Why Section** — Label corsivo "what if...", titolo "Lorem Ipsum Dolor Sit?", griglia 2×2 di card con illustrazioni decorative e titoli
5. **Widget/Features Section** — Label corsivo "features", titolo "The Simplest Lorem", interfaccia a tab con 4 tab (Give feedback, Report a bug, Request a feature, Rate experience) con form preview (email, textarea, attach images, send button)
6. **Pricing Section** — Label corsivo "dashboard", titolo "Lorem Ipsum Dolor", sottotitolo "Pricing", "Plans to Fit Up to Your Needs" con card pricing ($4/mo e $8/mo), feature list con checkmark
7. **Footer** — Semplice con brand name in corsivo

## Caratteristiche stilistiche chiave

- Sfondo bianco pulito
- Font corsivo/handwriting per le label di sezione ("hello", "dear", "what if...", "features", "dashboard")
- Tipografia forte con titoli grandi e bold
- Card arrotondate con ombre sottili
- Icone cerchio colorate (verde, arancione, viola, giallo) per la feature list nell'hero
- Form widget con bordi arrotondati, campi input con placeholder
- Pricing card con bordi, checkmark per features, badge "Most Popular"
- Palette: bianco/nero con accenti colorati

## Approccio tecnico

- Riscrivere completamente i componenti esistenti (Header, Footer, Hero, About, Services, Projects, Contact)
- Rinominare/riorganizzare le sezioni per mappare la struttura del riferimento
- Aggiungere Google Font per il testo corsivo (es. Dancing Script o Caveat)
- Usare Tailwind CSS v4 per tutto lo styling
- Componenti shadcn/ui esistenti (Button, Card, Badge, Separator) dove utili
- Aggiungere componente Tabs da shadcn/ui per la sezione widget
- Tutto il testo sostituito con Lorem Ipsum

## File coinvolti

- `src/app/layout.tsx` — Aggiornare metadata, aggiungere font corsivo
- `src/app/page.tsx` — Ricomporre sezioni
- `src/app/globals.css` — Eventuali stili custom
- `src/components/layout/header.tsx` — Riscrivere nello stile Qatch Up
- `src/components/layout/footer.tsx` — Riscrivere nello stile Qatch Up
- `src/components/sections/hero.tsx` — Riscrivere completamente
- `src/components/sections/about.tsx` → Rinominare/riscrivere come "Letter" section
- `src/components/sections/services.tsx` → Rinominare/riscrivere come "Why" section
- `src/components/sections/projects.tsx` → Rinominare/riscrivere come "Widget/Features" section
- `src/components/sections/contact.tsx` → Rinominare/riscrivere come "Pricing" section

## Dipendenze

- Aggiungere shadcn/ui `Tabs` component (`npx shadcn@latest add tabs`)
- Aggiungere shadcn/ui `Input` component (`npx shadcn@latest add input`)
- Font corsivo via next/font/google (Caveat)

## Passaggi previsti

1. Installare componente Tabs
2. Aggiornare layout con font Caveat
3. Riscrivere Header
4. Riscrivere Hero
5. Riscrivere sezione Letter (about)
6. Riscrivere sezione Why (services)
7. Riscrivere sezione Widget/Features (projects)
8. Riscrivere sezione Pricing (contact)
9. Riscrivere Footer
10. Aggiornare page.tsx
11. Aggiornare globals.css se necessario
12. Test visivo con `npm run dev`

---

## Lavoro svolto

**Data completamento:** 2026-02-14

### Dipendenze installate

- `npx shadcn@latest add tabs` — Componente Tabs per la sezione Widget/Features
- `npx shadcn@latest add input` — Componente Input per i form nel widget
- Font **Inter** (body) e **Caveat** (labels corsivi) via `next/font/google`

### File modificati

| File | Descrizione modifica |
|---|---|
| `src/app/layout.tsx` | Sostituiti font Geist con Inter + Caveat, aggiornati metadata con Lorem Ipsum |
| `src/app/globals.css` | Aggiornato `--font-sans` a `--font-inter`, aggiunto `--font-caveat`, classe `.font-caveat`, rimossa duplicazione in `@layer base`, rimosso dark theme |
| `src/app/page.tsx` | Nessuna modifica strutturale (stessa composizione di sezioni) |
| `src/components/layout/header.tsx` | Logo "L" nero quadrato, nav links placeholder, bottone "Start Now" rounded nero, menu mobile Sheet |
| `src/components/layout/footer.tsx` | Logo "L" + nome "loremipsum" in Caveat, copyright placeholder |
| `src/components/sections/hero.tsx` | Label corsivo "hello", titolo "Lorem Ipsum Dolor Sit, Amet Consectetur?", 4 feature con icone cerchio colorate (emerald, violet, amber, rose), blob decorativi sfumati |
| `src/components/sections/about.tsx` | Logo centrato, label corsivo "dear", titolo stile lettera su 3 righe, testo su due colonne con Lorem Ipsum |
| `src/components/sections/services.tsx` | Label corsivo "what if...", griglia 2×2 di card colorate (sky, amber, violet, emerald) con icone Lucide come placeholder illustrazioni |
| `src/components/sections/projects.tsx` | Label corsivo "features", 4 tab arrotondati (Tabs shadcn), widget form con email Input, textarea, attach images, send button, rating stars (tab "rate") |
| `src/components/sections/contact.tsx` | Label corsivo "dashboard", titolo, toggle mensile/annuale statico, 2 pricing card ($4/$8), checkmark verdi, badge "Most Popular", bottoni CTA |

### Nuovi file generati (shadcn/ui)

- `src/components/ui/tabs.tsx`
- `src/components/ui/input.tsx`

### Verifica

- `npm run build` completato con successo senza errori TypeScript o di compilazione.

### Note

- Le illustrazioni decorative del sito originale (personaggi, piante) sono state sostituite con blob sfumati colorati (hero) e icone Lucide oversize a bassa opacità (sezione Why).
- Il toggle mensile/annuale nella sezione pricing è statico (non interattivo), coerente con l'approccio placeholder.
- La sezione Widget usa `"use client"` per il componente Tabs interattivo.
