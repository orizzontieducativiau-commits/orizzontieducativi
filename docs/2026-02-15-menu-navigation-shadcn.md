# Sostituzione menu header con Navigation Menu shadcn/ui

**Data:** 2026-02-15
**Stato:** Completato

## Obiettivo

Sostituire il menu di navigazione attuale nell'header con il componente **Navigation Menu** di shadcn/ui. Le voci saranno:

| Voce | Destinazione |
|------|-------------|
| Home | `/` |
| Blog | `/sistema-educativo-australiano` (nuova pagina) |
| Tools | `/consulenze` (nuova pagina) |

Aggiungere un effetto hover sulle singole voci del menu.

## Approccio tecnico

1. **Installare il componente** `navigation-menu` di shadcn/ui tramite CLI (`npx shadcn@latest add navigation-menu`)
2. **Modificare `src/components/layout/header.tsx`**:
   - Rimuovere il vecchio array `navLinks` e la navigazione custom
   - Importare `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuLink`, `navigationMenuTriggerStyle` da `@/components/ui/navigation-menu`
   - Usare `NavigationMenuLink` con `asChild` + Next.js `Link` per ciascuna voce
   - Applicare stile hover personalizzato (transizione colore/underline) sulle voci
   - Aggiornare anche il menu mobile (Sheet) con le nuove voci
   - Rimuovere il bottone "Start Now" non più necessario
3. **Creare le pagine placeholder**:
   - `src/app/sistema-educativo-australiano/page.tsx`
   - `src/app/consulenze/page.tsx`

## File coinvolti

| File | Azione |
|------|--------|
| `src/components/ui/navigation-menu.tsx` | Creato (generato da shadcn CLI) |
| `src/components/layout/header.tsx` | Modificato |
| `src/app/sistema-educativo-australiano/page.tsx` | Creato (placeholder) |
| `src/app/consulenze/page.tsx` | Creato (placeholder) |

## Dipendenze

- Componente shadcn `navigation-menu` (basato su `@radix-ui/react-navigation-menu`, già incluso nel pacchetto `radix-ui`)

## Lavoro svolto

**Data completamento:** 2026-02-15

**Dipendenze installate:** `navigation-menu` (shadcn/ui component)

| File | Descrizione |
|------|-------------|
| `src/components/ui/navigation-menu.tsx` | Generato da `npx shadcn@latest add navigation-menu` |
| `src/components/layout/header.tsx` | Sostituito menu custom con `NavigationMenu` shadcn/ui, voci Home/Blog/Tools, effetto hover con underline animata e cambio colore |
| `src/app/sistema-educativo-australiano/page.tsx` | Pagina placeholder per Blog |
| `src/app/consulenze/page.tsx` | Pagina placeholder per Tools |

**Verifica:** Build (`npm run build`) completata con successo, tutte e 3 le route generate correttamente.
