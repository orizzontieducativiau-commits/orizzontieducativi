"use client";

import {
  Compass,
  BookOpen,
  Users,
  Plane,
  TreePine,
  GraduationCap,
  FileCheck,
  MessageCircle,
  HeartHandshake,
  Lightbulb,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
}

const navItems: NavItem[] = [
  { label: "Iniziamo", href: "#iniziamo", icon: Compass, bgColor: "bg-gray-100", iconColor: "text-gray-500" },
  { label: "Comprendere il sistema", href: "#comprendere-il-sistema", icon: BookOpen, bgColor: "bg-sky-50", iconColor: "text-sky-500" },
  { label: "Terminologie", href: "#terminologie", icon: Users, bgColor: "bg-amber-50", iconColor: "text-amber-500" },
  { label: "PR", href: "#pr", icon: Plane, bgColor: "bg-violet-50", iconColor: "text-violet-500" },
  { label: "Filosofia", href: "#filosofia", icon: TreePine, bgColor: "bg-emerald-50", iconColor: "text-emerald-500" },
  { label: "Consulenze", href: "#consulenze", icon: GraduationCap, bgColor: "bg-gray-100", iconColor: "text-gray-500" },
  { label: "CV", href: "#cv", icon: FileCheck, bgColor: "bg-gray-100", iconColor: "text-gray-500" },
  { label: "Mock", href: "#mock", icon: MessageCircle, bgColor: "bg-gray-100", iconColor: "text-gray-500" },
  { label: "Mentorship", href: "#mentorship", icon: HeartHandshake, bgColor: "bg-rose-50", iconColor: "text-rose-400" },
  { label: "Blog", href: "#blog", icon: Lightbulb, bgColor: "bg-amber-50", iconColor: "text-amber-500" },
];

// S-curve path from top-left (under title) to bottom-right (under body text)
// Flows diagonally like the qatchup reference
const desktopPositions = [
  { x: 8, y: 6 },
  { x: 14, y: 28 },
  { x: 24, y: 48 },
  { x: 36, y: 64 },
  { x: 50, y: 52 },
  { x: 58, y: 34 },
  { x: 68, y: 54 },
  { x: 78, y: 72 },
  { x: 88, y: 58 },
  { x: 94, y: 38 },
];

export function PathNavigation() {
  return (
    <div className="relative mt-8 md:mt-0" aria-label="Percorso di navigazione">
      {/* Desktop: curved path with positioned icons */}
      <div className="hidden md:block relative" style={{ height: "380px" }}>
        {/* SVG curved dotted line — S-curve from top-left to bottom-right */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 380"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <path
            d="M 80 25 C 100 70, 120 110, 150 140 S 220 200, 260 220 S 340 260, 380 250 S 450 200, 510 195 S 560 160, 590 140 S 650 170, 700 220 S 760 290, 800 280 S 870 240, 910 220 S 950 170, 950 150"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            fill="none"
          />
        </svg>

        {/* Icons positioned along the path */}
        {navItems.map((item, index) => {
          const pos = desktopPositions[index];
          return (
            <a
              key={item.href}
              href={item.href}
              className="absolute group flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              aria-label={`Vai a ${item.label}`}
            >
              <div
                className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-focus-visible:scale-110 group-focus-visible:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-gray-300 group-focus-visible:ring-offset-2`}
              >
                <item.icon className={`w-5 h-5 ${item.iconColor}`} strokeWidth={1.5} />
              </div>
              <span className="text-[11px] text-gray-400 font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>

      {/* Mobile: horizontal scrollable row */}
      <div className="md:hidden">
        <div className="flex gap-6 overflow-x-auto pb-4 px-2 snap-x snap-mandatory" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-2 snap-center shrink-0 group"
              aria-label={`Vai a ${item.label}`}
            >
              <div
                className={`w-11 h-11 rounded-full ${item.bgColor} flex items-center justify-center transition-all duration-300 group-active:scale-95`}
              >
                <item.icon className={`w-5 h-5 ${item.iconColor}`} strokeWidth={1.5} />
              </div>
              <span className="text-[10px] text-gray-400 font-medium tracking-wide whitespace-nowrap">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
