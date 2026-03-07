# Flussi completi per i 3 nuovi servizi

**Data:** 2026-03-07
**Stato:** Completato

---

## Servizi da implementare

1. **CV & Cover Letter** — Form upload CV, email con allegato, salvataggio DB
2. **Mock Interview** — Calendario condiviso con consulenze, upload CV opzionale
3. **Mentorship** — Form nella sezione Percorsi, email di benvenuto

## File coinvolti

### Nuovi file
| File | Descrizione |
|------|-------------|
| `src/app/servizi/cv-cover-letter/page.tsx` | Pagina upload CV |
| `src/app/api/cv-upload/route.ts` | API upload CV + email |
| `src/app/api/mentorship/route.ts` | API mentorship + email |
| `src/lib/email-servizi.ts` | Template email per i 3 servizi |
| `scripts/supabase-schema-servizi.sql` | Schema tabelle aggiuntive |

### File da modificare
| File | Modifica |
|------|----------|
| `src/lib/consulenze.ts` | Aggiungere Mock Interview ai dati |
| `src/components/sections/contact.tsx` | Link Percorsi → form mentorship |
| `src/app/conferma/page.tsx` | Blocco upload CV opzionale per mock interview |
| `src/app/api/prenota/route.ts` | Email specifica per mock interview |
| `src/app/api/mock-interview-cv/route.ts` | API upload CV opzionale mock interview |
| `src/app/consulenze/page.tsx` | Sezione "Altri servizi" con Mock Interview e CV |
| `src/app/api/reminder/route.ts` | Aggiunta proprietà `durata` mancante |

## Lavoro svolto

**Data completamento:** 2026-03-07

**Dipendenze installate:** Nessuna nuova dipendenza

**Riepilogo implementazioni:**

| Servizio | Pagina | API | Email | DB |
|----------|--------|-----|-------|----|
| CV & Cover Letter | `/servizi/cv-cover-letter` | `/api/cv-upload` | Conferma utente + notifica admin con allegato | `cv_submissions` |
| Mock Interview | `/prenota/mock-interview` (calendario condiviso) | `/api/prenota` + `/api/mock-interview-cv` | Conferma specifica + CV opzionale admin | `prenotazioni` (condiviso) |
| Mentorship | Form inline in sezione Percorsi (`contact.tsx`) | `/api/mentorship` | Benvenuto utente + notifica admin | `mentorship_submissions` |

**Navigazione:**
- Homepage Consulenze tab: 4 card (3 consulenze + Mock Interview) con link a `/prenota/[slug]`
- Homepage Percorsi tab: 2 card con pulsante "Inizia il percorso" → form mentorship inline
- Pagina `/consulenze`: sezione "Altri servizi" con Mock Interview e link a CV & Cover Letter
- Conferma prenotazione: blocco upload CV opzionale per mock interview

**Nota:** L'utente deve eseguire `scripts/supabase-schema-servizi.sql` in Supabase per creare le tabelle `cv_submissions` e `mentorship_submissions`.

**Build:** Verificato con successo (`npm run build`)
