"use client";

import { cn } from "@/lib/utils";
import { Clock, Loader2 } from "lucide-react";
import { convertiOrarioLocale, getFusoItaliano } from "@/lib/timezone";

type Slot = {
  orario: string;
  disponibile: boolean;
};

type Props = {
  slots: Slot[];
  selectedSlot: string | null;
  onSelectSlot: (orario: string) => void;
  loading: boolean;
  dataISO: string; // "2026-03-10" per la conversione fuso orario
};

export function SlotOrario({ slots, selectedSlot, onSelectSlot, loading, dataISO }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
        <span className="ml-2 text-sm text-gray-400">
          Caricamento orari disponibili...
        </span>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-4">
        Nessuno slot disponibile per questa data.
      </p>
    );
  }

  const fusoIT = getFusoItaliano(dataISO);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <Clock className="h-4 w-4 text-gray-400" />
        <p className="text-sm font-medium text-gray-700">
          Orari disponibili
        </p>
      </div>
      <p className="text-xs text-gray-400 mb-3">
        Orari convertiti nel tuo fuso orario locale
      </p>
      <div className="grid grid-cols-3 gap-2">
        {slots.map((slot) => {
          const { orarioLocale, fusoLocale } = convertiOrarioLocale(slot.orario, dataISO);

          return (
            <button
              key={slot.orario}
              onClick={() => slot.disponibile && onSelectSlot(slot.orario)}
              disabled={!slot.disponibile}
              className={cn(
                "px-4 py-3 rounded-lg border text-sm font-medium transition-all",
                slot.disponibile && selectedSlot !== slot.orario &&
                  "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer",
                selectedSlot === slot.orario &&
                  "bg-black text-white border-black",
                !slot.disponibile &&
                  "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed line-through"
              )}
            >
              <span className="block">{orarioLocale}</span>
              <span className={cn(
                "block text-[10px] mt-0.5",
                selectedSlot === slot.orario ? "text-gray-300" : "text-gray-400"
              )}>
                {fusoLocale}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-gray-400 mt-2">
        Orario italiano: {slots.map((s) => s.orario).join(", ")} {fusoIT}
      </p>
    </div>
  );
}
