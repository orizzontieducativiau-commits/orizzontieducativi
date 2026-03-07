export function BlogHeader() {
  return (
    <div className="container mx-auto max-w-3xl text-center">
      {/* Cursive label */}
      <p className="font-caveat text-2xl md:text-3xl text-gray-500 mb-4">
        dal mio diario
      </p>

      {/* Main heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
        Blog
      </h1>

      {/* Subtitle */}
      <div className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto space-y-4">
        <p>Questo spazio nasce come un piccolo diario di pratica educativa.</p>
        <p>
          Qui raccolgo frammenti di documentazione pedagogica che emergono dal
          mio lavoro quotidiano in un Early Learning Center (0-6 anni) qui in
          Australia: osservazioni, esperienze vissute con i bambini, riflessioni
          e momenti di apprendimento che nascono nella vita di ogni giorno.
        </p>
        <p>
          Per rispetto della privacy, i nomi dei bambini non vengono mai
          riportati. L&apos;attenzione rimane sempre sull&apos;esperienza
          educativa, sui processi di apprendimento e sulle domande che
          accompagnano il lavoro pedagogico.
        </p>
        <p>
          L&apos;intento è aprire una finestra sul sistema educativo
          australiano, permettendo a chi è curioso o interessato di avvicinarsi
          a questo contesto in modo concreto e autentico.
        </p>
        <p>
          Gli articoli saranno pubblicati sia in italiano che in inglese, così
          che possano diventare anche uno spazio utile per chi desidera
          familiarizzare con il linguaggio educativo utilizzato nei servizi
          australiani.
        </p>
      </div>
    </div>
  );
}
