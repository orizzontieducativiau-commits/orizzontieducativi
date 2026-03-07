"use client";

import { GraduationCap, FileCheck, MessageSquare, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Consulenze",
    subtitle: "personalizzate",
    scrollTarget: "contatti",
    tab: "consulenze",
    color: "bg-emerald-500",
  },
  {
    icon: FileCheck,
    title: "CV & Cover Letter",
    subtitle: "seguendo gli standard australiani",
    scrollTarget: "consulenze",
    tab: "dialogo",
    color: "bg-violet-500",
  },
  {
    icon: MessageSquare,
    title: "Mock Interviews",
    subtitle: "preparazione per i tuoi colloqui in Australia",
    scrollTarget: "consulenze",
    tab: "giorno",
    color: "bg-amber-500",
  },
  {
    icon: HeartHandshake,
    title: "Mentorship",
    subtitle: "supporto continuo",
    scrollTarget: "contatti",
    tab: "percorsi",
    color: "bg-rose-500",
  },
];

const scrollTo = (id: string) => {
  const el = document.querySelector(`#${id}`);
  if (!el) {
    console.warn(`[ScrollNav] Section #${id} not found.`);
    return;
  }
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function HeroServiceCard() {
  const handleClick = (scrollTarget: string, tab: string) => {
    window.dispatchEvent(
      new CustomEvent("scrollnav", {
        detail: { section: scrollTarget, tab },
      })
    );
    setTimeout(() => scrollTo(scrollTarget), 50);
  };

  return (
    <div className="space-y-1">
      {features.map((feature) => (
        <button
          key={feature.title}
          onClick={() => handleClick(feature.scrollTarget, feature.tab)}
          className="flex w-full items-center gap-3 rounded-xl px-2 py-3 -mx-2 transition-colors hover:bg-gray-50 text-left"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center text-gray-400">
            <feature.icon className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-900 leading-tight">
              {feature.title}
            </p>
            <p className="text-sm text-gray-400 leading-tight mt-0.5">
              {feature.subtitle}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
