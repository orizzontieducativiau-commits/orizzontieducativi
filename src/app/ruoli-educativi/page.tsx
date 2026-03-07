import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ECE vs ECT: capire i ruoli educativi in Australia — Orizzonti Educativi",
  description:
    "Qual è la differenza tra Early Childhood Educator e Early Childhood Teacher? Scopri i due ruoli chiave del settore educativo australiano.",
};

export default function RuoliEducativiPage() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
        ECE vs ECT: capire i ruoli educativi in Australia
      </h1>

      {/* Content */}
      <div className="prose prose-gray max-w-none">
        <h2>Due ruoli, due percorsi</h2>
        <p>
          Nel sistema educativo australiano per la prima infanzia esistono due
          figure principali:
        </p>
        <ul>
          <li>
            <strong>Early Childhood Educator (ECE)</strong>
          </li>
          <li>
            <strong>Early Childhood Teacher (ECT)</strong>
          </li>
        </ul>
        <p>
          Capire la differenza tra questi due ruoli è fondamentale per orientare
          il proprio percorso professionale.
        </p>

        <h2>Early Childhood Educator (ECE)</h2>
        <p>
          Per questo ruolo serve almeno un Certificate III in Early Childhood
          Education and Care.
        </p>
        <p>Responsabilità principali:</p>
        <ul>
          <li>Implementare il programma educativo</li>
          <li>Supportare lo sviluppo dei bambini</li>
          <li>Documentare osservazioni e progressi</li>
          <li>Collaborare con le famiglie</li>
          <li>Mantenere un ambiente sicuro</li>
        </ul>

        <h2>Early Childhood Teacher (ECT)</h2>
        <p>
          È un professionista con Bachelor universitario e ruolo pedagogico di
          leadership.
        </p>
        <p>Responsabilità principali:</p>
        <ul>
          <li>Progettare il curriculum educativo</li>
          <li>Supervisionare educatori</li>
          <li>Guidare documentazione pedagogica</li>
          <li>Sostenere la riflessione professionale</li>
          <li>Collaborare con specialisti</li>
        </ul>

        <h2>Quale percorso scegliere?</h2>
        <p>Dipende dalle qualifiche e obiettivi:</p>
        <ul>
          <li>
            <strong>Diploma scuola superiore</strong> → Certificate III / Diploma
          </li>
          <li>
            <strong>Laurea in educazione</strong> → possibile riconoscimento ECT
          </li>
          <li>
            <strong>Esperienza senza titolo</strong> → Certificate III
          </li>
        </ul>

        <h2>Stipendi indicativi</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Ruolo</th>
                <th>Stipendio indicativo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ECE Certificate III</td>
                <td>AUD $25-30/h</td>
              </tr>
              <tr>
                <td>ECE Diploma</td>
                <td>AUD $28-35/h</td>
              </tr>
              <tr>
                <td>ECT Bachelor</td>
                <td>AUD $35-45/h</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Conclusione</h2>
        <p>
          Entrambi i ruoli sono fondamentali nel sistema australiano. La chiave è
          capire il proprio punto di partenza e costruire un percorso realistico.
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
