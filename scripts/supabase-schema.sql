-- Schema database per il sistema di prenotazione consulenze
-- Eseguire in Supabase SQL Editor

-- Tabella configurazione consulenze
CREATE TABLE consulenze (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  descrizione TEXT NOT NULL,
  durata_minuti INT NOT NULL,
  prezzo DECIMAL(10,2) NOT NULL,
  attiva BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabella prenotazioni
CREATE TABLE prenotazioni (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo_consulenza TEXT NOT NULL,
  tipo_consulenza_slug TEXT NOT NULL,
  data DATE NOT NULL,
  orario TEXT NOT NULL,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  stato TEXT NOT NULL DEFAULT 'in_attesa_pagamento'
    CHECK (stato IN ('in_attesa_pagamento', 'confermata', 'annullata')),
  reminder_inviato BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indice unique per prevenire doppie prenotazioni sullo stesso slot
CREATE UNIQUE INDEX idx_prenotazioni_slot
  ON prenotazioni (data, orario)
  WHERE stato != 'annullata';

-- Indice per query reminder (prenotazioni confermate per data)
CREATE INDEX idx_prenotazioni_reminder
  ON prenotazioni (data, stato, reminder_inviato);

-- Inserimento consulenze iniziali
INSERT INTO consulenze (nome, slug, descrizione, durata_minuti, prezzo) VALUES
  ('Call di orientamento', 'call-di-orientamento', 'Uno spazio per raccontarti e fare ordine.', 40, 45.00),
  ('Percorso strutturato', 'percorso-strutturato', 'Per chi sente di voler partire.', 60, 80.00),
  ('Consulenza di chiarezza', 'consulenza-di-chiarezza', 'Non sono una migration agent. Questa consulenza è pensata per fare chiarezza, non per sostituire un agente.', 60, 120.00);

-- Row Level Security
ALTER TABLE prenotazioni ENABLE ROW LEVEL SECURITY;
ALTER TABLE consulenze ENABLE ROW LEVEL SECURITY;

-- Policy: le consulenze sono leggibili da tutti (anonimo)
CREATE POLICY "Consulenze leggibili da tutti"
  ON consulenze FOR SELECT
  USING (true);

-- Policy: le prenotazioni possono essere inserite da tutti (anonimo, per il form)
CREATE POLICY "Prenotazioni inseribili da tutti"
  ON prenotazioni FOR INSERT
  WITH CHECK (true);

-- Policy: le prenotazioni sono leggibili solo dal service role (API)
-- Il service role bypassa RLS, quindi non serve una policy SELECT per gli utenti anonimi
-- Le query SELECT sulle prenotazioni vengono fatte solo lato server con service role
