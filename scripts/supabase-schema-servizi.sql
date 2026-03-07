-- Schema aggiuntivo per i servizi CV & Cover Letter e Mentorship
-- Eseguire in Supabase SQL Editor

-- Tabella invii CV
CREATE TABLE cv_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  testo TEXT NOT NULL,
  filename TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabella richieste mentorship
CREATE TABLE mentorship_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE cv_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: inserimento pubblico (form anonimi)
CREATE POLICY "CV inseribili da tutti"
  ON cv_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Mentorship inseribili da tutti"
  ON mentorship_submissions FOR INSERT
  WITH CHECK (true);
