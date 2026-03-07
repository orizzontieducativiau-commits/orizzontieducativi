import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Come funziona il sistema educativo australiano — Orizzonti Educativi",
  description:
    "Una guida completa al sistema educativo australiano per educatori italiani: dal framework NQF alle qualifiche richieste.",
};

export default function SistemaEducativoAustralianoPage() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
        Come funziona il sistema educativo australiano per la prima infanzia
      </h1>

      {/* Content */}
      <div className="prose prose-gray max-w-none">
        <h2>Introduzione</h2>
        <p>
          Se sei un educatore italiano e stai pensando di trasferirti in
          Australia, una delle prime cose da comprendere è come funziona il
          sistema educativo per la prima infanzia. L&apos;Australia ha un
          approccio strutturato e regolamentato che può sembrare molto diverso da
          quello italiano, ma che offre enormi opportunità professionali.
        </p>

        <h2>Il National Quality Framework (NQF)</h2>
        <p>
          Il National Quality Framework è il cuore del sistema educativo
          australiano per l&apos;infanzia. Introdotto nel 2012, stabilisce gli
          standard nazionali per i servizi educativi rivolti ai bambini dalla
          nascita ai 12 anni.
        </p>
        <p>Il NQF comprende:</p>
        <ul>
          <li>
            <strong>National Quality Standard (NQS)</strong> — 7 aree di qualità
          </li>
          <li>
            <strong>Early Years Learning Framework (EYLF)</strong> — curriculum
            0-5 anni
          </li>
          <li>
            <strong>National Regulations</strong> — norme operative
          </li>
        </ul>

        <h2>Le 7 aree di qualità</h2>
        <ol>
          <li>Programma educativo e pratica</li>
          <li>Salute e sicurezza dei bambini</li>
          <li>Ambiente fisico</li>
          <li>Personale e gestione del personale</li>
          <li>Relazioni con i bambini</li>
          <li>Collaborazione con famiglie e comunità</li>
          <li>Governance e leadership</li>
        </ol>

        <h2>Qualifiche richieste</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Qualifica</th>
                <th>Ruolo</th>
                <th>Durata</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Certificate III</td>
                <td>Educator</td>
                <td>6-12 mesi</td>
              </tr>
              <tr>
                <td>Diploma</td>
                <td>Lead Educator</td>
                <td>18-24 mesi</td>
              </tr>
              <tr>
                <td>Bachelor Degree</td>
                <td>Early Childhood Teacher</td>
                <td>4 anni</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Riconoscimento dei titoli italiani</h2>
        <p>Il processo generalmente richiede:</p>
        <ol>
          <li>Traduzione certificata dei documenti</li>
          <li>Valutazione tramite AITSL</li>
          <li>Eventuali materie integrative</li>
          <li>Registrazione presso l&apos;autorità competente</li>
        </ol>

        <h2>Conclusione</h2>
        <p>
          Comprendere il sistema educativo australiano è il primo passo
          fondamentale per ogni educatore italiano che vuole costruire una
          carriera in Australia.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link
          href="/consulenze"
          className="inline-block text-emerald-600 font-medium underline underline-offset-2 hover:text-emerald-700 transition-colors"
        >
          Contattami per una consulenza personalizzata
        </Link>
      </div>
    </article>
  );
}
