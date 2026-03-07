/**
 * Dati delle consulenze.
 * Fonte di verità per nomi, slug, prezzi e descrizioni.
 * Usato sia nelle card che nelle API.
 */

export type Consulenza = {
  nome: string;
  slug: string;
  descrizione: string;
  /** Durata in minuti. Opzionale per servizi senza call (es. CV review) */
  durataMinuti?: number;
  prezzo: number;
  prezzoLabel: string;
  features: string[];
  popular: boolean;
  /** Se true, questo servizio usa un template email diverso */
  emailCustom?: boolean;
  /** Link personalizzato per il CTA (default: /prenota/{slug}) */
  ctaHref?: string;
  /** Testo personalizzato per il CTA (default: "Prenota") */
  ctaLabel?: string;
};

export const CONSULENZE: Consulenza[] = [
  {
    nome: "Call di orientamento",
    slug: "call-di-orientamento",
    descrizione: "Uno spazio per raccontarti e fare ordine.",
    durataMinuti: 40,
    prezzo: 45,
    prezzoLabel: "€45",
    features: [
      "Analisi del tuo percorso (studio, lavoro, obiettivi)",
      "Panoramica sulle principali strade per arrivare in Australia",
      "Visuale dei settori lavorativi più accessibili dall\u2019Italia",
      "Prime indicazioni pratiche su lavoro e vita quotidiana",
    ],
    popular: false,
  },
  {
    nome: "Percorso strutturato",
    slug: "percorso-strutturato",
    descrizione: "Per chi sente di voler partire.",
    durataMinuti: 60,
    prezzo: 80,
    prezzoLabel: "€80",
    features: [
      "Tutto ciò che include la call di orientamento",
      "Analisi del profilo in relazione al contesto australiano",
      "Scelte possibili e costi da considerare",
      "Aspettative e realtà",
    ],
    popular: true,
  },
  {
    nome: "Consulenza di chiarezza",
    slug: "consulenza-di-chiarezza",
    descrizione:
      "Non sono una migration agent. Questa consulenza è pensata per fare chiarezza, non per sostituire un agente.",
    durataMinuti: 60,
    prezzo: 120,
    prezzoLabel: "€120",
    features: [
      "Analisi del profilo in relazione al contesto australiano",
      "Definire il proprio percorso",
      "Quando rivolgersi a un migration agent",
      "Come evitare scelte affrettate",
    ],
    popular: false,
  },
];

/** Mock Interview — usa lo stesso calendario e slot condivisi */
export const MOCK_INTERVIEW: Consulenza = {
  nome: "Mock Interview",
  slug: "mock-interview",
  descrizione:
    "Un colloquio simulato per prepararti alle domande che potresti ricevere in un centro educativo in Australia.",
  durataMinuti: 60,
  prezzo: 80,
  prezzoLabel: "€80",
  features: [
    "Colloquio di lavoro realistico e personalizzato",
    "Simulazione domande tipiche del settore early childhood",
    "Feedback dettagliato sulla tua performance",
    "Consigli pratici per i colloqui reali",
  ],
  popular: false,
  emailCustom: true,
};

/** CV & Cover Letter — servizio asincrono senza call */
export const CV_COVER_LETTER: Consulenza = {
  nome: "CV & Cover Letter",
  slug: "cv-cover-letter",
  descrizione:
    "Molti CV europei, anche quando contengono esperienze valide, non sono strutturati nel modo che i recruiter australiani si aspettano. Per questo motivo può essere utile adattare il proprio curriculum al contesto locale. Questo servizio nasce proprio per supportarti in questo passaggio.",
  prezzo: 50,
  prezzoLabel: "€50",
  features: [
    "Adattare il CV al formato utilizzato in Australia",
    "Utilizzare un linguaggio professionale, adatto ai recruiter australiani",
    "Aiutare a candidarsi in modo più efficace",
  ],
  popular: false,
  emailCustom: true,
  ctaHref: "/servizi/cv-cover-letter",
  ctaLabel: "Vai al servizio",
};

/** Tutti i servizi prenotabili (consulenze + mock interview + cv) */
export const TUTTI_SERVIZI: Consulenza[] = [...CONSULENZE, MOCK_INTERVIEW, CV_COVER_LETTER];

/** Trova una consulenza o servizio dato lo slug */
export function getConsulenzaBySlug(slug: string): Consulenza | undefined {
  return TUTTI_SERVIZI.find((c) => c.slug === slug);
}
