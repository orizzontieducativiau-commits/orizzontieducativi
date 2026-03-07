"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    id: "pagamento",
    question: "Come funziona il pagamento?",
    answer: (
      <>
        Dopo la prenotazione riceverai un&apos;email con le istruzioni per il
        bonifico bancario. Non è richiesto alcun pagamento online. Riceverai il
        link per la call via email una volta confermato il pagamento. Una volta
        confermata la prenotazione, il rimborso non è disponibile. Se hai
        bisogno di spostare l&apos;incontro, puoi richiedere un cambio data
        scrivendo via email con almeno 24 ore di anticipo.
      </>
    ),
  },
  {
    id: "spostamento",
    question: "Posso spostare o annullare un incontro?",
    answer: (
      <>
        Certo. Se hai bisogno di cambiare data, puoi scrivere via email per
        richiedere uno spostamento dell&apos;incontro. Ti chiedo solo di
        avvisare con almeno 24 ore di anticipo.
      </>
    ),
  },
  {
    id: "differenze",
    question: "Che differenza c'è tra le consulenze?",
    answer: (
      <>
        La <strong>Call di orientamento</strong> è ideale per chi è ancora in
        fase esplorativa. Il <strong>Percorso strutturato</strong> è pensato per
        chi vuole approfondire e costruire un piano concreto. La{" "}
        <strong>Consulenza di chiarezza</strong> è per chi ha bisogno di mettere
        ordine prima di rivolgersi a un migration agent.
      </>
    ),
  },
  {
    id: "italiano",
    question: "La consulenza è in italiano?",
    answer: (
      <>
        Sì, tutte le consulenze si svolgono in italiano tramite Google Meet.
      </>
    ),
  },
];

export function FaqAccordion() {
  return (
    <Accordion type="single" collapsible>
      {FAQ_ITEMS.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="text-sm font-semibold text-gray-800 hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-gray-500 leading-relaxed pl-0.5">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
