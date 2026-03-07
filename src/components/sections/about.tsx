import Image from "next/image";
import { PathNavigation } from "@/components/PathNavigation";

export function About() {
  return (
    <section id="chi-sono" className="px-4 py-24 md:py-36 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* LEFT column — kicker + headline */}
          <div>
            {/* Kicker — logo + label */}
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/images/logo.png"
                alt="Orizzonti Educativi"
                width={48}
                height={48}
                className="h-10 w-auto"
              />
              <span className="font-caveat text-2xl text-gray-400 italic">
                Italian educator in Australia
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-inter font-[200] tracking-[-0.02em] leading-[1.1]">
              <span className="block text-4xl sm:text-5xl md:text-[3.5rem] text-black">
                Chi guida il tuo percorso?
              </span>
              <span className="block text-4xl sm:text-5xl md:text-[3.5rem] text-gray-400 mt-1">
                Sofia Boulahya.
              </span>
              <span className="block text-4xl sm:text-5xl md:text-[3.5rem] text-gray-400 mt-1">
                Founder di Orizzonti Educativi.
              </span>
            </h2>
          </div>

          {/* RIGHT column — body text */}
          <div className="space-y-8 md:pt-4">
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed tracking-tight">
              Hi there, sono Sofia, Educatrice della prima Infanzia ({" "}
              <a
                href="/ruoli-educativi"
                className="text-emerald-600 underline underline-offset-4 hover:text-emerald-700 transition-colors"
              >
                ECE
              </a>
              {" "}) che vive e lavora in Australia dal 2019. Il mio cammino professionale nasce in Italia, ma è in Australia che ha trovato una nuova forma, nuovi orizzonti, nuove domande.
            </p>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed tracking-tight">
              Lavorando ogni giorno nei servizi educativi australiani, ho potuto osservare da vicino un sistema diverso, con standard specifici, linguaggi professionali propri e percorsi di riconoscimento dei titoli spesso complessi e poco chiari per chi arriva dall&apos;estero.
            </p>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed tracking-tight">
              Quando sono arrivata, tradurre e far riconoscere i miei titoli di studio è stato uno dei passaggi più delicati e meno spiegati. Informazioni frammentate, processi burocratici poco trasparenti, poca guida concreta.
            </p>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed tracking-tight">
              È proprio da questa esperienza personale che nasce{" "}
              <strong className="text-gray-900 font-semibold">Orizzonti Educativi Australia</strong>. Non sostituirmi al percorso di chi arriva, ma accompagnarlo. Non fare al posto, ma fornire strumenti per fare da sé con consapevolezza.
            </p>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed tracking-tight">
              Offro orientamento nel processo di{" "}
              <a href="/consulenze#iniziamo" className="text-emerald-600 underline underline-offset-4 hover:text-emerald-700 transition-colors">
                riconoscimento dei titoli di studio
              </a>
              , aiutando a comprendere step, documentazione necessaria e standard richiesti.
            </p>

          </div>
        </div>

        {/* Dotted path navigation — flows from under title to under body text */}
        <PathNavigation />
      </div>
    </section>
  );
}
