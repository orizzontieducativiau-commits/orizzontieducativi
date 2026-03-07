# Sezione Contatti + Pricing (Dashboard + Servizi)

**Data:** 2026-02-15
**Stato:** Completato

## Obiettivo

Riscrivere la sezione Contact (placeholder Lorem Ipsum) trasformandola in due sotto-sezioni: "Dashboard" (canali social) + "Pricing" (consulenze e percorsi con switch interattivo).

## Struttura

### Sezione 1 — Dashboard
- **Label corsiva:** "dashboard"
- **H2:** "Dove trovarmi"
- **Sottotitolo:** "Seguimi e ascoltami nei canali dove condivido contenuti, strumenti e storie."
- **H4:** "I miei canali"
- 4 icone cliccabili (Instagram, TikTok, Facebook, Spotify) con target blank e alt text accessibile

### Sezione 2 — Pricing
- **Label corsiva:** "Pricing"
- **H3:** "Le aree di accompagnamento"
- **Sottotitolo:** "Scegli un passo alla volta. Con chiarezza e strumenti concreti."

### Switch: Consulenze / Percorsi
(SEO audit suggerisce "Consulenze" al posto di "Calls" per coerenza linguistica)

### Tab Consulenze — 3 card
1. **Call di orientamento** — 40 min — €45
2. **Percorso strutturato** — 60 min — €80
3. **Consulenza di chiarezza** — 60 min — €120 (con disclaimer migration agent)

### Tab Percorsi — 2 card
1. **Riconoscimento titoli** — €150
2. **Riconoscimento guidato** — €240

### CTA bottoni (suggerimento SEO)
- Consulenze: "Richiedi disponibilità"
- Percorsi: "Inizia il percorso"

### Disclaimer generale (sotto le card)
"Non sono una migration agent registrata. Le consulenze offrono orientamento e supporto pratico, ma non sostituiscono la consulenza legale per visti e immigrazione."

## Approccio tecnico

- Componente diventa `"use client"` (serve useState per switch Consulenze/Percorsi)
- Icone social: lucide-react (Instagram, Music, Facebook) + SVG per Spotify/TikTok se necessario
- Switch con bottoni styled (stile template originale)
- Card pricing con struttura: nome, durata, prezzo, descrizione, bullet points, CTA
- Badge "Consigliato" sulla card €80 (Percorso strutturato)
- Section id resta `contatti`

## File coinvolti

| File | Tipo modifica |
|------|--------------|
| `src/components/sections/contact.tsx` | Riscrittura completa |

## Lavoro svolto

**Data completamento:** 2026-02-15

**Dipendenze installate:** Nessuna

| File modificato | Descrizione |
|----------------|-------------|
| `src/components/sections/contact.tsx` | Riscrittura completa: Dashboard social (Instagram, TikTok, Facebook, Spotify con icona SVG), Pricing con switch Consulenze/Percorsi, 3 card consulenze (€45/€80/€120), 2 card percorsi (€150/€240), CTA non aggressivi, disclaimer migration agent, Badge "Consigliato", section id `contatti` |

**Ottimizzazioni SEO integrate:**
- "Calls" → "Consulenze" (coerenza linguistica italiana)
- CTA: "Richiedi disponibilità" / "Inizia il percorso" (non aggressivi)
- Disclaimer migration agent generale a fondo sezione
- Disclaimer specifico nella card "Consulenza di chiarezza"
- Accessibilità: aria-label e title su tutte le icone social

**Note:**
- Link social impostati a `#` (placeholder) — da aggiornare con URL reali
- Spotify usa SVG custom (non presente in Lucide), TikTok usa icona Music di Lucide
- Icona Spotify inline come componente funzionale

**Verifica:** Build completato con successo (`npm run build`)
