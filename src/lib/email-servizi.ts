import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

const FROM_EMAIL = process.env.NODE_ENV === "production"
  ? "Orizzonti Educativi <noreply@orizzontieducativiau.com>"
  : "Orizzonti Educativi <onboarding@resend.dev>";

const ADMIN_EMAIL = "orizzontieducativiau@gmail.com";

function emailWrapper(content: string): string {
  return `
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
    ${content}
    <!-- Footer -->
    <div style="border-top:1px solid #e5e5e5;padding-top:20px;text-align:center;">
      <p style="font-size:12px;color:#999;margin:0;">
        Orizzonti Educativi — Guida per educatori italiani in Australia
      </p>
    </div>
  </div>
</body>
</html>`;
}

// ═══════════════════════════════════════════
// CV & COVER LETTER
// ═══════════════════════════════════════════

type CVSubmission = {
  nome: string;
  email: string;
  testo: string;
  filename: string;
  fileBuffer: Buffer;
};

/** Email all'utente dopo invio CV */
export async function inviaEmailCVUtente(data: { nome: string; email: string }) {
  const html = emailWrapper(`
    <h1 style="font-size:22px;color:#1a1a1a;margin:0 0 8px;">
      Hi there, ${data.nome}
    </h1>
    <p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 16px;">
      Grazie per aver inviato il tuo curriculum.
    </p>
    <p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 16px;">
      Ho ricevuto il tuo CV e inizierò presto ad analizzarlo seguendo
      gli standard utilizzati nel settore early childhood in Australia.
    </p>
    <p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 16px;">
      Dopo la conferma del pagamento del servizio, entro due settimane riceverai:
    </p>
    <ul style="font-size:15px;color:#444;line-height:1.8;margin:0 0 16px;padding-left:20px;">
      <li>il tuo resume ristrutturato secondo il formato australiano</li>
      <li>una cover letter personalizzata</li>
    </ul>
    <p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 16px;">
      Entrambi i documenti saranno pensati per aiutarti a presentarti nel modo
      più chiaro e professionale possibile nel contesto australiano.
    </p>
    <p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 16px;">
      Se durante il percorso dovessero emergere dubbi o se desiderassi prepararti
      per i colloqui, sentiti libero di prenotare:
    </p>
    <ul style="font-size:15px;color:#444;line-height:1.8;margin:0 0 24px;padding-left:20px;">
      <li>una consulenza personalizzata</li>
      <li>oppure una mock interview</li>
    </ul>
    <p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 8px;">
      Sarò felice di accompagnarti anche in questa fase.
    </p>
    <p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 32px;">
      Un caro saluto,<br>
      <strong>Sofia</strong><br>
      Orizzonti Educativi
    </p>
  `);

  return getResend().emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: "CV ricevuto — prossimi passi",
    html,
  });
}

/** Email all'admin con CV in allegato */
export async function inviaEmailCVAdmin(data: CVSubmission) {
  const html = emailWrapper(`
    <h1 style="font-size:22px;color:#1a1a1a;margin:0 0 16px;">
      Nuovo CV ricevuto
    </h1>
    <div style="background-color:#fff;border:1px solid #e5e5e5;border-radius:12px;padding:20px;margin-bottom:24px;">
      <table style="width:100%;font-size:15px;color:#333;">
        <tr>
          <td style="padding:6px 0;color:#888;">Nome</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">${data.nome}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#888;">Email</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">${data.email}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#888;">File</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">${data.filename}</td>
        </tr>
      </table>
    </div>
    <div style="background-color:#f9fafb;border:1px solid #e5e5e5;border-radius:12px;padding:20px;margin-bottom:24px;">
      <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:#888;margin:0 0 12px;">
        Racconto dell'utente
      </h2>
      <p style="font-size:14px;color:#333;line-height:1.6;margin:0;white-space:pre-wrap;">${data.testo}</p>
    </div>
  `);

  return getResend().emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `Nuovo CV da ${data.nome}`,
    html,
    attachments: [
      {
        filename: data.filename,
        content: data.fileBuffer,
      },
    ],
  });
}

// ═══════════════════════════════════════════
// MOCK INTERVIEW
// ═══════════════════════════════════════════

type MockInterviewEmail = {
  nome: string;
  email: string;
  data: string;
  orario: string;
  durata: string;
  orarioLocale?: string;
  fusoLocale?: string;
};

/** Formatta orario con doppio fuso */
function formatOrario(orario: string, orarioLocale?: string, fusoLocale?: string): string {
  if (orarioLocale && fusoLocale) {
    return `${orarioLocale} ${fusoLocale} (${orario} ora italiana)`;
  }
  return `${orario} (ora italiana)`;
}

/** Email conferma mock interview all'utente */
export async function inviaEmailMockInterview(data: MockInterviewEmail) {
  const orarioDisplay = formatOrario(data.orario, data.orarioLocale, data.fusoLocale);

  const html = emailWrapper(`
    <h1 style="font-size:22px;color:#1a1a1a;margin:0 0 8px;">
      Hi there, ${data.nome}
    </h1>
    <p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 16px;">
      Grazie per aver scelto una mock interview personalizzata.
    </p>

    <!-- Riepilogo -->
    <div style="background-color:#fff;border:1px solid #e5e5e5;border-radius:12px;padding:20px;margin-bottom:24px;">
      <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:#888;margin:0 0 16px;">
        Riepilogo
      </h2>
      <table style="width:100%;font-size:15px;color:#333;">
        <tr>
          <td style="padding:6px 0;color:#888;">Servizio</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">Mock Interview</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#888;">Data</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">${data.data}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#888;">Orario</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">${orarioDisplay}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#888;">Durata</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">${data.durata}</td>
        </tr>
      </table>
    </div>

    <p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 16px;">
      Prima del nostro incontro esaminerò il tuo curriculum così da preparare
      un colloquio di lavoro realistico, pensato per simulare le domande che
      potresti ricevere in un centro educativo in Australia.
    </p>
    <p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 16px;">
      L'obiettivo è aiutarti a sentirti più sicuro e preparato quando
      affronterai i colloqui reali.
    </p>

    <!-- Pagamento -->
    <div style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin-bottom:24px;">
      <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:#166534;margin:0 0 12px;">
        Informazioni sul pagamento
      </h2>
      <p style="font-size:14px;color:#333;line-height:1.6;margin:0 0 12px;">
        Per confermare la consulenza ti chiedo gentilmente di effettuare
        il pagamento tramite bonifico utilizzando i seguenti dati:
      </p>
      <table style="width:100%;font-size:14px;color:#333;">
        <tr>
          <td style="padding:4px 0;color:#666;">IBAN</td>
          <td style="padding:4px 0;text-align:right;font-weight:600;font-family:monospace;">[INSERIRE IBAN]</td>
        </tr>
      </table>
      <p style="font-size:14px;color:#333;line-height:1.6;margin:12px 0 0;">
        Una volta ricevuto il pagamento riceverai il link per il nostro incontro.
      </p>
    </div>

    <p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 8px;">
      Se lo desideri, puoi anche inviarmi il tuo curriculum italiano prima della call.
    </p>
    <p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 32px;">
      Un caro saluto,<br>
      <strong>Sofia</strong><br>
      Orizzonti Educativi
    </p>
  `);

  return getResend().emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: "Conferma prenotazione — Mock Interview",
    html,
  });
}

/** Email CV per mock interview all'admin */
export async function inviaEmailMockInterviewCV(data: {
  nome: string;
  email: string;
  filename: string;
  fileBuffer: Buffer;
}) {
  const html = emailWrapper(`
    <h1 style="font-size:22px;color:#1a1a1a;margin:0 0 16px;">
      CV per Mock Interview
    </h1>
    <div style="background-color:#fff;border:1px solid #e5e5e5;border-radius:12px;padding:20px;margin-bottom:24px;">
      <table style="width:100%;font-size:15px;color:#333;">
        <tr>
          <td style="padding:6px 0;color:#888;">Nome</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">${data.nome}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#888;">Email</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">${data.email}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#888;">File</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">${data.filename}</td>
        </tr>
      </table>
    </div>
  `);

  return getResend().emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `CV per Mock Interview — ${data.nome}`,
    html,
    attachments: [
      {
        filename: data.filename,
        content: data.fileBuffer,
      },
    ],
  });
}

// ═══════════════════════════════════════════
// MENTORSHIP
// ═══════════════════════════════════════════

/** Email benvenuto mentorship all'utente */
export async function inviaEmailMentorship(data: { nome: string; email: string }) {
  const html = emailWrapper(`
    <h1 style="font-size:22px;color:#1a1a1a;margin:0 0 8px;">
      Benvenuta in Orizzonti Educativi, ${data.nome}
    </h1>
    <p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 16px;">
      Il percorso di mentorship è pensato per accompagnarti passo dopo passo
      nel comprendere e affrontare il processo di riconoscimento dei titoli
      di studio nel sistema educativo australiano.
    </p>
    <p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 16px;">
      Il mio ruolo è quello di affiancarti e guidarti, aiutandoti a orientarti
      tra i passaggi, i documenti richiesti e le diverse possibilità.
    </p>

    <div style="background-color:#f9fafb;border-left:3px solid #000;padding:16px 20px;margin:0 0 16px;border-radius:0 8px 8px 0;">
      <p style="font-size:16px;color:#333;font-style:italic;margin:0;">
        "I walk next to you, not ahead of you."
      </p>
    </div>

    <p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 16px;">
      Questo significa che non mi sostituisco a te nel processo, ma ti supporto
      nel comprenderlo e nel portarlo avanti con maggiore chiarezza e sicurezza.
    </p>
    <p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 8px;">
      Durante il percorso avrai:
    </p>
    <ul style="font-size:15px;color:#444;line-height:1.8;margin:0 0 16px;padding-left:20px;">
      <li>supporto via email durante tutto il processo</li>
      <li>due consulenze da un'ora incluse</li>
      <li>indicazioni personalizzate sui documenti richiesti</li>
    </ul>
    <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 24px;">
      Se desiderassi che io gestisca direttamente la richiesta di riconoscimento
      per tuo conto, questo è possibile ma comporta costi aggiuntivi e alcune
      clausole specifiche. In questo caso sarà importante chiarire che non posso
      assumermi responsabilità sull'esito finale della richiesta, che dipende
      sempre dalle autorità australiane.
    </p>

    <!-- Pagamento -->
    <div style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin-bottom:24px;">
      <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:#166534;margin:0 0 12px;">
        Informazioni sul pagamento
      </h2>
      <p style="font-size:14px;color:#333;line-height:1.6;margin:0 0 12px;">
        Il pagamento del percorso può essere suddiviso in due rate:
      </p>
      <ul style="font-size:14px;color:#333;line-height:1.8;margin:0 0 12px;padding-left:20px;">
        <li>75€ all'inizio del percorso</li>
        <li>75€ prima della consegna della checklist personalizzata</li>
      </ul>
      <p style="font-size:14px;color:#333;line-height:1.6;margin:0 0 8px;">
        Per confermare l'avvio del percorso puoi effettuare il bonifico
        utilizzando i seguenti dati:
      </p>
      <table style="width:100%;font-size:14px;color:#333;">
        <tr>
          <td style="padding:4px 0;color:#666;">IBAN</td>
          <td style="padding:4px 0;text-align:right;font-weight:600;font-family:monospace;">[INSERIRE IBAN]</td>
        </tr>
      </table>
    </div>

    <p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 32px;">
      Un caro saluto,<br>
      <strong>Sofia</strong><br>
      Orizzonti Educativi
    </p>
  `);

  return getResend().emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: "Benvenuta in Orizzonti Educativi — Percorso di mentorship",
    html,
  });
}

/** Notifica admin nuova richiesta mentorship */
export async function inviaEmailMentorshipAdmin(data: {
  nome: string;
  email: string;
  telefono?: string;
}) {
  const html = emailWrapper(`
    <h1 style="font-size:22px;color:#1a1a1a;margin:0 0 16px;">
      Nuova richiesta Mentorship
    </h1>
    <div style="background-color:#fff;border:1px solid #e5e5e5;border-radius:12px;padding:20px;margin-bottom:24px;">
      <table style="width:100%;font-size:15px;color:#333;">
        <tr>
          <td style="padding:6px 0;color:#888;">Nome</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">${data.nome}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#888;">Email</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">${data.email}</td>
        </tr>
        ${data.telefono ? `<tr>
          <td style="padding:6px 0;color:#888;">Telefono</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">${data.telefono}</td>
        </tr>` : ""}
      </table>
    </div>
  `);

  return getResend().emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `Nuova richiesta Mentorship — ${data.nome}`,
    html,
  });
}
