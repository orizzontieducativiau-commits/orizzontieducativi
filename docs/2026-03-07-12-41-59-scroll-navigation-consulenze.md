# Scroll Navigation — Hero Floating Card → Sezioni Homepage

**Data:** 2026-03-07
**Stato:** Completato

## Obiettivo

Convertire i 4 item della floating card nell'hero della homepage da link hash (`<Link href="#...">`) a onClick con `scrollIntoView({ behavior: 'smooth' })`, mantenendo l'attivazione dei tab corretti nelle sezioni target (Projects e Contact).

## Contesto attuale

La floating card nell'hero (`hero.tsx`) ha già 4 voci con href hash:

| Voce hero card       | href attuale            | Sezione target                     | Tab attivato    |
|----------------------|-------------------------|------------------------------------|-----------------|
| **Consulenze**       | `#contatti-consulenze`  | Contact (`id="contatti"`)          | "consulenze"    |
| **CV & Cover Letter**| `#consulenze-iniziamo`  | Projects (`id="consulenze"`)       | "dialogo"       |
| **Mock Interviews**  | `#consulenze-giorno`    | Projects (`id="consulenze"`)       | "giorno"        |
| **Mentorship**       | `#contatti-percorsi`    | Contact (`id="contatti"`)          | "percorsi"      |

I componenti `projects.tsx` e `contact.tsx` già ascoltano `hashchange` e attivano il tab corretto. **Il meccanismo funziona**, ma usa `<Link href="#hash">` e `window.location.hash`.

## Cosa cambiare

Secondo le regole fornite, bisogna passare da **hash links** a **scrollIntoView con onClick**:

1. **`hero.tsx`** → Estrarre la floating card in un componente client `HeroServiceCard`
   - Sostituire `<Link href={feature.href}>` con `<button onClick={...}>`
   - Implementare la funzione `scrollTo(id)` con `document.querySelector` + null-check + `scrollIntoView`

2. **Comunicazione tab** → Usare `CustomEvent` per comunicare al componente target quale tab attivare:
   - Hero dispatcha: `new CustomEvent('scrollnav', { detail: { section, tab } })`
   - Projects e Contact ascoltano `scrollnav` e attivano il tab corretto

3. **ID mapping** → I target di scroll rimangono gli ID esistenti (`consulenze` e `contatti`), con la CustomEvent che gestisce l'attivazione del tab.

## Mapping click → azione

| Click su              | scrollTo          | CustomEvent detail                          |
|----------------------|-------------------|---------------------------------------------|
| Consulenze           | `#contatti`       | `{ section: 'contatti', tab: 'consulenze' }`|
| CV & Cover Letter    | `#consulenze`     | `{ section: 'consulenze', tab: 'dialogo' }` |
| Mock Interviews      | `#consulenze`     | `{ section: 'consulenze', tab: 'giorno' }`  |
| Mentorship           | `#contatti`       | `{ section: 'contatti', tab: 'percorsi' }`  |

## File coinvolti

| File | Modifica |
|------|----------|
| `src/components/sections/hero.tsx` | Estrarre floating card in componente client, aggiungere onClick + scrollTo |
| `src/components/sections/projects.tsx` | Sostituire listener `hashchange` con listener `scrollnav` (CustomEvent) |
| `src/components/sections/contact.tsx` | Sostituire listener `hashchange` con listener `scrollnav` (CustomEvent) |

## Vincoli

- La floating card (layout, stile, contenuto) resta intatta
- `scrollIntoView({ behavior: 'smooth', block: 'start' })`
- Null-check con `console.warn` su ogni `querySelector`
- NO `href="#id"`, NO `window.location.hash`, NO `window.scrollTo`
- NO nuove sezioni/ID — uso quelli esistenti (`consulenze`, `contatti`)

## Lavoro svolto

**Data completamento:** 2026-03-07

**Dipendenze installate:** Nessuna

| File | Descrizione |
|------|-------------|
| `src/components/HeroServiceCard.tsx` | **Nuovo** — Componente client con `scrollTo()` + `CustomEvent` dispatch. Rende i 4 item come `<button>` con onClick. |
| `src/components/sections/hero.tsx` | Rimossi import `Link`, icone e array `features`. Importato `HeroServiceCard`. Sostituito blocco Link con `<HeroServiceCard />`. |
| `src/components/sections/projects.tsx` | Sostituito listener `hashchange` con listener `scrollnav` (CustomEvent). Filtra per `section === "consulenze"`. |
| `src/components/sections/contact.tsx` | Sostituito listener `hashchange` con listener `scrollnav` (CustomEvent). Filtra per `section === "contatti"`. |

**Verifica:** `npm run build` completato con successo (0 errori, 17 route generate).
