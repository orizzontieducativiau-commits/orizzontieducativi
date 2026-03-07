"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, FileText, CheckCircle2, Loader2, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MAX_WORDS = 200;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FORMATS = ".pdf,.doc,.docx";

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export default function CVCoverLetterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [testo, setTesto] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errore, setErrore] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = countWords(testo);
  const overLimit = wordCount > MAX_WORDS;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const ext = selected.name.split(".").pop()?.toLowerCase();
    if (!["pdf", "doc", "docx"].includes(ext ?? "")) {
      setErrore("Formato file non valido. Sono accettati solo PDF, DOC e DOCX.");
      return;
    }

    if (selected.size > MAX_FILE_SIZE) {
      setErrore("Il file è troppo grande. Dimensione massima: 5MB.");
      return;
    }

    setFile(selected);
    setErrore(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || overLimit) return;

    setLoading(true);
    setErrore(null);

    const formData = new FormData();
    formData.append("nome", nome.trim());
    formData.append("email", email.trim());
    formData.append("testo", testo.trim());
    formData.append("file", file);

    try {
      const res = await fetch("/api/cv-upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        setErrore(data.error || "Qualcosa è andato storto. Riprova tra qualche istante.");
      }
    } catch {
      setErrore("Impossibile inviare il curriculum. Controlla la connessione e riprova.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto max-w-lg px-4 py-16 md:py-24">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-4">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <p className="font-caveat text-xl text-gray-400 mb-2">Inviato!</p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            CV ricevuto con successo
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Grazie per aver inviato il tuo curriculum. Riceverai a breve
            un&apos;email con le informazioni sui prossimi passi.
          </p>
        </div>
        <div className="text-center">
          <Link href="/">
            <Button className="rounded-full bg-black text-white hover:bg-gray-800 px-8">
              Torna alla homepage
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 md:py-20">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Torna alla homepage
      </Link>

      {/* Header */}
      <div className="mb-8">
        <p className="font-caveat text-xl text-gray-400 mb-2">CV & Cover Letter</p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          Invia il tuo curriculum
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Questo spazio è dedicato alla preparazione del tuo curriculum secondo
          gli standard australiani del settore early childhood. Invia il tuo CV
          italiano e riceverai una versione ristrutturata insieme a una cover
          letter personalizzata.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 space-y-5">
          {/* Nome */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
              Nome e cognome *
            </label>
            <Input
              id="nome"
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Il tuo nome completo"
              className="rounded-lg border-gray-200"
              maxLength={100}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="La tua email"
              className="rounded-lg border-gray-200"
              maxLength={200}
            />
          </div>

          {/* Upload file */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Carica il tuo curriculum italiano *
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_FORMATS}
              onChange={handleFileChange}
              className="hidden"
            />
            {file ? (
              <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
                <FileText className="h-5 w-5 text-emerald-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-gray-200 p-6 hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Upload className="h-6 w-6 text-gray-400" />
                <span className="text-sm text-gray-500">
                  Clicca per caricare il file
                </span>
                <span className="text-xs text-gray-400">
                  PDF, DOC o DOCX · Max 5MB
                </span>
              </button>
            )}
          </div>

          {/* Textarea */}
          <div>
            <label htmlFor="testo" className="block text-sm font-medium text-gray-700 mb-1">
              Raccontami di te *
            </label>
            <textarea
              id="testo"
              required
              value={testo}
              onChange={(e) => setTesto(e.target.value)}
              placeholder="Raccontami brevemente di te, del tuo percorso di studi e della tua esperienza professionale finora. Questo mi aiuterà a capire meglio il tuo punto di partenza e a preparare una cover letter personalizzata."
              className="w-full min-h-[140px] rounded-lg border border-gray-200 p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
            />
            <div className="flex justify-end mt-1">
              <span
                className={`text-xs ${
                  overLimit ? "text-red-500 font-medium" : "text-gray-400"
                }`}
              >
                {wordCount}/{MAX_WORDS} parole
              </span>
            </div>
            {overLimit && (
              <p className="text-xs text-red-500 mt-1">
                Il testo supera il limite di {MAX_WORDS} parole.
              </p>
            )}
          </div>
        </div>

        {/* Nota rassicurante */}
        <div className="flex items-start gap-2 rounded-lg bg-gray-50 p-3">
          <Shield className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
          <p className="text-xs text-gray-500 leading-relaxed">
            I tuoi dati e il tuo documento sono al sicuro. Non verranno
            condivisi con terze parti.
          </p>
        </div>

        {/* Errore */}
        {errore && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3">
            <p className="text-sm text-red-700">{errore}</p>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading || !nome.trim() || !email.trim() || !testo.trim() || !file || overLimit}
          className="w-full rounded-full bg-black text-white hover:bg-gray-800 py-3"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Invio in corso...
            </>
          ) : (
            "Invia il tuo CV"
          )}
        </Button>
      </form>
    </div>
  );
}
