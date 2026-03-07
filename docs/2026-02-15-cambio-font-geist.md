# Cambio font a Geist Sans (default shadcn/ui)

**Data:** 2026-02-15
**Stato:** Completato

## Obiettivo

Sostituire il font **Inter** con **Geist Sans** (font di default di shadcn/ui) su tutto il sito, mantenendo il font **Caveat** esclusivamente per la frase "La tua guida nel sistema educativo australiano" nella sezione Hero.

## Verifica compatibilità font

| Caratteristica | Supporto Geist Sans |
|---|---|
| Pesi (100-900) | Tutti supportati (thin, light, regular, medium, semibold, bold, extrabold, black) |
| Grassetto (700) | Supportato |
| Italico | Non supportato nativamente (solo stile `normal`) |
| Font variabile | Supportato (asse `wght`) |

**Nota:** Il sito attualmente non utilizza testo in italico, quindi l'assenza di supporto nativo per l'italico non ha impatto.

## Approccio tecnico

1. **Installare il pacchetto `geist`** (pacchetto ufficiale Vercel per Next.js) tramite `npm install geist`
2. **Aggiornare `src/app/layout.tsx`**: sostituire l'import di `Inter` da `next/font/google` con `GeistSans` da `geist/font/sans`
3. **Aggiornare la variabile CSS** in `src/app/globals.css`: cambiare `--font-sans` da `var(--font-inter)` a `var(--font-geist-sans)`

## File coinvolti

| File | Modifica |
|---|---|
| `package.json` | Aggiunta dipendenza `geist` |
| `src/app/layout.tsx` | Sostituzione import Inter → GeistSans, aggiornamento variabile CSS |
| `src/app/globals.css` | Aggiornamento `--font-sans` per puntare a Geist |

## Cosa NON cambia

- Il font **Caveat** resta invariato per "La tua guida nel sistema educativo australiano" (classe `font-caveat` in `hero.tsx`)
- Nessuna modifica ai componenti shadcn/ui in `src/components/ui/`
- Nessun altro file di sezione viene toccato

## Dipendenze

- `geist` (pacchetto npm ufficiale di Vercel)

## Lavoro svolto

**Data di completamento:** 2026-02-15

**Dipendenze installate:** `geist`

| File modificato | Descrizione |
|---|---|
| `package.json` / `package-lock.json` | Aggiunta dipendenza `geist` |
| `src/app/layout.tsx` | Rimosso import `Inter` da `next/font/google`, aggiunto import `GeistSans` da `geist/font/sans`, aggiornata classe CSS nel `<body>` |
| `src/app/globals.css` | Cambiata variabile `--font-sans` da `var(--font-inter)` a `var(--font-geist-sans)` |

**Esito verifica:** Build di produzione completata con successo (`npm run build` OK, nessun errore TypeScript)
