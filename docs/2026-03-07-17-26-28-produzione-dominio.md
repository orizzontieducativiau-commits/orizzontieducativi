# Preparazione al deploy in produzione — Dominio www.orizzontieducativi.com.au

**Data:** 2026-03-07
**Stato:** Completato

## Obiettivo

Preparare il sito Next.js per il deploy in produzione su Vercel e collegarlo al dominio custom `www.orizzontieducativi.com.au`.

## Approccio tecnico

1. Introdurre la variabile `NEXT_PUBLIC_SITE_URL` per gestire URL assolute (dev: localhost, prod: dominio reale)
2. Aggiornare i metadata nel root layout (metadataBase, Open Graph, Twitter card)
3. Creare sitemap.ts e robots.ts per SEO
4. Documentare la procedura di deploy e collegamento dominio

## Lavoro svolto

**Data completamento:** 2026-03-07

**Dipendenze installate:** Nessuna

### File modificati

| File | Descrizione |
|------|-------------|
| `src/app/layout.tsx` | Aggiunto metadataBase, metadata reali (titolo, descrizione), Open Graph, Twitter card, canonical URL |
| `src/app/sitemap.ts` | Creato — sitemap dinamica con tutte le route statiche + blog posts |
| `src/app/robots.ts` | Creato — consente crawling, blocca /api/, link a sitemap |
| `.env.local` | Aggiunto `NEXT_PUBLIC_SITE_URL=http://localhost:3000` |
| `.env.local.example` | Aggiunto `NEXT_PUBLIC_SITE_URL=https://www.orizzontieducativi.com.au` |
| `.env.production` | Creato con `NEXT_PUBLIC_SITE_URL=https://www.orizzontieducativi.com.au` |

### Esito verifica

- `npm run build`: OK (19 pagine, 0 errori, 0 warning)
- `/sitemap.xml` e `/robots.txt` generati correttamente
- Nessun riferimento hardcoded a localhost nel codice sorgente
- Sviluppo locale non impattato (usa localhost:3000 da .env.local)

### Note — Secrets `.env.local`

Il file `.env.local` non è mai stato committato nel repository (protetto da `.gitignore`). I secrets (Supabase, Resend, CRON_SECRET) non sono esposti.

---

## Guida al deploy su Vercel

### 1. Collegare il repository GitHub

1. Vai su [vercel.com](https://vercel.com) e accedi
2. Clicca "Add New Project"
3. Importa il repository `orizzontieducativiau-commits/orizzontieducativi`
4. Framework: verrà auto-rilevato come Next.js
5. Clicca "Deploy"

### 2. Configurare le variabili d'ambiente su Vercel

Nella dashboard del progetto Vercel: **Settings → Environment Variables**

Aggiungi queste variabili per l'ambiente **Production**:

| Variabile | Valore |
|-----------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.orizzontieducativi.com.au` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://rrbzkmxxqkhzvhcpvdnw.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *(la tua anon key)* |
| `SUPABASE_SERVICE_ROLE_KEY` | *(la tua service role key)* |
| `RESEND_API_KEY` | *(la tua API key Resend)* |
| `CRON_SECRET` | *(il tuo cron secret)* |

### 3. Aggiungere il dominio custom

1. Nella dashboard Vercel: **Settings → Domains**
2. Aggiungi `www.orizzontieducativi.com.au`
3. Aggiungi anche `orizzontieducativi.com.au` (redirect automatico a www)

### 4. Configurare i DNS

Nel pannello del registrar del dominio `.com.au`, configura:

| Tipo | Nome | Valore |
|------|------|--------|
| CNAME | www | `cname.vercel-dns.com` |
| A | @ | `76.76.21.21` |

Vercel genererà automaticamente il certificato SSL.

### 5. Verificare il dominio Resend

Per inviare email da `noreply@orizzontieducativiau.com` in produzione:
1. Vai su [resend.com/domains](https://resend.com/domains)
2. Verifica che il dominio `orizzontieducativiau.com` sia configurato con i record DNS corretti (SPF, DKIM, DMARC)

### 6. Vercel Cron Jobs

Il file `vercel.json` configura già il cron job per `/api/reminder` (ogni ora). Funzionerà automaticamente dopo il deploy. L'endpoint è protetto dal `CRON_SECRET`.

---

## Deployment Checklist

- [ ] Repository collegato a Vercel
- [ ] Variabili d'ambiente configurate su Vercel (tutte e 6)
- [ ] Dominio `www.orizzontieducativi.com.au` aggiunto su Vercel
- [ ] Dominio `orizzontieducativi.com.au` (apex) aggiunto su Vercel
- [ ] Record DNS configurati (CNAME www + A record @)
- [ ] SSL attivo (automatico Vercel)
- [ ] Dominio Resend verificato per email in produzione
- [ ] Build di produzione riuscita su Vercel
- [ ] Sitemap accessibile: `https://www.orizzontieducativi.com.au/sitemap.xml`
- [ ] Robots.txt accessibile: `https://www.orizzontieducativi.com.au/robots.txt`
- [ ] Open Graph verificato con [opengraph.xyz](https://www.opengraph.xyz/)
- [ ] Cron job `/api/reminder` funzionante (verificare nei log Vercel)
- [ ] Inviare sitemap a Google Search Console
