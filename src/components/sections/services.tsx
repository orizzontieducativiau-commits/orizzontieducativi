import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Plane, TreePine, ArrowRight } from "lucide-react";

const cards = [
  {
    icon: BookOpen,
    title: "Comprendere il sistema australiano",
    description:
      "Scopri come funziona il sistema educativo per la prima infanzia in Australia. Approfondisci i framework NQF ed EYLF. Arriva ai colloqui con basi solide e linguaggio professionale adeguato.",
    color: "bg-sky-50",
    iconColor: "text-sky-600",
    href: "/sistema-educativo-australiano",
  },
  {
    icon: Users,
    title: "Terminologie e ruoli professionali",
    description:
      "Comprendi le differenze tra Early Childhood Educator (ECE) ed Early Childhood Teacher (ECT). Scopri cosa implica un ruolo Cert III, Diploma o Bachelor. Chiarezza nei titoli significa chiarezza nelle opportunità.",
    color: "bg-amber-50",
    iconColor: "text-amber-600",
    href: "/ruoli-educativi",
  },
  {
    icon: Plane,
    title: "Un percorso che può portare alla Permanent Residency",
    description:
      "Lavorare nel settore educativo può aprire strade migratorie. Comprendere requisiti e qualifiche è il primo passo. Ogni percorso va valutato con attenzione e responsabilità. Io non sono un agente di immigrazione.",
    color: "bg-violet-50",
    iconColor: "text-violet-600",
    href: "/permanent-residency",
  },
  {
    icon: TreePine,
    title: "La filosofia dei servizi educativi",
    description:
      "Ogni nido in Australia ha una propria filosofia. Molti servizi si ispirano a Reggio Emilia. Troverai anche approcci Montessori, Steiner e Forest School. Conoscere la filosofia aiuta a scegliere e a prepararsi meglio.",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
    href: "/filosofie-educative",
  },
];

export function Services() {
  return (
    <section id="servizi" className="bg-gray-50 py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Cursive label */}
        <p className="font-caveat text-2xl md:text-3xl text-gray-500 text-center mb-4">
          come closer
        </p>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
          Gli ambiti di orientamento
        </h2>
        <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
          Orientamento chiaro e strumenti concreti per educatori italiani che
          vogliono lavorare nel sistema educativo australiano con consapevolezza.
        </p>

        {/* 2x2 grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {cards.map((card) => (
            <Link key={card.title} href={card.href} className="group">
              <Card
                className={`${card.color} border-0 transition-shadow hover:shadow-md h-full`}
              >
                <CardHeader className="p-6 pb-2">
                  <div className="h-16 mb-4 rounded-lg flex items-center justify-center">
                    <card.icon
                      className={`h-10 w-10 ${card.iconColor} opacity-60`}
                    />
                  </div>
                  <CardTitle className="text-lg font-semibold text-center">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-sm text-gray-600 text-center leading-relaxed">
                    {card.description}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-4 text-sm font-medium text-gray-500 group-hover:text-gray-800 transition-colors">
                    Scopri di più
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
