/**
 * Logica disponibilità per le consulenze.
 *
 * Giorni attivi: Lun(1), Mar(2), Ven(5), Sab(6), Dom(0)
 * Giorni disabilitati: Mer(3), Gio(4)
 *
 * Orari feriali (lun, mar, ven): ["12:00", "13:00", "14:00"]
 * Orari weekend (sab, dom): ["08:00", "09:00", "10:00", "11:00"]
 */

// Giorni della settimana abilitati (0 = Domenica, 6 = Sabato)
const GIORNI_ATTIVI = new Set([0, 1, 2, 5, 6]);

// Orari per tipo di giorno
const ORARI_FERIALI = ["12:00", "13:00", "14:00"];
const ORARI_WEEKEND = ["08:00", "09:00", "10:00", "11:00"];

/** Verifica se un giorno della settimana è prenotabile */
export function isGiornoAttivo(dayOfWeek: number): boolean {
  return GIORNI_ATTIVI.has(dayOfWeek);
}

/** Restituisce gli slot orari per un giorno della settimana */
export function getOrariPerGiorno(dayOfWeek: number): string[] {
  if (!isGiornoAttivo(dayOfWeek)) return [];
  if (dayOfWeek === 0 || dayOfWeek === 6) return ORARI_WEEKEND;
  return ORARI_FERIALI;
}

/** Verifica se una data è prenotabile (giorno attivo e non passato) */
export function isDataPrenotabile(date: Date): boolean {
  const oggi = new Date();
  oggi.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  if (target <= oggi) return false;
  return isGiornoAttivo(target.getDay());
}

/** Nomi italiani dei giorni della settimana */
export const GIORNI_SETTIMANA = [
  "Domenica",
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
] as const;

/** Nomi italiani dei mesi */
export const MESI = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
] as const;

/** Formatta una data in formato italiano leggibile: "Lunedì 10 Marzo 2026" */
export function formattaData(date: Date): string {
  const giorno = GIORNI_SETTIMANA[date.getDay()];
  const numero = date.getDate();
  const mese = MESI[date.getMonth()];
  const anno = date.getFullYear();
  return `${giorno} ${numero} ${mese} ${anno}`;
}

/** Formatta una data per l'API: "2026-03-10" */
export function formattaDataISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
