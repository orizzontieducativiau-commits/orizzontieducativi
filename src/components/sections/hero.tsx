import Image from "next/image";
import { HeroServiceCard } from "@/components/HeroServiceCard";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Grid squares overlay — visible only in middle zone (subtitle + card), fades out toward title and artwork */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{
        maskImage: "linear-gradient(to bottom, transparent 28%, rgba(0,0,0,0.6) 38%, black 45%, black 60%, rgba(0,0,0,0.4) 72%, transparent 82%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 28%, rgba(0,0,0,0.6) 38%, black 45%, black 60%, rgba(0,0,0,0.4) 72%, transparent 82%)",
      }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160' width='160' height='160'%3e%3cpath d='M 160 0 L 0 0 0 160' fill='none' stroke='rgba(0,0,0,0.06)' stroke-width='1'/%3e%3c/svg%3e")`,
          backgroundSize: "160px 160px",
        }} />
      </div>

      {/* Children artwork - faded background at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[280px] md:h-[350px] pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-transparent" />
        <Image
          src="/images/children-artwork.png"
          alt="Illustrazioni decorative di bambini felici"
          width={1600}
          height={400}
          className="w-full h-full object-cover object-bottom opacity-50"
          priority
        />
      </div>

      {/* Main content - above artwork */}
      <div className="px-4 pt-20 pb-0 md:pt-32 md:pb-0 relative z-10">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="font-caveat text-2xl md:text-3xl text-gray-400 mb-4">
            La tua guida nel sistema educativo australiano
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tighter leading-[1.1]">
            Orizzonti Educativi
            <br />
            <span className="text-4xl sm:text-5xl md:text-6xl">ti accompagna passo passo</span>
          </h1>

          <p className="mt-8 text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mx-auto">
            Attraverso{" "}
            <a href="#contatti" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700 transition-colors">
              consulenze
            </a>{" "}
            pedagogiche personalizzate ti guido nel riconoscimento titoli, nella preparazione di documenti professionali australiani e nell&apos;orientamento al{" "}
            <a href="#servizi" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700 transition-colors">
              sistema educativo
            </a>{" "}
            locale.
          </p>
        </div>

        {/* Floating card - centered, above everything */}
        <div className="relative z-20 flex justify-center mt-12 md:mt-16 pb-24 md:pb-32">
          <div className="relative w-[320px] sm:w-[360px]">
            {/* Card behind */}
            <div className="absolute top-4 left-6 right-6 bottom-0 rounded-2xl bg-white shadow-md transform -rotate-[2deg]" />
            {/* Main card */}
            <div className="relative rounded-2xl border border-gray-200 bg-white shadow-lg transform rotate-[3deg] hover:rotate-[1deg] transition-transform duration-300">
              <div className="p-5">
                <HeroServiceCard />
              </div>
            </div>
            {/* FAB button */}
            <div className="absolute -bottom-2 -left-4 z-10">
              <Image
                src="/images/hero-fab.png"
                alt=""
                width={72}
                height={72}
                className="drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
