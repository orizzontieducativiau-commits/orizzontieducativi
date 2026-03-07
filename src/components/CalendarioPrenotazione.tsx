"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isGiornoAttivo, isDataPrenotabile, MESI } from "@/lib/availability";
import { cn } from "@/lib/utils";

type Props = {
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
};

export function CalendarioPrenotazione({ onSelectDate, selectedDate }: Props) {
  const oggi = new Date();
  oggi.setHours(0, 0, 0, 0);

  const [meseCorrente, setMeseCorrente] = useState(oggi.getMonth());
  const [annoCorrente, setAnnoCorrente] = useState(oggi.getFullYear());

  // Genera i giorni del mese
  const giorniMese = useMemo(() => {
    const primoGiorno = new Date(annoCorrente, meseCorrente, 1);
    const ultimoGiorno = new Date(annoCorrente, meseCorrente + 1, 0);

    // Giorno della settimana del primo giorno (0=Dom, converto a Lun=0)
    let startDay = primoGiorno.getDay() - 1;
    if (startDay < 0) startDay = 6;

    const giorni: (Date | null)[] = [];

    // Celle vuote prima del primo giorno
    for (let i = 0; i < startDay; i++) {
      giorni.push(null);
    }

    // Giorni del mese
    for (let d = 1; d <= ultimoGiorno.getDate(); d++) {
      giorni.push(new Date(annoCorrente, meseCorrente, d));
    }

    return giorni;
  }, [meseCorrente, annoCorrente]);

  const mesePrecedente = () => {
    if (meseCorrente === 0) {
      setMeseCorrente(11);
      setAnnoCorrente(annoCorrente - 1);
    } else {
      setMeseCorrente(meseCorrente - 1);
    }
  };

  const meseSuccessivo = () => {
    if (meseCorrente === 11) {
      setMeseCorrente(0);
      setAnnoCorrente(annoCorrente + 1);
    } else {
      setMeseCorrente(meseCorrente + 1);
    }
  };

  const puoTornareIndietro =
    annoCorrente > oggi.getFullYear() ||
    (annoCorrente === oggi.getFullYear() && meseCorrente > oggi.getMonth());

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const headerGiorni = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
      {/* Header mese */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={mesePrecedente}
          disabled={!puoTornareIndietro}
          className="h-8 w-8 rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-sm font-semibold">
          {MESI[meseCorrente]} {annoCorrente}
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={meseSuccessivo}
          className="h-8 w-8 rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Header giorni settimana */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {headerGiorni.map((g) => (
          <div
            key={g}
            className="text-center text-xs font-medium text-gray-400 py-1"
          >
            {g}
          </div>
        ))}
      </div>

      {/* Griglia giorni */}
      <div className="grid grid-cols-7 gap-1">
        {giorniMese.map((giorno, i) => {
          if (!giorno) {
            return <div key={`empty-${i}`} />;
          }

          const prenotabile = isDataPrenotabile(giorno);
          const selected = isSelected(giorno);
          const giornoAttivo = isGiornoAttivo(giorno.getDay());

          return (
            <button
              key={giorno.toISOString()}
              onClick={() => prenotabile && onSelectDate(giorno)}
              disabled={!prenotabile}
              className={cn(
                "aspect-square rounded-lg text-sm font-medium transition-all",
                "flex items-center justify-center",
                prenotabile && !selected &&
                  "hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer",
                selected &&
                  "bg-black text-white hover:bg-gray-800",
                !prenotabile && giornoAttivo &&
                  "text-gray-300 cursor-not-allowed",
                !prenotabile && !giornoAttivo &&
                  "text-gray-200 cursor-not-allowed",
                prenotabile && !selected &&
                  "text-gray-700"
              )}
            >
              {giorno.getDate()}
            </button>
          );
        })}
      </div>

      {/* Legenda */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-gray-200" />
          <span className="text-xs text-gray-400">Non disponibile</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-black" />
          <span className="text-xs text-gray-400">Selezionato</span>
        </div>
      </div>
    </div>
  );
}
