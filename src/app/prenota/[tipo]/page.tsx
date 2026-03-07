"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { CalendarioPrenotazione } from "@/components/CalendarioPrenotazione";
import { SlotOrario } from "@/components/SlotOrario";
import { FormPrenotazione } from "@/components/FormPrenotazione";
import { getConsulenzaBySlug } from "@/lib/consulenze";
import { formattaData, formattaDataISO } from "@/lib/availability";
import { convertiOrarioLocale, getFusoItaliano } from "@/lib/timezone";

type Slot = { orario: string; disponibile: boolean };

export default function PrenotaPage() {
  const params = useParams<{ tipo: string }>();
  const router = useRouter();
  const slug = params.tipo;
  const consulenza = getConsulenzaBySlug(slug);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errore, setErrore] = useState<string | null>(null);

  const dataISO = selectedDate ? formattaDataISO(selectedDate) : "";

  // Orario locale per il riepilogo nello step 3
  const orarioLocaleSummary = selectedSlot && dataISO
    ? convertiOrarioLocale(selectedSlot, dataISO)
    : null;
  const fusoIT = dataISO ? getFusoItaliano(dataISO) : "";

  // Carica slot quando si seleziona una data
  const caricaSlots = useCallback(async (date: Date) => {
    setLoadingSlots(true);
    setSlots([]);
    setSelectedSlot(null);
    setErrore(null);

    try {
      const iso = formattaDataISO(date);
      const res = await fetch(`/api/slots/${iso}`);
      const data = await res.json();

      if (res.ok && data.slots) {
        setSlots(data.slots);
      } else {
        setSlots([]);
      }
    } catch {
      setErrore("Impossibile caricare gli orari. Riprova tra poco.");
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      caricaSlots(selectedDate);
    }
  }, [selectedDate, caricaSlots]);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSelectSlot = (orario: string) => {
    setSelectedSlot(orario);
    setErrore(null);
  };

  const handleSubmit = async (dati: {
    nome: string;
    email: string;
    telefono: string;
  }) => {
    if (!selectedDate || !selectedSlot || !consulenza) return;

    setLoadingSubmit(true);
    setErrore(null);

    // Calcola orario locale per l'email
    const { orarioLocale, fusoLocale } = convertiOrarioLocale(
      selectedSlot,
      formattaDataISO(selectedDate)
    );

    try {
      const res = await fetch("/api/prenota", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: consulenza.slug,
          data: formattaDataISO(selectedDate),
          orario: selectedSlot,
          nome: dati.nome,
          email: dati.email,
          telefono: dati.telefono || undefined,
          orarioLocale,
          fusoLocale,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Salva dati conferma in sessionStorage per la pagina conferma
        sessionStorage.setItem(
          "prenotazione_conferma",
          JSON.stringify(data.prenotazione)
        );
        // Per mock interview: salva dati utente per upload CV opzionale
        if (consulenza.slug === "mock-interview") {
          sessionStorage.setItem(
            "mock_interview_user",
            JSON.stringify({ nome: dati.nome, email: dati.email })
          );
        }
        router.push("/conferma");
      } else {
        setErrore(
          data.error || "Si è verificato un errore. Riprova tra poco."
        );
        // Se lo slot è stato preso, ricarica gli slot
        if (res.status === 409) {
          caricaSlots(selectedDate);
        }
      }
    } catch {
      setErrore(
        "Impossibile completare la prenotazione. Controlla la connessione e riprova."
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  // Consulenza non trovata
  if (!consulenza) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Consulenza non trovata</h1>
        <p className="text-gray-500 mb-8">
          La tipologia di consulenza richiesta non esiste.
        </p>
        <Link
          href="/#contatti"
          className="text-sm font-medium underline underline-offset-4 hover:text-black"
        >
          Torna alle consulenze
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 md:py-20">
      {/* Back link */}
      <Link
        href="/#contatti"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Torna alle consulenze
      </Link>

      {/* Header consulenza */}
      <div className="mb-8">
        <p className="font-caveat text-xl text-gray-400 mb-2">Prenota</p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          {consulenza.nome}
        </h1>
        <p className="text-gray-500 text-sm mb-3">{consulenza.descrizione}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            {consulenza.durataMinuti} min
          </span>
          <span className="font-semibold text-black">
            {consulenza.prezzoLabel}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            Online · Zoom
          </span>
        </div>
      </div>

      {/* Step 1: Calendario */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          1. Scegli la data
        </h2>
        <CalendarioPrenotazione
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
        />
      </div>

      {/* Step 2: Slot orari (appare dopo selezione data) */}
      {selectedDate && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">
            2. Scegli l&apos;orario
          </h2>
          <p className="text-xs text-gray-400 mb-3">
            {formattaData(selectedDate)}
          </p>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
            <SlotOrario
              slots={slots}
              selectedSlot={selectedSlot}
              onSelectSlot={handleSelectSlot}
              loading={loadingSlots}
              dataISO={dataISO}
            />
          </div>
        </div>
      )}

      {/* Step 3: Form (appare dopo selezione slot) */}
      {selectedSlot && orarioLocaleSummary && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">
            3. I tuoi dati
          </h2>
          <p className="text-xs text-gray-400 mb-3">
            {formattaData(selectedDate!)} alle{" "}
            {orarioLocaleSummary.orarioLocale} {orarioLocaleSummary.fusoLocale}{" "}
            <span className="text-gray-300">
              ({selectedSlot} {fusoIT})
            </span>
          </p>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
            <FormPrenotazione
              onSubmit={handleSubmit}
              loading={loadingSubmit}
              errore={errore}
            />
          </div>
        </div>
      )}
    </div>
  );
}
