# Riorganizzazione contenuti — Blog → Sezioni "Gli ambiti di orientamento"

**Data:** 2026-03-07
**Stato:** Completato

## Obiettivo

Spostare i due articoli informativi dal Blog alle rispettive sezioni in "Gli ambiti di orientamento". Il Blog rimarrà riservato esclusivamente ai contenuti di documentazione pedagogica.

## Approccio tecnico

### 1. Creare la pagina `/sistema-educativo-australiano` con il contenuto dell'articolo "Come funziona il sistema educativo..."

Il file `src/app/sistema-educativo-australiano/page.tsx` esiste già come placeholder. Verrà sostituito con il contenuto completo fornito dall'utente, strutturato con le stesse convenzioni UI del sito (classi Tailwind, prose styling). In fondo, un CTA che scrolla alla sezione `#iniziamo`.

La card blu "Comprendere il sistema australiano" già punta a `/sistema-educativo-australiano` — nessuna modifica necessaria al link.

### 2. Creare la pagina per "Terminologie e ruoli professionali"

La card gialla punta a `/sistema-educativo-australiano#ruoli-educativi`. Opzioni:
- **Opzione A:** Creare una pagina dedicata `/ruoli-educativi` e aggiornare il link nella card
- **Opzione B:** Aggiungere il contenuto come sezione con `id="ruoli-educativi"` nella stessa pagina `/sistema-educativo-australiano`

**Scelta:** Opzione A — pagina dedicata `/ruoli-educativi` per coerenza con la struttura "ogni card → sua pagina". Aggiornare l'href della card gialla.

### 3. Rimuovere i due articoli MDX dal Blog

Eliminare:
- `content/blog/come-funziona-il-sistema-educativo-australiano.mdx`
- `content/blog/differenza-ece-ect.mdx`

Il Blog manterrà solo l'articolo sulla permacultura e futuri articoli pedagogici.

### 4. Aggiungere sezione `#iniziamo` se non esiste

Il CTA "Contattami per una consulenza personalizzata" deve scrollare a `#iniziamo`. Verificare se esiste questa sezione/id, altrimenti aggiungerlo nel punto appropriato (presumibilmente la sezione contatti/consulenze).

## File coinvolti

| File | Modifica |
|------|----------|
| `src/app/sistema-educativo-australiano/page.tsx` | Sostituire placeholder con contenuto completo articolo 1 + CTA |
| `src/app/ruoli-educativi/page.tsx` | **Nuovo** — Contenuto completo articolo 2 |
| `src/components/sections/services.tsx` | Aggiornare href card gialla da `/sistema-educativo-australiano#ruoli-educativi` a `/ruoli-educativi` |
| `content/blog/come-funziona-il-sistema-educativo-australiano.mdx` | **Eliminare** |
| `content/blog/differenza-ece-ect.mdx` | **Eliminare** |

## Dipendenze

Nessuna nuova dipendenza.

## Note

- Il design delle nuove pagine seguirà lo stile editoriale già usato nel sito (prose, max-w-3xl, stessi font e colori)
- Le card nella sezione "Gli ambiti di orientamento" continueranno a funzionare come link alle pagine dedicate
- Il Blog mostrerà solo contenuti di documentazione pedagogica

## Lavoro svolto

**Data completamento:** 2026-03-07

**Dipendenze installate:** Nessuna

| File | Descrizione |
|------|-------------|
| `src/app/sistema-educativo-australiano/page.tsx` | Sostituito placeholder con contenuto completo (NQF, 7 aree qualità, qualifiche, riconoscimento titoli) + CTA verso `/consulenze` |
| `src/app/ruoli-educativi/page.tsx` | **Nuovo** — Contenuto ECE vs ECT (responsabilità, percorsi, stipendi) + CTA verso `/consulenze` |
| `src/components/sections/services.tsx` | Aggiornato href card gialla da `/sistema-educativo-australiano#ruoli-educativi` a `/ruoli-educativi` |
| `content/blog/come-funziona-il-sistema-educativo-australiano.mdx` | **Eliminato** |
| `content/blog/differenza-ece-ect.mdx` | **Eliminato** |

**Verifica:** Build completata con successo. Blog mostra solo l'articolo sulla permacultura. Nuove pagine `/sistema-educativo-australiano` e `/ruoli-educativi` accessibili e pre-renderizzate staticamente.
