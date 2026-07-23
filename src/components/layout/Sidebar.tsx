"use client";

import { useEffect, useState } from "react";
import {
  Home,
  Rocket,
  Brain,
  Layers,
  FileText,
  ClipboardList,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";

import { useSidebar } from "@/context/SidebarContext";

const menuItems = [
  {
    name: "Mission Control",
    icon: Home,
    href: "#mission-control",
  },
  {
    name: "Final Sprint",
    icon: Rocket,
    href: "#final-sprint",
  },
  {
    name: "ARIE Console",
    icon: Brain,
    href: "#arie-console",
  },
  {
    name: "Climate Fusion",
    icon: Layers,
    href: "#climate-fusion",
  },
  {
    name: "AIDA Briefs",
    icon: FileText,
    href: "#aida-briefs",
  },
  {
    name: "Operational Products",
    icon: ClipboardList,
    href: "#operational-products",
  },
  {
    name: "Evidence & Actions",
    icon: ShieldCheck,
    href: "#evidence-actions",
  },
];

export default function Sidebar() {
  const { collapsed } = useSidebar();

  const [isMobileOpen, setIsMobileOpen] =
    useState(false);

  const [isMobile, setIsMobile] =
    useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener(
      "resize",
      checkMobile,
    );

    return () => {
      window.removeEventListener(
        "resize",
        checkMobile,
      );
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileOpen(
      (currentState) => !currentState,
    );
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  const getSidebarClasses = () => {
    if (isMobile) {
      return `
        fixed left-0 top-0 z-50
        flex h-screen w-72 flex-col
        border-r border-slate-800
        bg-[#020617] text-white
        transition-transform duration-300
        ${
          isMobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
      `;
    }

    return `
      fixed left-0 top-0 z-50
      flex h-screen flex-col
      border-r border-slate-800
      bg-[#020617] text-white
      transition-all duration-300
      ${collapsed ? "w-20" : "w-72"}
    `;
  };

  const showFullContent =
    !collapsed || isMobile;

  return (
    <>
      <button
        type="button"
        onClick={toggleMobileMenu}
        className="fixed left-4 top-4 z-50 rounded-lg bg-[#020617] p-2 text-white transition hover:bg-slate-800 md:hidden"
        aria-label={
          isMobileOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        aria-expanded={isMobileOpen}
      >
        {isMobileOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {isMobile && isMobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Close navigation menu"
        />
      )}

      <aside className={getSidebarClasses()}>
        <div className="flex-shrink-0 border-b border-slate-800 p-6">
          <h1 className="text-4xl font-bold">
            AAI
          </h1>

          {showFullContent && (
            <>
              <p className="mt-4 text-sm text-cyan-300">
                Adaptive Action Intelligence
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Early Warning → Coordinated
                Early Action
              </p>
            </>
          )}
        </div>

        <nav className="mt-6 flex-1 overflow-y-auto px-4">
          {showFullContent && (
            <p className="mb-4 text-xs font-medium tracking-widest text-slate-400">
              DEMO NAVIGATION
            </p>
          )}

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="group flex cursor-pointer items-center gap-4 rounded-lg px-3 py-3 transition hover:bg-slate-800"
                >
                  <Icon
                    className="h-5 w-5 flex-shrink-0 text-cyan-400"
                    aria-hidden="true"
                  />

                  {showFullContent && (
                    <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                      {item.name}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </nav>

        {showFullContent && (
          <div className="flex-shrink-0 border-t border-slate-800 p-4">
            <p className="text-sm font-semibold text-cyan-400">
              Adaptive Action Intelligence
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Version 1.0
            </p>

            <p className="text-xs text-slate-500">
              IGAD • ICPAC Hackathon 2026
            </p>
          </div>
        )}
      </aside>
    </>
  );
}