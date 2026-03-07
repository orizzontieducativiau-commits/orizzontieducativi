"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageSquare,
  CalendarDays,
  Clock,
  Star,
  Paperclip,
  Quote,
  Loader2,
  Shield,
} from "lucide-react";
import { CalendarioPrenotazione } from "@/components/CalendarioPrenotazione";
import {
  formattaData,
  formattaDataISO,
  getOrariPerGiorno,
} from "@/lib/availability";
import { convertiOrarioLocale, getFusoItaliano } from "@/lib/timezone";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    text: "Ciao Sofia! Grazie per la consulenza fantastica, onesta e molto delicata nel darmi le tue opinioni, è sembrata una chiacchierata con un\u2019amica. Mirate le tue risposte riguardo gli eventuali percorsi da intraprendere. Sicuramente mi hai dato l\u2019impressione di essere, oltre che professionale, molto affidabile\u2026 grazie ancora!",
    author: "Silvia",
  },
  {
    text: "Grazie Sofia :) ti ringrazio davvero per il supporto e i consigli che mi hai dato nel percorso verso l\u2019Australia. Sono stati molto utili e chiarificatori. Ti ricontatter\u00f2 sicuramente pi\u00f9 avanti non appena avr\u00f2 definito meglio i prossimi passi. A presto e grazie ancora! \u2728\ud83c\udf3a",
    author: "Gloria",
  },
  {
    text: "Ho avuto il piacere di fare una consulenza con Sofia e la consiglio davvero a chiunque voglia trasferirsi in Australia e lavorare in ambito educativo o sociale. Sofia \u00e8 la prima consulente specializzata in questi settori, un valore aggiunto enorme per chi cerca informazioni chiare, mirate e concrete. \u00c8 stata una chiacchierata piacevole, Sofia ti fa subito sentire a tuo agio e cerca in primis di conoscerti come persona, per poi offrire consigli davvero personalizzati. Professionale, competente e allo stesso tempo molto umana \u263a\ufe0f",
    author: "B.",
  },
];

const navItems = [
  {
    value: "dialogo",
    icon: MessageSquare,
    label: "Iniziamo",
    helper: "Comincia il dialogo",
  },
  {
    value: "giorno",
    icon: CalendarDays,
    label: "Il giorno",
    helper: "Scegli il giorno disponibile",
  },
  {
    value: "orario",
    icon: Clock,
    label: "L'orario",
    helper: "Trova l'orario giusto",
  },
  {
    value: "recensioni",
    icon: Star,
    label: "Recensioni",
    helper: "Leggi le esperienze",
  },
];

type Slot = { orario: string; disponibile: boolean };

export function Projects() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dialogo");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [testo, setTesto] = useState("");

  // Slot availability from API
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Booking form state
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errore, setErrore] = useState<string | null>(null);

  const dataISO = selectedDate ? formattaDataISO(selectedDate) : "";

  // Listen for scrollnav CustomEvent from hero card
  useEffect(() => {
    const handleScrollNav = (e: Event) => {
      const { section, tab } = (e as CustomEvent).detail;
      if (section !== "consulenze") return;
      setActiveTab(tab);
    };

    window.addEventListener("scrollnav", handleScrollNav);
    return () => window.removeEventListener("scrollnav", handleScrollNav);
  }, []);

  // Load slots when date changes
  const caricaSlots = useCallback(async (date: Date) => {
    setLoadingSlots(true);
    setSlots([]);
    setSelectedTime(null);
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
      setSlots([]);
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
    setActiveTab("orario");
  };

  // Timezone conversion for display
  const selectedSlotLocal = selectedTime && dataISO
    ? convertiOrarioLocale(selectedTime, dataISO)
    : null;
  const fusoIT = dataISO ? getFusoItaliano(dataISO) : "";

  // Booking form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setLoadingSubmit(true);
    setErrore(null);

    const { orarioLocale, fusoLocale } = convertiOrarioLocale(
      selectedTime,
      formattaDataISO(selectedDate)
    );

    try {
      // Default to "call-di-orientamento" for homepage booking
      const res = await fetch("/api/prenota", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: "call-di-orientamento",
          data: formattaDataISO(selectedDate),
          orario: selectedTime,
          nome,
          email,
          telefono: telefono || undefined,
          orarioLocale,
          fusoLocale,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem(
          "prenotazione_conferma",
          JSON.stringify(data.prenotazione)
        );
        router.push("/conferma");
      } else {
        setErrore(
          data.error || "Si è verificato un errore. Riprova tra poco."
        );
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

  const wordCount = testo.split(/\s+/).filter(Boolean).length;
  const overLimit = wordCount > 200;
  const nearLimit = wordCount >= 180;

  return (
    <section id="consulenze" className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Section header — centered, editorial style */}
        <div className="text-center mb-14">
          <p className="font-caveat text-2xl md:text-3xl text-gray-400 mb-3">
            I tuoi prossimi passi verso l&apos;Australia
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tighter text-gray-900 mb-4">
            Consulenza personalizzata per educatori italiani in Australia
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
            Uno spazio strutturato e trasparente per orientarti, scegliere e
            prenotare con consapevolezza.
          </p>
        </div>

        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-10 items-start">
          {/* Left column — vertical navigation */}
          <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {navItems.map((item) => {
              const isActive = activeTab === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => setActiveTab(item.value)}
                  className={cn(
                    "flex items-center gap-4 px-4 py-4 rounded-2xl text-left transition-all duration-200 shrink-0 md:shrink md:w-full",
                    isActive
                      ? "bg-white border border-gray-200 shadow-sm"
                      : "bg-transparent border border-transparent hover:bg-gray-50"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors",
                      isActive ? "bg-gray-100" : "bg-gray-50"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-4.5 w-4.5",
                        isActive ? "text-gray-700" : "text-gray-400"
                      )}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "text-sm font-medium transition-colors",
                        isActive ? "text-gray-900" : "text-gray-500"
                      )}
                    >
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-400 hidden md:block">
                      {item.helper}
                    </p>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Right column — content panel */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8 min-h-[400px]">
            {/* Tab 1 — Iniziamo dal dialogo */}
            {activeTab === "dialogo" && (
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-medium text-gray-900">
                    Iniziamo dal dialogo
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    Ogni percorso inizia da una storia.
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Questo spazio è dedicato al primo contatto.
                    Per poterti accompagnare nel modo più utile possibile, ti chiedo
                    di raccontarmi brevemente il tuo percorso di studi e la tua
                    esperienza professionale fino ad oggi.
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Queste informazioni mi aiuteranno a comprendere meglio il tuo
                    punto di partenza e a preparare materiali personalizzati per il
                    contesto educativo australiano.
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    È un modo per iniziare a conoscerci.
                  </p>
                </div>

                <div className="space-y-3 mb-5">
                  <Input
                    placeholder="Il tuo nome"
                    className="rounded-xl border-gray-200 text-sm h-11"
                  />
                  <Input
                    type="email"
                    placeholder="La tua email"
                    className="rounded-xl border-gray-200 text-sm h-11"
                  />
                  <div>
                    <textarea
                      placeholder="Raccontami di te, del tuo percorso di studi e della tua esperienza professionale finora…"
                      value={testo}
                      onChange={(e) => setTesto(e.target.value)}
                      className="w-full min-h-[120px] rounded-xl border border-gray-200 p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                    />
                    <p className={`text-xs text-right mt-1 ${
                      overLimit ? "text-red-500 font-medium" : nearLimit ? "text-amber-500" : "text-gray-400"
                    }`}>
                      {wordCount}/200
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                    <Paperclip className="h-3.5 w-3.5" />
                    Allega il tuo curriculum
                  </button>
                  <Button
                    size="sm"
                    disabled={overLimit}
                    className="rounded-full bg-black text-white hover:bg-gray-800 px-6 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Invia
                  </Button>
                </div>

                <p className="text-xs text-gray-400 mt-3">
                  Riceverai risposta entro 24–48 ore.
                </p>
              </div>
            )}

            {/* Tab 2 — Scegli il giorno */}
            {activeTab === "giorno" && (
              <div>
                <div className="mb-5 space-y-1">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Seleziona il giorno che senti più adatto.
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    La consulenza è uno spazio dedicato. Merita tempo e
                    presenza.
                  </p>
                </div>
                <CalendarioPrenotazione
                  selectedDate={selectedDate}
                  onSelectDate={handleSelectDate}
                />
              </div>
            )}

            {/* Tab 3 — Scegli l'orario + inline booking form */}
            {activeTab === "orario" && (
              <div className="space-y-6">
                {/* Time slot selection */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-medium text-gray-900">
                      Scegli l&apos;orario
                    </span>
                  </div>

                  <div className="space-y-1 mb-4">
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Ogni consulenza dura 60 minuti. Un tempo dedicato per
                      approfondire il tuo percorso professionale in Australia,
                      senza fretta.
                    </p>
                    {selectedDate && (
                      <p className="text-xs text-gray-400 mt-1">
                        {formattaData(selectedDate)} · Consulenza online via Zoom
                      </p>
                    )}
                  </div>

                  {/* Slot grid */}
                  <div>
                    {loadingSlots ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                        <span className="ml-2 text-sm text-gray-400">
                          Caricamento orari...
                        </span>
                      </div>
                    ) : slots.length === 0 && selectedDate ? (
                      <p className="text-sm text-gray-400 text-center py-6">
                        Nessuno slot disponibile per questa data.
                      </p>
                    ) : !selectedDate ? (
                      <p className="text-sm text-gray-400 text-center py-6">
                        Seleziona prima un giorno dal calendario.
                      </p>
                    ) : (
                      <>
                        <p className="text-xs text-gray-400 mb-3">
                          Orari nel tuo fuso orario locale
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {slots.map((slot) => {
                            const { orarioLocale, fusoLocale } = convertiOrarioLocale(
                              slot.orario,
                              dataISO
                            );
                            return (
                              <button
                                key={slot.orario}
                                onClick={() =>
                                  slot.disponibile && setSelectedTime(slot.orario)
                                }
                                disabled={!slot.disponibile}
                                className={cn(
                                  "px-3 py-3 rounded-xl border text-sm font-medium transition-all",
                                  slot.disponibile &&
                                    selectedTime !== slot.orario &&
                                    "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer",
                                  selectedTime === slot.orario &&
                                    "bg-black text-white border-black",
                                  !slot.disponibile &&
                                    "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed line-through"
                                )}
                              >
                                <span className="block">{orarioLocale}</span>
                                <span
                                  className={cn(
                                    "block text-[10px] mt-0.5",
                                    selectedTime === slot.orario
                                      ? "text-gray-300"
                                      : "text-gray-400"
                                  )}
                                >
                                  {fusoLocale}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          Orario italiano:{" "}
                          {slots
                            .filter((s) => s.disponibile)
                            .map((s) => s.orario)
                            .join(", ")}{" "}
                          {fusoIT}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Inline booking form — appears after selecting a time */}
                {selectedTime && selectedSlotLocal && selectedDate && (
                  <div className="border-t border-gray-100 pt-6">
                    {/* Booking recap */}
                    <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800 mb-5">
                      <p className="font-medium">Il tuo appuntamento:</p>
                      <p>
                        {formattaData(selectedDate)} alle{" "}
                        {selectedSlotLocal.orarioLocale} {selectedSlotLocal.fusoLocale}
                        <span className="text-emerald-600">
                          {" "}({selectedTime} {fusoIT})
                        </span>
                      </p>
                    </div>

                    {/* Form */}
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">
                      I tuoi dati
                    </h3>
                    <p className="text-xs text-gray-400 mb-4">
                      Compila i tuoi dati per ricevere l&apos;email con il
                      riepilogo della prenotazione e le istruzioni per il
                      pagamento.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="text"
                        placeholder="Nome e cognome *"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        maxLength={100}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300"
                      />
                      <input
                        type="email"
                        placeholder="Email *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        maxLength={200}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300"
                      />
                      <input
                        type="tel"
                        placeholder="Telefono (opzionale)"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        maxLength={30}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300"
                      />

                      {errore && (
                        <p className="text-xs text-red-500">{errore}</p>
                      )}

                      {/* Info note */}
                      <div className="flex items-start gap-2 py-2">
                        <Shield className="h-4 w-4 text-gray-300 mt-0.5 shrink-0" />
                        <p className="text-xs text-gray-400 leading-relaxed">
                          Nessun pagamento online richiesto. Dopo la prenotazione
                          riceverai le istruzioni per il bonifico bancario via
                          email. I tuoi dati sono al sicuro e non verranno
                          condivisi con terze parti.
                        </p>
                      </div>

                      <Button
                        type="submit"
                        disabled={loadingSubmit}
                        className="w-full rounded-full bg-black text-white hover:bg-gray-800"
                      >
                        {loadingSubmit ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Prenotazione in corso...
                          </>
                        ) : (
                          "Conferma prenotazione"
                        )}
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* Tab 4 — Cosa dicono gli altri */}
            {activeTab === "recensioni" && (
              <div>
                <p className="text-sm text-gray-500 mb-6">
                  Le parole di chi ha già attraversato questo percorso.
                </p>

                <div className="space-y-4">
                  {testimonials.map((t) => (
                    <div
                      key={t.author}
                      className="rounded-2xl border border-gray-100 bg-gray-50/50 p-5"
                    >
                      <Quote className="h-5 w-5 text-emerald-300 mb-3" />
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {t.text}
                      </p>
                      <p className="mt-3 text-sm font-semibold text-gray-800">
                        — {t.author}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
