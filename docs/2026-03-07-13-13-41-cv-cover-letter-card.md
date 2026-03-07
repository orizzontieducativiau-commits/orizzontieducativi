# CV & Cover Letter — Service Card

**Data:** 2026-03-07
**Stato:** Completato

## Obiettivo

Trasformare il placeholder attuale della card "CV & Cover Letter" nella pagina `/consulenze` in una card completa e professionale, con lo stesso stile delle altre card (usa `CardConsulenza`), ma con il contenuto fornito dall'utente.

## Approccio tecnico

### 1. Aggiungere il servizio CV_COVER_LETTER in `src/lib/consulenze.ts`

Creare un nuovo oggetto `Consulenza` con:
- **nome:** "CV & Cover Letter"
- **slug:** "cv-cover-letter"
- **descrizione:** Il testo introduttivo fornito dall'utente
- **durataMinuti:** non applicabile — useremo un valore convenzionale (es. 0) oppure estendiamo il tipo
- **prezzo:** 50
- **prezzoLabel:** "€50"
- **features:** Le 3 voci della checklist verde
- **popular:** false
- **emailCustom:** true

**Nota:** Il servizio CV & Cover Letter non ha una durata in minuti come le consulenze. Opzioni:
- Rendere `durataMinuti` opzionale nel tipo `Consulenza` e nascondere la label "X min" quando assente
- Usare un valore placeholder

**Scelta proposta:** rendere `durataMinuti` opzionale nel tipo e aggiornare `CardConsulenza` per nascondere la riga durata quando è `undefined` o `0`.

### 2. Aggiornare `CardConsulenza.tsx`

- Gestire il caso `durataMinuti` assente (non mostrare "X min")
- Il link del bottone: per CV & Cover Letter il link andrà a `/servizi/cv-cover-letter` invece di `/prenota/slug`. Opzione: aggiungere un campo opzionale `ctaHref` e `ctaLabel` al tipo `Consulenza`.

### 3. Aggiornare `src/app/consulenze/page.tsx`

- Importare `CV_COVER_LETTER` da `consulenze.ts`
- Sostituire il blocco `<Link>` placeholder (righe 44-58) con `<CardConsulenza consulenza={CV_COVER_LETTER} />`

### 4. Testo esatto (non modificare)

**Descrizione:**
"Molti CV europei, anche quando contengono esperienze valide, non sono strutturati nel modo che i recruiter australiani si aspettano. Per questo motivo può essere utile adattare il proprio curriculum al contesto locale. Questo servizio nasce proprio per supportarti in questo passaggio."

**Features (checklist):**
- Adattare il CV al formato utilizzato in Australia
- Utilizzare un linguaggio professionale, adatto ai recruiter australiani
- Aiutare a candidarsi in modo più efficace

**CTA:** "Vai al servizio" (con freccia)

## File coinvolti

| File | Modifica |
|------|----------|
| `src/lib/consulenze.ts` | Aggiungere `CV_COVER_LETTER`, rendere `durataMinuti` opzionale, aggiungere campi `ctaHref?` e `ctaLabel?` al tipo |
| `src/components/CardConsulenza.tsx` | Gestire durata opzionale, CTA personalizzabile |
| `src/app/consulenze/page.tsx` | Sostituire placeholder con `CardConsulenza` |

## Dipendenze

Nessuna nuova dipendenza. Usa componenti e librerie già presenti.

## Note

- La card risultante avrà lo stesso aspetto delle altre (bordo, ombra, checklist verde, bottone arrotondato)
- Il link punterà a `/servizi/cv-cover-letter` come già previsto dal placeholder attuale
- Il prezzo €50 sarà l'elemento più prominente, come nelle altre card

## Lavoro svolto

**Data completamento:** 2026-03-07

**Dipendenze installate:** Nessuna

| File | Descrizione |
|------|-------------|
| `src/lib/consulenze.ts` | Reso `durataMinuti` opzionale nel tipo `Consulenza`. Aggiunti campi opzionali `ctaHref` e `ctaLabel`. Creato export `CV_COVER_LETTER` con tutti i dati. Aggiunto a `TUTTI_SERVIZI`. |
| `src/components/CardConsulenza.tsx` | Durata nascosta quando assente/0. CTA usa `ctaHref`/`ctaLabel` con fallback ai valori default. |
| `src/app/consulenze/page.tsx` | Rimosso placeholder inline `<Link>`, sostituito con `<CardConsulenza consulenza={CV_COVER_LETTER} />`. Rimossi import inutilizzati (`Link`, `ArrowRight`, `FileText`). |

**Verifica:** Build completata con successo (`npm run build`)
