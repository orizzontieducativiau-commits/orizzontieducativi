"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Check, ArrowRight, Instagram, Facebook, Music, Loader2, CheckCircle2 } from "lucide-react";

const socials = [
  {
    icon: Instagram,
    label: "Instagram",
    alt: "Vai al profilo Instagram di Orizzonti Educativi",
    href: "https://www.instagram.com/orizzontieducativi?igsh=Y3MzaDBoNGpjbzRl&utm_source=qr",
  },
  {
    icon: Music,
    label: "TikTok",
    alt: "Vai al profilo TikTok di Orizzonti Educativi",
    href: "https://www.tiktok.com/@orizzontieducativi?_r=1&_t=ZS-94TnbNEO7nQ",
  },
  {
    icon: Facebook,
    label: "Facebook",
    alt: "Vai alla pagina Facebook di Orizzonti Educativi",
    href: "https://facebook.com/ORIZZONTIEDUCATIVI",
  },
  {
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
    label: "Spotify",
    alt: "Vai al profilo Spotify di Orizzonti Educativi",
    href: "https://open.spotify.com/show/5v8zvQCmeXEOGAwztihE7O?si=XfqCMDABQQeK0-_WWOAurg",
  },
];

const consulenze = [
  {
    name: "Call di orientamento",
    slug: "call-di-orientamento",
    duration: "40 min",
    price: "€45",
    description: "Uno spazio per raccontarti e fare ordine.",
    features: [
      "Analisi del tuo percorso (studio, lavoro, obiettivi)",
      "Panoramica sulle principali strade per arrivare in Australia",
      "Visuale dei settori lavorativi più accessibili dall\u2019Italia",
      "Prime indicazioni pratiche su lavoro e vita quotidiana",
    ],
    popular: false,
  },
  {
    name: "Percorso strutturato",
    slug: "percorso-strutturato",
    duration: "60 min",
    price: "€80",
    description: "Per chi sente di voler partire.",
    features: [
      "Tutto ciò che include la call di orientamento",
      "Analisi del profilo in relazione al contesto australiano",
      "Scelte possibili e costi da considerare",
      "Aspettative e realtà",
    ],
    popular: true,
  },
  {
    name: "Consulenza di chiarezza",
    slug: "consulenza-di-chiarezza",
    duration: "60 min",
    price: "€120",
    description:
      "Non sono una migration agent. Questa consulenza è pensata per fare chiarezza, non per sostituire un agente.",
    features: [
      "Analisi del profilo in relazione al contesto australiano",
      "Definire il proprio percorso",
      "Quando rivolgersi a un migration agent",
      "Come evitare scelte affrettate",
    ],
    popular: false,
  },
  {
    name: "Mock Interview",
    slug: "mock-interview",
    href: "/#consulenze-giorno",
    duration: "60 min",
    price: "€80",
    description:
      "Un colloquio simulato per prepararti alle domande che potresti ricevere in un centro educativo in Australia.",
    features: [
      "Colloquio di lavoro realistico e personalizzato",
      "Simulazione domande tipiche del settore early childhood",
      "Feedback dettagliato sulla tua performance",
      "Consigli pratici per i colloqui reali",
    ],
    popular: false,
  },
];

const percorsi = [
  {
    name: "Riconoscimento titoli",
    duration: null,
    price: "€150",
    description: "Individuare cosa serve per partire.",
    features: [
      "Analisi titolo di studi",
      "Analisi curriculum",
      "Supporto preparazione documentazione",
      "Checklist personalizzata del percorso",
    ],
    popular: false,
  },
  {
    name: "Riconoscimento guidato",
    duration: null,
    price: "€240",
    description: "Ti accompagno nella partenza.",
    features: [
      "Analisi titolo di studi & curriculum",
      "Mock interview",
      "Creazione CV e assistenza invio",
      "Supporto passo passo per il riconoscimento dei titoli di studio",
    ],
    popular: true,
  },
];

type Plan = {
  name: string;
  slug?: string;
  href?: string;
  duration: string | null;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
  onCtaClick?: () => void;
};

function PricingCard({
  plan,
  ctaLabel,
}: {
  plan: Plan;
  ctaLabel: string;
}) {
  const buttonClasses = `w-full mt-4 rounded-full group ${
    plan.popular
      ? "bg-black text-white hover:bg-gray-800"
      : "bg-white text-black border border-gray-300 hover:bg-gray-50"
  }`;

  return (
    <Card
      className={`relative ${
        plan.popular ? "border-2 border-black" : "border border-gray-200"
      }`}
    >
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white rounded-full px-4">
          Consigliato
        </Badge>
      )}
      <CardHeader className="pb-4">
        {plan.duration && (
          <p className="text-xs text-gray-500 mb-1">{plan.duration}</p>
        )}
        <CardTitle className="flex items-baseline gap-1">
          <span className="text-4xl font-bold">{plan.price}</span>
        </CardTitle>
        <p className="text-sm font-semibold mt-1">{plan.name}</p>
        <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start gap-2">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 mt-0.5">
              <Check className="h-3 w-3 text-emerald-600" />
            </div>
            <span className="text-sm text-gray-700">{feature}</span>
          </div>
        ))}
        {plan.slug || plan.href ? (
          <Link href={plan.href || `/prenota/${plan.slug}`}>
            <Button className={buttonClasses}>
              {ctaLabel}
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        ) : (
          <Button className={buttonClasses} onClick={plan.onCtaClick}>
            {ctaLabel}
            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function MentorshipForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [loading, setLoading] = useState(false);
  const [errore, setErrore] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrore(null);

    try {
      const res = await fetch("/api/mentorship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, telefono: telefono || undefined }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        setErrore(data.error || "Si è verificato un errore. Riprova.");
      }
    } catch {
      setErrore("Impossibile inviare la richiesta. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-8 max-w-md mx-auto text-center">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 mb-3">
          <CheckCircle2 className="h-6 w-6 text-emerald-600" />
        </div>
        <h3 className="text-lg font-semibold mb-1">Richiesta inviata!</h3>
        <p className="text-sm text-gray-500">
          Controlla la tua email per i dettagli sul percorso e le istruzioni per
          il pagamento.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-8 max-w-md mx-auto">
      <h3 className="text-sm font-semibold text-gray-700 mb-1">I tuoi dati</h3>
      <p className="text-xs text-gray-400 mb-4">
        Compila il form per iniziare il percorso. Riceverai un&apos;email con
        tutti i dettagli.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Nome e cognome *"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          maxLength={100}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300"
        />
        <input
          type="email"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          maxLength={200}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300"
        />
        <input
          type="tel"
          placeholder="Telefono (opzionale)"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          maxLength={30}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300"
        />
        {errore && <p className="text-xs text-red-500">{errore}</p>}
        <Button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-black text-white hover:bg-gray-800"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Invio in corso...
            </>
          ) : (
            "Inizia il percorso"
          )}
        </Button>
      </form>
    </div>
  );
}

export function Contact() {
  const [activeTab, setActiveTab] = useState<"consulenze" | "percorsi">(
    "consulenze"
  );
  const [showMentorshipForm, setShowMentorshipForm] = useState(false);

  // Listen for scrollnav CustomEvent from hero card
  useEffect(() => {
    const handleScrollNav = (e: Event) => {
      const { section, tab } = (e as CustomEvent).detail;
      if (section !== "contatti") return;
      setActiveTab(tab);
    };

    window.addEventListener("scrollnav", handleScrollNav);
    return () => window.removeEventListener("scrollnav", handleScrollNav);
  }, []);

  return (
    <section id="contatti" className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* SEZIONE 1 — Dashboard */}
        <div className="bg-[#111111] rounded-[28px] md:rounded-[32px] px-6 py-12 md:px-16 md:py-16 shadow-lg mb-16">
          <p className="font-caveat text-2xl md:text-3xl text-gray-500 text-center mb-4">
            dashboard
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center mb-4 text-white">
            Dove trovarmi
          </h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-8">
            Seguimi e ascoltami nei canali dove condivido contenuti, strumenti e
            storie.
          </p>

          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider text-center mb-4">
            I miei canali
          </h4>

          <div className="flex justify-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.alt}
                title={social.alt}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition-colors"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* SEZIONE 2 — Pricing */}
        <div className="text-center mb-12">
          <p className="font-caveat text-2xl md:text-3xl text-gray-400 mb-4">Pricing</p>
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900" style={{ lineHeight: '1.08', letterSpacing: '-0.02em' }}>
            Le aree di accompagnamento
          </h3>
          <p className="text-gray-400 text-base md:text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            Scegli un passo alla volta. Con chiarezza e strumenti concreti.
          </p>
        </div>

        {/* Switch Consulenze / Percorsi */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setActiveTab("consulenze")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "consulenze"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Consulenze
            </button>
            <button
              onClick={() => setActiveTab("percorsi")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "percorsi"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Percorsi
            </button>
          </div>
        </div>

        {/* Intro tab */}
        <p className="text-base text-gray-400 text-center max-w-xl mx-auto mb-12 leading-relaxed">
          {activeTab === "consulenze"
            ? "Un primo spazio per fare ordine. Per capire da dove partire. E scegliere con consapevolezza."
            : "Percorsi guidati per chi vuole costruire basi solide. Con metodo. Senza confusione."}
        </p>

        {/* Pricing cards */}
        {activeTab === "consulenze" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {consulenze.map((plan) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                ctaLabel="Prenota"
              />
            ))}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {percorsi.map((plan) => (
                <PricingCard
                  key={plan.name}
                  plan={{
                    ...plan,
                    onCtaClick: () => setShowMentorshipForm(true),
                  }}
                  ctaLabel="Inizia il percorso"
                />
              ))}
            </div>
            {showMentorshipForm && <MentorshipForm />}
          </>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center max-w-lg mx-auto mt-10">
          Non sono una migration agent registrata. Le consulenze offrono
          orientamento e supporto pratico, ma non sostituiscono la consulenza
          legale per visti e immigrazione.
        </p>
      </div>
    </section>
  );
}
