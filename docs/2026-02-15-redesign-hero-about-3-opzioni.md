# Redesign Hero + About — 3 Opzioni (A, B, C)

**Data:** 2026-02-15
**Stato:** Completato

## Obiettivo

Creare tre proposte (A, B, C) per le sezioni **Hero** e **About**, con:

- **Hero**: versione più breve e d'impatto. Deve spiegare chiaramente cosa aspettarsi da Orizzonti Educativi.
- **About**: versione più dettagliata su chi è Sofia Boulahya e cosa fa. I servizi chiave devono essere cliccabili:
  - Consulenze personalizzate
  - Supporto e accompagnamento nel percorso di riconoscimento dei titoli
- Lingua: italiano
- Revisione SEO con agenti specializzati

## Fonte contenuti

- `references/orizzontieducativi-bio.md` — bio completa di Sofia
- `src/components/sections/hero.tsx` — Hero attuale (Opzione C precedente, score SEO 81/100)

## Approccio

1. Agente copywriter: redige 3 varianti Hero + 3 varianti About
2. Agente SEO: revisiona e assegna score a ciascuna variante
3. Presentazione all'utente per scelta
4. Implementazione della variante approvata

## File coinvolti

| File | Azione |
|------|--------|
| `src/components/sections/hero.tsx` | Modifica contenuto |
| `src/components/sections/about.tsx` | Modifica contenuto |

## Dipendenze

Nessuna nuova dipendenza richiesta.

## Lavoro svolto

**Data completamento:** 2026-02-15

**Dipendenze installate:** Nessuna

| File | Descrizione |
|------|-------------|
| `src/components/sections/hero.tsx` | Hero più breve e d'impatto: H1 "Orizzonti Educativi ti accompagna passo passo", subtitle conciso con link cliccabili (consulenze, sistema educativo), feature pills aggiornate (Consulenze personalizzate, CV e Cover Letter in standard australiano, Preparazione colloqui, Mentorship e supporto continuo) |
| `src/components/sections/about.tsx` | Contenuto reale basato sulla bio di Sofia Boulahya. Label "Educatore italiano in Australia: chi guida il tuo percorso?", H2 con ECE cliccabile, 6 paragrafi su 2 colonne (storia personale, nascita di OE, servizi offerti con link cliccabile a riconoscimento titoli, citazione Malaguzzi in corsivo) |

**Verifica:** Build production completata con successo (`npm run build`).

**Note:** Opzione ibrida scelta dall'utente dopo presentazione di 3 varianti (A: Diretta/72 SEO, B: Narrativa/67 SEO, C: Ispirazionale/62 SEO). Contenuto redatto con agente copywriter e revisionato con agente SEO specialist.
