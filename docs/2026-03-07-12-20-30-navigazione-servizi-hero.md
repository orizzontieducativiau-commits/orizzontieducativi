# Navigazione servizi Hero — Fix scroll targets

**Data:** 2026-03-07
**Stato:** Completato

## Obiettivo

Aggiornare i link di navigazione delle 4 card servizi nella Hero section in modo che ogni servizio porti l'utente alla sezione corretta della pagina.

## Situazione attuale

In `src/components/sections/hero.tsx` (righe 6-9), l'array `features` definisce i link:

| Servizio | href attuale | Destinazione attuale |
|----------|-------------|---------------------|
| Consulenze | `#contatti` | Sezione Contatti/Pricing |
| CV & Cover Letter | `#consulenze` | Sezione Consulenze (tab "Iniziamo") |
| Mock Interviews | `#consulenze` | Sezione Consulenze (tab "Iniziamo") |
| Mentorship | `#contatti` | Sezione Contatti/Pricing |

## Mapping richiesto

| Servizio | href nuovo | Destinazione |
|----------|-----------|-------------|
| Consulenze | `#consulenze` | Sezione Consulenze |
| CV & Cover Letter | `#consulenze` | Sezione Consulenze (tab "Iniziamo" — già corretto) |
| Mock Interviews | `#consulenze-giorno` | Sezione Consulenze → tab "Il giorno" (skip Iniziamo) |
| Mentorship | `#contatti` | Sezione Contatti/Pricing (tab "Percorsi") |

## Approccio tecnico

1. **`hero.tsx`** — Aggiornare l'array `features` con i nuovi `href` per ogni servizio.

2. **`projects.tsx`** — Già gestisce `#consulenze-giorno` (righe 66-84): quando l'hash è `#consulenze-giorno`, attiva il tab "giorno" e scrolla alla sezione. Nessuna modifica necessaria.

3. Per "Mentorship" → `#contatti` è già corretto poiché la sezione Percorsi è dentro la sezione Contatti. Eventualmente si potrebbe fare switch automatico al tab "percorsi", ma la richiesta dice solo "scroll to Percorsi".

## File coinvolti

| File | Modifica |
|------|----------|
| `src/components/sections/hero.tsx` | Aggiornare href nell'array features |

## Note

- La sezione Consulenze (`projects.tsx`) ha già il meccanismo hash-based per attivare il tab "giorno" tramite `#consulenze-giorno` (useEffect alle righe 66-84).
- Non si modifica il layout visivo delle card.
- Lo scroll smooth è gestito nativamente dal browser/componente esistente.

## Lavoro svolto

**Data completamento:** 2026-03-07

| File modificato | Descrizione |
|----------------|-------------|
| `src/components/sections/hero.tsx` | Aggiornato href di "Consulenze" da `#contatti` a `#consulenze`; aggiornato href di "Mock Interviews" da `#consulenze` a `#consulenze-giorno` |

**Dipendenze installate:** nessuna

**Verifica:** Il meccanismo hash-based in `projects.tsx` gestisce già `#consulenze-giorno` attivando il tab "giorno" con scroll smooth.
