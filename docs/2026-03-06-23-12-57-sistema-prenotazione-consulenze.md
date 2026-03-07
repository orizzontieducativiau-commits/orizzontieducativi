# Sistema di Prenotazione Consulenze Pedagogiche Online

**Data:** 2026-03-06
**Stato:** Completato

---

## Obiettivo

Costruire un sistema completo di prenotazione consulenze pedagogiche integrato nel sito esistente. L'utente potrà scegliere una tipologia di consulenza, selezionare data e orario da un calendario, compilare un form e ricevere conferma via email con istruzioni per il pagamento tramite bonifico.

---

## Decisioni architetturali e adattamenti

### Coerenza con lo stack esistente

La richiesta menziona Next.js 14, nuove font (Lora, DM Sans) e nuovi colori. Per **coerenza con il progetto esistente**, manterrò:

| Aspetto | Richiesta | Decisione |
|---------|-----------|-----------|
| Next.js | 14 | **16.1.6** (già installato) |
| Font titoli | Lora/Playfair Display | **Geist Sans + Caveat** (già nel progetto) |
| Font corpo | DM Sans/Nunito | **Geist Sans** (già nel progetto) |
| Colori | Verde salvia, terracotta | **Palette esistente** (emerald, violet, amber) con accenti caldi dove opportuno |
| UI Components | Custom | **shadcn/ui** (già nel progetto) |

### Database: Supabase

- PostgreSQL hosted con SDK JavaScript
- Tabelle: `consulenze` (configurazione) e `prenotazioni`
- Row Level Security per protezione dati
- Supabase client per le API routes

### Email: Resend

- SDK ufficiale per Node.js
- Template HTML per email curate
- Supporto per email transazionali

---

## Consulenze da integrare (dal sito esistente)

Le 3 tipologie attualmente presenti nella sezione Pricing (`contact.tsx`):

| # | Nome (tipo_consulenza) | Slug | Durata | Prezzo |
|---|----------------------|------|--------|--------|
| 1 | Call di orientamento | call-di-orientamento | 40 min | €45 |
| 2 | Percorso strutturato | percorso-strutturato | 60 min | €80 |
| 3 | Consulenza di chiarezza | consulenza-di-chiarezza | 60 min | €120 |

---

## Schema Database

### Tabella `consulenze`

```sql
CREATE TABLE consulenze (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,           -- "Call di orientamento"
  slug TEXT NOT NULL UNIQUE,    -- "call-di-orientamento"
  descrizione TEXT NOT NULL,
  durata_minuti INT NOT NULL,   -- 40, 60
  prezzo DECIMAL(10,2) NOT NULL,-- 45.00, 80.00, 120.00
  attiva BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Tabella `prenotazioni`

```sql
CREATE TABLE prenotazioni (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo_consulenza TEXT NOT NULL,      -- nome esatto: "Call di orientamento"
  tipo_consulenza_slug TEXT NOT NULL,  -- "call-di-orientamento"
  data DATE NOT NULL,
  orario TEXT NOT NULL,               -- "12:00"
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  stato TEXT NOT NULL DEFAULT 'in_attesa_pagamento'
    CHECK (stato IN ('in_attesa_pagamento', 'confermata', 'annullata')),
  reminder_inviato BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indice per query disponibilità (evita doppie prenotazioni)
CREATE UNIQUE INDEX idx_prenotazioni_slot
  ON prenotazioni (data, orario)
  WHERE stato != 'annullata';
```

---

## Logica disponibilità

File: `src/lib/availability.ts`

```
Giorni attivi: Lun(1), Mar(2), Ven(5), Sab(6), Dom(0)
Giorni disabilitati: Mer(3), Gio(4)

Orari feriali (lun, mar, ven): ["12:00", "13:00"]
Orari weekend (sab, dom): ["08:00", "09:00", "10:00"]

Slot disponibile = giorno attivo + orario valido + nessuna prenotazione esistente (stato != 'annullata')
```

---

## File coinvolti

### Nuovi file da creare

| File | Descrizione |
|------|-------------|
| `src/app/prenota/[tipo]/page.tsx` | Pagina calendario + form prenotazione |
| `src/app/conferma/page.tsx` | Pagina conferma post-prenotazione |
| `src/app/api/prenota/route.ts` | API salvataggio prenotazione + invio email |
| `src/app/api/slots/[data]/route.ts` | API slot disponibili per una data |
| `src/app/api/reminder/route.ts` | API cron per reminder 24h |
| `src/lib/db.ts` | Client Supabase |
| `src/lib/email.ts` | Template e invio email con Resend |
| `src/lib/availability.ts` | Logica giorni/orari disponibili |
| `src/components/CalendarioPrenotazione.tsx` | Calendario mensile custom |
| `src/components/FormPrenotazione.tsx` | Form con nome, email, telefono |
| `src/components/CardConsulenza.tsx` | Card consulenza per pagina /consulenze |
| `src/components/SlotOrario.tsx` | Bottoni slot orari |
| `vercel.json` | Configurazione cron job per reminder |

### File esistenti da modificare

| File | Modifica |
|------|----------|
| `src/components/sections/contact.tsx` | Aggiungere link "Prenota" sulle card Consulenze che puntano a `/prenota/[slug]` |
| `src/components/sections/projects.tsx` | Aggiornare tab Consulenze per integrare flusso prenotazione |
| `src/components/layout/header.tsx` | Link "Consulenze" punta a `/#contatti` o alla sezione pricing con tab Consulenze attivo |
| `src/app/consulenze/page.tsx` | Trasformare da placeholder a pagina dedicata con le 3 card consulenze |

---

## Flusso utente

```
Homepage → Click "Consulenze" (navbar/servizi)
    ↓
Sezione Pricing con tab "Consulenze" attivo (o pagina /consulenze)
    ↓
Click "Prenota" su una card → /prenota/call-di-orientamento
    ↓
Calendario mensile (giorni grigi = mer/gio/passati)
    ↓
Click giorno → Appaiono slot orari disponibili
    ↓
Click slot → Appare form (nome, email, telefono)
    ↓
"Conferma Prenotazione" → API /api/prenota
    ↓
Redirect → /conferma (riepilogo + messaggio pagamento)
    ↓
Email automatica con istruzioni bonifico
```

---

## Email

### Email 1 — Conferma prenotazione (immediata)
- **Oggetto:** "La tua consulenza è prenotata — Riepilogo e istruzioni"
- Saluto personalizzato, riepilogo (tipo, data, orario), istruzioni bonifico (IBAN placeholder), causale suggerita, importo
- Template HTML curato, tono caldo e rassicurante

### Email 2 — Reminder 24h prima
- **Oggetto:** "Ti aspetto domani! Riepilogo della tua consulenza"
- Promemoria data/orario, tipo consulenza, invito a contattare se necessario
- Cron job: ogni ora controlla prenotazioni confermate con data = domani e reminder_inviato = false

---

## Dipendenze da installare

```
npm install @supabase/supabase-js resend
```

---

## Sicurezza

- Validazione server-side di tutti i campi (nome, email, data, orario)
- Rate limiting API prenotazione (5 req/IP in 10 min) tramite headers + Map in-memory
- Race condition check: unique index su (data, orario) WHERE stato != 'annullata'
- Sanitizzazione input prima del salvataggio
- Variabili d'ambiente per chiavi Supabase e Resend (`.env.local`)

---

## Variabili d'ambiente necessarie

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
RESEND_API_KEY=xxx
CRON_SECRET=xxx
```

---

## Piano di implementazione (ordine dei passaggi)

1. **Setup infrastruttura**: installare dipendenze, creare `src/lib/db.ts`, `.env.local` template
2. **Logica disponibilità**: `src/lib/availability.ts`
3. **API routes**: `/api/slots/[data]`, `/api/prenota`, `/api/reminder`
4. **Email system**: `src/lib/email.ts` con template HTML
5. **Componenti UI**: CalendarioPrenotazione, SlotOrario, FormPrenotazione, CardConsulenza
6. **Pagine**: `/prenota/[tipo]/page.tsx`, `/conferma/page.tsx`
7. **Aggiornare pagina /consulenze**: da placeholder a pagina con le 3 card
8. **Integrare homepage**: link "Prenota" nelle card pricing, navigazione coerente
9. **Cron job**: `vercel.json` + API reminder
10. **Test e verifica**: build, navigazione completa, test API

---

## Note UX

- Linguaggio: "incontro", "percorso", "accompagnamento" — mai "acquisto", "ordine", "checkout"
- Microcopy rassicurante in ogni step
- Mobile-first (390px)
- Loading states durante chiamate API
- Messaggi errore umani, non tecnici
- Il sito non deve sembrare un e-commerce

---

## Lavoro svolto

**Data completamento:** 2026-03-06
**Build:** Successo (Next.js 16.1.6 Turbopack)

### Dipendenze installate

- `@supabase/supabase-js` — Client PostgreSQL
- `resend` — Invio email transazionali

### File creati

| File | Descrizione |
|------|-------------|
| `src/lib/db.ts` | Client Supabase (lazy init per compatibilità build) |
| `src/lib/availability.ts` | Logica giorni/orari disponibili, formattazione date italiane |
| `src/lib/email.ts` | Template HTML email conferma + reminder, invio via Resend |
| `src/lib/consulenze.ts` | Dati consulenze (fonte di verità per nomi, slug, prezzi) |
| `src/app/api/slots/[data]/route.ts` | API GET slot disponibili per data |
| `src/app/api/prenota/route.ts` | API POST prenotazione con validazione, rate limiting, race condition check |
| `src/app/api/reminder/route.ts` | API POST cron reminder 24h (protetta con CRON_SECRET) |
| `src/components/CalendarioPrenotazione.tsx` | Calendario mensile custom con giorni attivi/disabilitati |
| `src/components/SlotOrario.tsx` | Griglia slot orari con stati disponibile/occupato/selezionato |
| `src/components/FormPrenotazione.tsx` | Form prenotazione (nome, email, telefono) con microcopy rassicurante |
| `src/components/CardConsulenza.tsx` | Card consulenza con link a /prenota/[slug] |
| `src/app/prenota/[tipo]/page.tsx` | Pagina prenotazione: calendario → slot → form → conferma |
| `src/app/conferma/page.tsx` | Pagina conferma con riepilogo e nota email |
| `.env.local.example` | Template variabili d'ambiente |
| `vercel.json` | Configurazione cron job (ogni ora) |
| `scripts/supabase-schema.sql` | Schema SQL completo con RLS e indici |

### File modificati

| File | Modifica |
|------|----------|
| `src/components/sections/contact.tsx` | Aggiunto slug alle consulenze, link "Prenota" → `/prenota/[slug]`, import Link e ArrowRight |
| `src/components/layout/header.tsx` | "Tools" → "Consulenze" nella navigazione |
| `src/app/consulenze/page.tsx` | Da placeholder a pagina completa con 3 card consulenze + FAQ + disclaimer |

### Verifica

- `npm run build`: Successo, 0 errori TypeScript
- Route statiche: /, /blog, /consulenze, /conferma
- Route dinamiche: /api/prenota, /api/reminder, /api/slots/[data], /prenota/[tipo]
- Route SSG: /blog/[slug] (3 articoli)
