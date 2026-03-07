# Conversione fuso orario slot consulenze

**Data:** 2026-03-07
**Stato:** Completato

---

## Obiettivo

Gli orari delle consulenze sono definiti in ora italiana (Europe/Rome). Convertire automaticamente la visualizzazione nel fuso orario locale del browser dell'utente tramite API `Intl`. Il DB continua a salvare l'orario italiano.

## Approccio tecnico

- Creare `src/lib/timezone.ts` — utility client-side con `Intl.DateTimeFormat`
- Il fuso italiano di riferimento viene ricostruito da `dataISO + orarioIT` interpretato come `Europe/Rome`
- Sotto ogni slot: riga "Orario italiano: 12:00 CET"
- Riepilogo e email: entrambi gli orari (locale + italiano)
- Per l'email (server-side): il client invia `orarioLocale` e `fusoLocale` nella request POST

## File coinvolti

| File | Modifica |
|------|----------|
| `src/lib/timezone.ts` | **Nuovo** — utility conversione fuso orario |
| `src/components/SlotOrario.tsx` | Mostra orario convertito + riferimento italiano |
| `src/app/prenota/[tipo]/page.tsx` | Passa data ISO ai componenti, invia orario locale nell'API |
| `src/app/api/prenota/route.ts` | Riceve e inoltra orario locale all'email |
| `src/lib/email.ts` | Mostra entrambi gli orari nel template |
| `src/app/conferma/page.tsx` | Mostra entrambi gli orari nel riepilogo |

Nessuna libreria aggiuntiva — solo `Intl` nativa del browser.

---

## Lavoro svolto

**Data completamento:** 2026-03-07
**Build:** Successo

### File creati

| File | Descrizione |
|------|-------------|
| `src/lib/timezone.ts` | `convertiOrarioLocale()`, `getFusoItaliano()`, `getFusoLocale()` — conversione Europe/Rome → fuso locale via Intl API |

### File modificati

| File | Modifica |
|------|----------|
| `src/components/SlotOrario.tsx` | Nuova prop `dataISO`, ogni slot mostra orario locale + fuso; riga "Orario italiano: HH:MM CET/CEST" in fondo |
| `src/app/prenota/[tipo]/page.tsx` | Passa `dataISO` a SlotOrario; step 3 mostra "HH:MM fuso (HH:MM ora italiana)"; invia `orarioLocale` e `fusoLocale` nell'API |
| `src/app/api/prenota/route.ts` | Riceve `orarioLocale`/`fusoLocale` dal client, li passa all'email e li include nella response |
| `src/lib/email.ts` | Tipo `PrenotazioneEmail` esteso; `formatOrarioEmail()` mostra "HH:MM FUSO (HH:MM ora italiana)" |
| `src/app/conferma/page.tsx` | Mostra `orarioLocale fusoLocale (orarioIT ora italiana)` nel riepilogo |
