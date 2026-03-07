# Script importatore articoli blog

**Data:** 2026-03-05
**Stato:** Completato

## Obiettivo

Creare uno script Node.js che importa un articolo blog da un file ZIP contenente un file `.md` + cartella immagini. Lo script:

1. Chiede interattivamente lo **slug** dell'articolo
2. Estrae lo ZIP in una cartella temporanea
3. Trova il file `.md` e le immagini
4. Copia le immagini in `public/images/blog/[slug]/`
5. Aggiorna i riferimenti alle immagini nel markdown per puntare a `/images/blog/[slug]/`
6. Genera il file `.mdx` in `content/blog/[slug].mdx` con frontmatter precompilato (titolo estratto dall'H1 del markdown, slug, data odierna) e campi da compilare manualmente (description, tags)
7. Mostra un riepilogo finale

## Utilizzo

```bash
node scripts/import-blog.mjs percorso/al/file.zip
```

## File coinvolti

| File | Azione | Descrizione |
|------|--------|-------------|
| `scripts/import-blog.mjs` | Nuovo | Script importatore |

## Note

- Usa solo moduli Node.js built-in (`fs`, `path`, `child_process`, `readline`, `os`) + `unzip` di sistema
- Nessuna dipendenza aggiuntiva
- Lo script è ESM (`.mjs`)

## Lavoro svolto

**Data di completamento:** 2026-03-05

| File | Azione | Descrizione |
|------|--------|-------------|
| `scripts/import-blog.mjs` | Nuovo | Script importatore articoli blog da ZIP |

**Esito verifica:** Script testato, si avvia correttamente e mostra messaggio di utilizzo.
