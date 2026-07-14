"use client";

import {
  BrainCircuit,
  ClipboardCheck,
  Home,
  Layers3,
  Rocket,
  ScrollText,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { useSidebar } from "@/context/SidebarContext";

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
    href: "#climate-fusion",
    icon: Layers3,
  },
  {
    label: "AIDA Briefs",
    href: "#aida-briefs",
    icon: ScrollText,
  },
  {
    label: "Operational Products",
    href: "#operational-products",
    icon: ClipboardCheck,
  },
  {
    label: "Evidence & Actions",
    href: "#evidence-actions",
    icon: ShieldCheck,
  },
];

export default function Sidebar() {
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <aside
      className={`relative flex h-screen shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-white transition-all duration-300 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Collapse Button */}

      <button
        onClick={toggleSidebar}
        className="absolute right-4 top-4 z-50 rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
      >
        {collapsed ? (
          <PanelLeftOpen className="h-5 w-5" />
        ) : (
          <PanelLeftClose className="h-5 w-5" />
        )}
      </button>

      {/* Header */}

      <div className="border-b border-slate-800 p-6">
        {!collapsed ? (
          <>
            <h1 className="text-3xl font-bold tracking-tight">
              AAI
            </h1>

            <p className="mt-2 text-sm text-cyan-100/80">
              Adaptive Action Intelligence
            </p>

            <p className="mt-3 text-xs text-slate-500">
              Early Warning → Coordinated Early Action
            </p>
          </>
        ) : (
          <div className="mt-4 flex justify-center">
            <span className="text-3xl font-bold">A</span>
          </div>
        )}
      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto p-4">
        {!collapsed && (
          <div className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Operational Modules
          </div>
        )}

        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  title={collapsed ? item.label : ""}
                  className={`flex items-center rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-slate-800 hover:text-white ${
                    collapsed
                      ? "justify-center text-cyan-300"
                      : "gap-3 text-slate-200"
                  }`}
                >
                  <Icon className="h-5 w-5" />

                  {!collapsed && (
                    <span>{item.label}</span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}

      <div className="border-t border-slate-800 p-4">
        {!collapsed ? (
          <>
            <div className="text-xs font-semibold text-slate-300">
              Prototype v1.0
            </div>

            <div className="mt-1 text-xs text-slate-500">
              IGAD / ICPAC Hackathon
            </div>

            <div className="mt-2 text-xs text-cyan-400">
              Operational Demo
            </div>
          </>
        ) : (
          <div className="flex justify-center">
            <span className="rounded-full bg-cyan-500 px-2 py-1 text-xs font-bold text-slate-950">
              A
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}