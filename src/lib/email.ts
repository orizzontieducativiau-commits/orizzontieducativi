import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

// In sviluppo usa il dominio di test Resend; in produzione usa il dominio verificato
const FROM_EMAIL = process.env.NODE_ENV === "production"
  ? "Orizzonti Educativi <noreply@orizzontieducativiau.com>"
  : "Orizzonti Educativi <onboarding@resend.dev>";

type PrenotazioneEmail = {
  nome: string;
  email: string;
  tipoConsulenza: string;
  data: string; // "Lunedì 10 Marzo 2026"
  orario: string; // "12:00" (orario italiano)
  prezzo: string; // "€45"
  durata: string; // "40 minuti"
  orarioLocale?: string; // "22:00" (orario nel fuso dell'utente)
  fusoLocale?: string; // "AEDT"
};

/** Formatta la riga orario per l'email: mostra locale + italiano */
function formatOrarioEmail(orario: string, orarioLocale?: string, fusoLocale?: string): string {
  if (orarioLocale && fusoLocale) {
    return `${orarioLocale} ${fusoLocale} (${orario} ora italiana)`;
  }
  return `${orario} (ora italiana)`;
}

/** Invia email di conferma prenotazione con istruzioni per il bonifico */
export async function inviaEmailConferma(prenotazione: PrenotazioneEmail) {
  const { nome, email, tipoConsulenza, data, orario, durata, prezzo, orarioLocale, fusoLocale } = prenotazione;

  const orarioDisplay = formatOrarioEmail(orario, orarioLocale, fusoLocale);

  const html = `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#FAFAF7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background-color:#000;color:#fff;font-weight:bold;font-size:18px;width:40px;height:40px;line-height:40px;border-radius:8px;">
        OE
      </div>
      <p style="margin:8px 0 0;font-size:14px;color:#666;">Orizzonti Educativi</p>
    </div>

    <!-- Saluto -->
    <h1 style="font-size:22px;color:#1a1a1a;margin:0 0 8px;">
      Ciao ${nome}!
    </h1>
    <p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 24px;">
      La tua consulenza è stata prenotata con successo. Ecco il riepilogo del tuo incontro.
    </p>

    <!-- Riepilogo -->
    <div style="background-color:#fff;border:1px solid #e5e5e5;border-radius:12px;padding:20px;margin-bottom:24px;">
      <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:#888;margin:0 0 16px;">
        Riepilogo
      </h2>
      <table style="width:100%;font-size:15px;color:#333;">
        <tr>
          <td style="padding:6px 0;color:#888;">Consulenza</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">${tipoConsulenza}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#888;">Data</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">${data}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#888;">Orario</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">${orarioDisplay}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#888;">Durata</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">${durata}</td>
        </tr>
      </table>
    </div>

    <!-- Pagamento -->
    <div style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin-bottom:24px;">
      <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:#166534;margin:0 0 12px;">
        Istruzioni per il pagamento
      </h2>
      <p style="font-size:14px;color:#333;line-height:1.6;margin:0 0 12px;">
        Per confermare la tua prenotazione, effettua un bonifico bancario con i seguenti dati:
      </p>
      <table style="width:100%;font-size:14px;color:#333;">
        <tr>
          <td style="padding:4px 0;color:#666;">IBAN</td>
          <td style="padding:4px 0;text-align:right;font-weight:600;font-family:monospace;">[INSERIRE IBAN]</td>
        </tr>
        <tr>
          <td style="padding:4px 0;color:#666;">Intestatario</td>
          <td style="padding:4px 0;text-align:right;font-weight:600;">[INSERIRE INTESTATARIO]</td>
        </tr>
        <tr>
          <td style="padding:4px 0;color:#666;">Causale</td>
          <td style="padding:4px 0;text-align:right;font-weight:600;">Consulenza pedagogica del ${data}</td>
        </tr>
        <tr>
          <td style="padding:4px 0;color:#666;">Importo</td>
          <td style="padding:4px 0;text-align:right;font-weight:600;">${prezzo}</td>
        </tr>
      </table>
    </div>

    <!-- Nota -->
    <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 32px;">
      Riceverai il link della call via email non appena il pagamento sarà confermato.
      Per qualsiasi domanda, rispondi direttamente a questa email.
    </p>

    <!-- Footer -->
    <div style="border-top:1px solid #e5e5e5;padding-top:20px;text-align:center;">
      <p style="font-size:12px;color:#999;margin:0;">
        Orizzonti Educativi — Guida per educatori italiani in Australia
      </p>
    </div>
  </div>
</body>
</html>`;

  return getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "La tua consulenza è prenotata \uD83C\uDF93 — Riepilogo e istruzioni",
    html,
  });
}

/** Invia email reminder 24h prima della consulenza */
export async function inviaEmailReminder(prenotazione: PrenotazioneEmail) {
  const { nome, email, tipoConsulenza, data, orario } = prenotazione;

  const html = `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#FAFAF7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background-color:#000;color:#fff;font-weight:bold;font-size:18px;width:40px;height:40px;line-height:40px;border-radius:8px;">
        OE
      </div>
      <p style="margin:8px 0 0;font-size:14px;color:#666;">Orizzonti Educativi</p>
    </div>

    <!-- Contenuto -->
    <h1 style="font-size:22px;color:#1a1a1a;margin:0 0 8px;">
      Ci vediamo domani, ${nome}!
    </h1>
    <p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 24px;">
      Questo è un promemoria per il tuo incontro di domani. Non vedo l'ora di accompagnarti in questo percorso.
    </p>

    <!-- Riepilogo -->
    <div style="background-color:#fff;border:1px solid #e5e5e5;border-radius:12px;padding:20px;margin-bottom:24px;">
      <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:#888;margin:0 0 16px;">
        Il tuo incontro
      </h2>
      <table style="width:100%;font-size:15px;color:#333;">
        <tr>
          <td style="padding:6px 0;color:#888;">Consulenza</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">${tipoConsulenza}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#888;">Data</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">${data}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#888;">Orario</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">${orario} (ora italiana)</td>
        </tr>
      </table>
    </div>

    <!-- Nota -->
    <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 32px;">
      Se hai bisogno di spostare o annullare l'incontro, contattami il prima possibile rispondendo a questa email.
      Preparati con le tue domande e i tuoi dubbi — questo spazio è tutto per te.
    </p>

    <!-- Footer -->
    <div style="border-top:1px solid #e5e5e5;padding-top:20px;text-align:center;">
      <p style="font-size:12px;color:#999;margin:0;">
        Orizzonti Educativi — Guida per educatori italiani in Australia
      </p>
    </div>
  </div>
</body>
</html>`;

  return getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Ti aspetto domani! \uD83D\uDCC5 Riepilogo della tua consulenza",
    html,
  });
}
