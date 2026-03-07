"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Mail,
  Upload,
  FileText,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Prenotazione = {
  id: string;
  tipoConsulenza: string;
  data: string;
  orarioIT: string;
  orarioLocale: string;
  fusoLocale: string;
  durata: string;
};

function CVUploadBlock() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [errore, setErrore] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const ext = f.name.split(".").pop()?.toLowerCase();
    if (!["pdf", "doc", "docx"].includes(ext ?? "")) {
      setErrore("Formato non valido. Solo PDF, DOC o DOCX.");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setErrore("Il file è troppo grande. Dimensione massima: 5MB.");
      return;
    }
    setFile(f);
    setErrore(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setErrore(null);

    const formData = new FormData();
    formData.append("file", file);
    // Recupera nome/email dalla prenotazione salvata
    const stored = sessionStorage.getItem("mock_interview_user");
    if (stored) {
      const user = JSON.parse(stored);
      formData.append("nome", user.nome || "");
      formData.append("email", user.email || "");
    }

    try {
      const res = await fetch("/api/mock-interview-cv", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setUploaded(true);
      } else {
        const data = await res.json();
        setErrore(data.error || "Qualcosa è andato storto. Riprova.");
      }
    } catch {
      setErrore("Impossibile inviare il file. Riprova.");
    } finally {
      setUploading(false);
    }
  };

  if (uploaded) {
    return (
      <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
        <p className="text-sm text-emerald-700">
          Curriculum inviato con successo. Lo esaminerò prima del nostro incontro.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-1">
        Vuoi inviarmi il tuo curriculum?
      </h3>
      <p className="text-xs text-gray-400 mb-4">
        Puoi farlo adesso oppure inviarmelo direttamente via email prima
        della call. Ti aiuterà a rendere la mock interview più realistica.
      </p>

      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFile}
        className="hidden"
      />

      {file ? (
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 mb-3">
          <FileText className="h-5 w-5 text-emerald-600 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
            <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
          </div>
          <button
            type="button"
            onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = ""; }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 p-4 hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer mb-3"
        >
          <Upload className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-500">Carica il tuo CV</span>
        </button>
      )}

      {errore && (
        <p className="text-xs text-red-500 mb-3">{errore}</p>
      )}

      {file && (
        <Button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full rounded-full bg-black text-white hover:bg-gray-800"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Invio in corso...
            </>
          ) : (
            "Invia il tuo curriculum"
          )}
        </Button>
      )}
    </div>
  );
}

export default function ConfermaPage() {
  const [prenotazione, setPrenotazione] = useState<Prenotazione | null>(null);
  const [isMockInterview, setIsMockInterview] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("prenotazione_conferma");
    if (stored) {
      const parsed = JSON.parse(stored);
      setPrenotazione(parsed);
      setIsMockInterview(parsed.tipoConsulenza === "Mock Interview");
      sessionStorage.removeItem("prenotazione_conferma");
    }
  }, []);

  if (!prenotazione) {
    return (
      <div className="container mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Nessuna prenotazione</h1>
        <p className="text-gray-500 mb-8">
          Non abbiamo trovato una prenotazione da confermare.
        </p>
        <Link href="/#contatti">
          <Button variant="outline" className="rounded-full">
            Vai alle consulenze
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-lg px-4 py-16 md:py-24">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-4">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <p className="font-caveat text-xl text-gray-400 mb-2">Fatto!</p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          Prenotazione confermata
        </h1>
        <p className="text-gray-500 text-sm">
          Grazie per aver scelto Orizzonti Educativi. Non vedo l&apos;ora di
          incontrarti.
        </p>
      </div>

      {/* Riepilogo */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
          Riepilogo
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              {isMockInterview ? "Servizio" : "Consulenza"}
            </span>
            <span className="font-semibold">{prenotazione.tipoConsulenza}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Data</span>
            <span className="font-semibold">{prenotazione.data}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Orario</span>
            <span className="font-semibold">
              {prenotazione.orarioLocale} {prenotazione.fusoLocale}
              {prenotazione.fusoLocale && (
                <span className="text-gray-400 font-normal">
                  {" "}({prenotazione.orarioIT} ora italiana)
                </span>
              )}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Durata</span>
            <span className="font-semibold">{prenotazione.durata}</span>
          </div>
        </div>
      </div>

      {/* Nota email */}
      <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
        <Mail className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-medium text-emerald-800 mb-1">
            Controlla la tua email
          </p>
          <p className="text-sm text-emerald-700 leading-relaxed">
            Riceverai a breve un&apos;email con il riepilogo della prenotazione e le
            istruzioni per il pagamento tramite bonifico bancario.
          </p>
        </div>
      </div>

      {/* Upload CV opzionale per Mock Interview */}
      {isMockInterview && (
        <div className="mb-6">
          <CVUploadBlock />
        </div>
      )}

      {/* CTA */}
      <div className="text-center">
        <Link href="/">
          <Button className="rounded-full bg-black text-white hover:bg-gray-800 px-8 group">
            Torna alla homepage
            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
