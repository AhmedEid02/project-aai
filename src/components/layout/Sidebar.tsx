"use client";

import {
  BrainCircuit,
  ClipboardCheck,
  Home,
  Layers3,
  Rocket,
  ScrollText,
  ShieldCheck,
} from "lucide-react";

const menuItems = [
  {
    label: "Mission Control",
    href: "#mission-control",
    icon: Home,
  },
  {
    label: "Final Sprint",
    href: "#final-sprint",
    icon: Rocket,
  },
  {
    label: "ARIE Console",
    href: "#arie-console",
    icon: BrainCircuit,
  },
  {
    label: "Climate Fusion",
    href: "#arie-console",
    icon: Layers3,
  },
  {
    label: "AIDA Briefs",
    href: "#arie-console",
    icon: ScrollText,
  },
  {
    label: "Operational Products",
    href: "#arie-console",
    icon: ClipboardCheck,
  },
  {
    label: "Evidence & Actions",
    href: "#arie-console",
    icon: ShieldCheck,
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-white">
      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-3xl font-bold tracking-tight">AAI</h1>

        <p className="mt-2 text-sm leading-5 text-cyan-100/80">
          Adaptive Action Intelligence
        </p>

        <p className="mt-3 text-xs leading-5 text-slate-500">
          Early Warning → Coordinated Early Action
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Demo Navigation
        </div>

        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white"
                >
                  <Icon className="h-4 w-4 text-cyan-300" />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4">
        <div className="text-xs font-semibold text-slate-300">
          Prototype v1.0
        </div>

        <div className="mt-1 text-xs leading-5 text-slate-500">
          IGAD/ICPAC Hackathon
        </div>
      </div>
    </aside>
  );
}