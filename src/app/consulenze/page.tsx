import { CONSULENZE, MOCK_INTERVIEW, CV_COVER_LETTER } from "@/lib/consulenze";
import { CardConsulenza } from "@/components/CardConsulenza";
import { FaqAccordion } from "@/components/FaqAccordion";

export const metadata = {
  title: "Consulenze — Orizzonti Educativi",
  description:
    "Prenota una consulenza pedagogica personalizzata per educatori italiani in Australia. Orientamento, percorso strutturato o consulenza di chiarezza.",
};

export default function ConsulenzePage() {
  return (
    <section className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="font-caveat text-xl md:text-2xl text-gray-400 mb-2">
          Consulenze
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Scegli il tuo primo passo
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Un primo spazio per fare ordine. Per capire da dove partire. E
          scegliere con consapevolezza.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {CONSULENZE.map((consulenza) => (
          <CardConsulenza key={consulenza.slug} consulenza={consulenza} />
        ))}
      </div>

      {/* Altri servizi */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-xl font-bold text-center mb-2">Altri servizi</h2>
        <p className="text-gray-500 text-sm text-center mb-8">
          Servizi dedicati per prepararti al meglio.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          <CardConsulenza consulenza={MOCK_INTERVIEW} />
          <CardConsulenza consulenza={CV_COVER_LETTER} />
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-center mb-8">
          Domande frequenti
        </h2>
        <FaqAccordion />
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center max-w-lg mx-auto mt-12">
        Non sono una migration agent registrata. Le consulenze offrono
        orientamento e supporto pratico, ma non sostituiscono la consulenza
        legale per visti e immigrazione.
      </p>
    </section>
  );
}
