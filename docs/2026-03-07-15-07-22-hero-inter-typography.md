# Hero Title — Tipografia Inter (SaaS-style)

**Data:** 2026-03-07
**Stato:** Completato

## Obiettivo

Aggiornare il titolo principale della Hero section per usare il font **Inter** con peso 700 e stile tipografico moderno da landing page SaaS/editorial startup. Il testo del titolo cambia in:

> Chi guida il tuo percorso?
> **Sofia Boulahya.**
> Founder di Orizzonti
> Educativi Australia.

## Approccio tecnico

### 1. CSS — `globals.css`
- Aggiungere classe `.font-inter` che usa la variabile `--font-inter` (già definita in `layout.tsx`).

### 2. Hero — `src/components/sections/hero.tsx`
- Sostituire il contenuto dell'`<h1>` con il nuovo testo strutturato.
- Applicare all'`<h1>`: `font-inter font-bold tracking-[-0.02em] leading-[1.1]` + scale grande (text-5xl → text-7xl responsive).
- "Chi guida il tuo percorso?" come prima riga (colore più leggero, grigio).
- "Sofia Boulahya." in nero, bold, impatto visivo forte.
- "Founder di Orizzonti Educativi Australia." in grigio più leggero per gerarchia visiva.

### File coinvolti

| File | Modifica |
|------|----------|
| `src/app/globals.css` | Aggiunta classe `.font-inter` |
| `src/components/sections/hero.tsx` | Nuovo contenuto h1 + classi tipografiche Inter |

### Dipendenze

Nessuna nuova dipendenza — Inter è già importato in `layout.tsx` con variabile `--font-inter`.

## Lavoro svolto

**Data completamento:** 2026-03-07

**Dipendenze installate:** Nessuna

| File | Descrizione modifica |
|------|---------------------|
| `src/app/globals.css` | Aggiunta classe `.font-inter` con `font-family: var(--font-inter), sans-serif` |
| `src/components/sections/hero.tsx` | Sostituito contenuto `<h1>` con struttura a 3 livelli gerarchici (domanda grigia, nome nero bold, ruolo grigio) usando Inter 700, tracking -0.02em, line-height 1.1 |

**Verifica:** Build production completata con successo.
