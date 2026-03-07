"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Shield } from "lucide-react";

type Props = {
  onSubmit: (dati: { nome: string; email: string; telefono: string }) => void;
  loading: boolean;
  errore: string | null;
};

export function FormPrenotazione({ onSubmit, loading, errore }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nome: nome.trim(), email: email.trim(), telefono: telefono.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <div>
        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
          Telefono{" "}
          <span className="text-gray-400 font-normal">(opzionale)</span>
        </label>
        <Input
          id="telefono"
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="+39 000 000 0000"
          className="rounded-lg border-gray-200"
          maxLength={30}
        />
      </div>

      {/* Nota rassicurante */}
      <div className="flex items-start gap-2 rounded-lg bg-gray-50 p-3">
        <Shield className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
        <p className="text-xs text-gray-500 leading-relaxed">
          Nessun pagamento online richiesto. Dopo la prenotazione riceverai le istruzioni
          per il bonifico bancario via email. I tuoi dati sono al sicuro e non verranno
          condivisi con terze parti.
        </p>
      </div>

      {/* Errore */}
      {errore && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3">
          <p className="text-sm text-red-700">{errore}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={loading || !nome.trim() || !email.trim()}
        className="w-full rounded-full bg-black text-white hover:bg-gray-800 py-3"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Prenotazione in corso...
          </>
        ) : (
          "Conferma prenotazione"
        )}
      </Button>
    </form>
  );
}
