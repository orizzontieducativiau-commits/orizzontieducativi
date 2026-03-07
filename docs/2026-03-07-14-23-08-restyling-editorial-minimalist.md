# Restyling visivo — editorial minimalist aesthetic

**Data:** 2026-03-07
**Stato:** Completato

## Obiettivo
Applicare un restyling visivo ispirato a estetica editoriale minimalista: sfondo a griglia scolastica, header con logo centrato in 3 colonne, tipografia raffinata, e coerenza visiva. Nessuna modifica funzionale.

## File coinvolti

| File | Modifica |
|------|----------|
| `public/images/logo.png` | Nuovo — logo onda/sole (da fornire) |
| `src/app/globals.css` | Sfondo griglia CSS |
| `src/components/layout/header.tsx` | Layout 3 colonne, logo centrato, Consulenze pill |
| `src/components/sections/hero.tsx` | Rimuovere blob, aggiustare spacing/tipografia |
| `src/components/layout/footer.tsx` | Aggiornare placeholder brand |

## Approccio
- Sfondo griglia via CSS linear-gradient su body
- Header ristrutturato con 3 colonne (OE | logo | Blog + Consulenze pill)
- Hero senza blob decorativi, più breathing space
- Footer con "OE" e "orizzonti educativi"
- Nessun nuovo font o dipendenza

## Lavoro svolto

**Data completamento:** 2026-03-07

**Dipendenze installate:** Nessuna

| File | Descrizione |
|------|-------------|
| `src/app/globals.css` | Aggiunto sfondo griglia CSS (linear-gradient 40px) su body |
| `src/components/layout/header.tsx` | Layout 3 colonne: OE a sinistra, logo centrato (absolute), Blog testo + Consulenze pill a destra. Rimosso "Home", rimosso NavigationMenu. Mobile: Sheet con Blog e Consulenze |
| `src/components/sections/hero.tsx` | Rimossi 3 blob decorativi (amber, emerald, violet). Kicker text-gray-400, h1 text-4xl/5xl/6xl, subtitle text-gray-400. Aumentato spacing (pt-20/32, mt-12/16, pb-24/32) |
| `src/components/layout/footer.tsx` | "L" → "OE", "loremipsum" → "orizzonti educativi", copyright aggiornato |

**Build:** `npm run build` — superato senza errori

**Note:**
- Il file `public/images/logo.png` deve essere aggiunto manualmente dall'utente (immagine logo onda/sole)
- Senza il logo, il header mostrerà un'immagine mancante al centro
