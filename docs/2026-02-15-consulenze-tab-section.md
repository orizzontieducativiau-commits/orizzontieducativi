# Sezione Consulenze — Tab interattiva (Projects → Consulenze)

**Data:** 2026-02-15
**Stato:** Completato

## Obiettivo

Riscrivere completamente la sezione Projects (placeholder Lorem Ipsum) trasformandola nella sezione "Consulenze" con 4 tab interattive: modulo contatto, calendario settimanale, selezione orario, testimonial.

## Struttura

### Header
- **Label corsiva:** "I tuoi prossimi passi verso l'Australia"
- **H2:** "Consulenza personalizzata per educatori italiani in Australia"
- **Sottotitolo:** "Uno spazio strutturato e trasparente per orientarti, scegliere e prenotare con consapevolezza."

### Tab 1 — "Iniziamo dal dialogo" (icona: MessageSquare)
- Testo introduttivo con keywords SEO integrate naturalmente
- Modulo contatto: campo email, campo nome, textarea descrizione, bottone allega documenti
- CTA "Invia" con tono umano
- Nota: "Riceverai risposta entro 24-48 ore"

### Tab 2 — "Scegli il giorno" (icona: CalendarDays)
- Testo: "Seleziona il giorno che senti più adatto..."
- Calendario settimanale lunedì–domenica, giorni cliccabili
- State management: giorno selezionato evidenziato
- Stile pulito, ordinato

### Tab 3 — "Scegli l'orario" (icona: Clock)
- Testo con keywords SEO: "Ogni consulenza dura 60 minuti..."
- Nota fuso orario AEST + modalità Zoom
- 7 slot orari cliccabili: 8:00–14:00
- State management: orario selezionato evidenziato

### Tab 4 — "Cosa dicono gli altri" (icona: Star)
- Intestazione: "Le parole di chi ha già attraversato questo percorso."
- 3 testimonial reali (Silvia, Gloria, B.)
- Stile card con citazione e nome

## Approccio tecnico

- Componente `"use client"` (già presente)
- Stato React con `useState` per: giorno selezionato, orario selezionato
- Riutilizzo componenti shadcn/ui: Tabs, Button, Input, Card
- Icone Lucide: MessageSquare, CalendarDays, Clock, Star, Paperclip
- Nessuna integrazione backend (UI statica/demo per ora)
- Section id cambiato da `widget` a `consulenze`

## File coinvolti

| File | Tipo modifica |
|------|--------------|
| `src/components/sections/projects.tsx` | Riscrittura completa |

## Dipendenze

Nessuna nuova dipendenza. Tutti i componenti shadcn/ui necessari sono già installati (Tabs, Button, Input, Card).

## Lavoro svolto

**Data completamento:** 2026-02-15

**Dipendenze installate:** Nessuna

| File modificato | Descrizione |
|----------------|-------------|
| `src/components/sections/projects.tsx` | Riscrittura completa: 4 tab interattive (dialogo, giorno, orario, recensioni), modulo contatto, calendario settimanale con stato, selezione oraria con stato, 3 testimonial reali, riepilogo appuntamento dinamico, keywords SEO integrate, section id `consulenze` |

**Ottimizzazioni SEO integrate:**
- H2 con keywords "educatori italiani in Australia"
- Label con geo-targeting "verso l'Australia"
- Tab 1: keywords "educatore italiano", "riconoscimento titoli", "early childhood"
- Tab 3: "consulenza" al posto di "incontro", info AEST e Zoom
- Tono pedagogico confermato (10/10 dall'audit)

**Funzionalità interattive:**
- `useState` per selezione giorno e orario
- Riepilogo appuntamento dinamico (emerald-50 banner) quando entrambi selezionati
- Tutti i giorni e orari cliccabili con feedback visivo (nero = selezionato)

**Verifica:** Build completato con successo (`npm run build`)
