/**
 * Utility per la conversione degli orari dal fuso italiano (Europe/Rome)
 * al fuso locale del browser dell'utente.
 *
 * Gli slot nel DB sono sempre in ora italiana.
 * Queste funzioni servono solo per la VISUALIZZAZIONE lato client.
 */

/**
 * Converte un orario italiano in orario locale dell'utente.
 * @param orarioIT - Orario italiano, es. "12:00"
 * @param dataISO - Data in formato ISO, es. "2026-03-10"
 * @returns Oggetto con orario locale formattato e nome del fuso
 */
export function convertiOrarioLocale(orarioIT: string, dataISO: string) {
  // Costruisce un Date interpretato come ora italiana
  // Usiamo un approccio con due formatter per ottenere il timestamp corretto
  const [ore, minuti] = orarioIT.split(":");

  // Crea una data di riferimento in UTC e calcola l'offset italiano
  const refDate = new Date(`${dataISO}T${ore}:${minuti}:00`);

  // Formatter che interpreta nel fuso italiano
  const italiaFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Rome",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // Ottieni i componenti della data italiana per la stessa ref
  const italiaParts = italiaFormatter.formatToParts(refDate);
  const getVal = (type: string) =>
    italiaParts.find((p) => p.type === type)?.value ?? "0";

  const italiaDate = new Date(
    `${getVal("year")}-${getVal("month")}-${getVal("day")}T${getVal("hour")}:${getVal("minute")}:${getVal("second")}`
  );

  // Differenza tra l'orario italiano corrente e quello desiderato
  const desiredHour = parseInt(ore);
  const desiredMinute = parseInt(minuti);
  const italiaHour = parseInt(getVal("hour"));
  const italiaMinute = parseInt(getVal("minute"));

  const diffMs =
    (desiredHour - italiaHour) * 3600000 +
    (desiredMinute - italiaMinute) * 60000;

  // Applica la differenza per ottenere il timestamp corretto
  const correctTimestamp = new Date(refDate.getTime() + diffMs);

  // Formatta nell'ora locale dell'utente
  const localeFormatter = new Intl.DateTimeFormat("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const fusoFormatter = new Intl.DateTimeFormat("it-IT", {
    timeZoneName: "short",
  });

  const fusoParts = fusoFormatter.formatToParts(correctTimestamp);
  const fusoNome =
    fusoParts.find((p) => p.type === "timeZoneName")?.value ?? "";

  return {
    orarioLocale: localeFormatter.format(correctTimestamp),
    fusoLocale: fusoNome,
  };
}

/**
 * Restituisce l'abbreviazione del fuso orario italiano per una data.
 * Es. "CET" in inverno, "CEST" in estate.
 */
export function getFusoItaliano(dataISO: string): string {
  const date = new Date(`${dataISO}T12:00:00`);
  const formatter = new Intl.DateTimeFormat("it-IT", {
    timeZone: "Europe/Rome",
    timeZoneName: "short",
  });
  const parts = formatter.formatToParts(date);
  return parts.find((p) => p.type === "timeZoneName")?.value ?? "CET";
}

/**
 * Restituisce il nome del fuso orario locale dell'utente.
 */
export function getFusoLocale(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
