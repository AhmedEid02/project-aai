"use client";

import { useSidebar } from "@/context/SidebarContext";
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
import { useState, useEffect } from "react";

export default function Sidebar() {
  const { collapsed, setCollapsed } = useSidebar();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const menuItems = [
    { name: "Mission Control", icon: Home, href: "#mission-control" },
    { name: "Final Sprint", icon: Rocket, href: "#final-sprint" },
    { name: "ARIE Console", icon: Brain, href: "#arie-console" },
    { name: "Climate Fusion", icon: Layers, href: "#climate-fusion" },
    { name: "AIDA Briefs", icon: FileText, href: "#aida-briefs" },
    { name: "Operational Products", icon: ClipboardList, href: "#operational-products" },
    { name: "Evidence & Actions", icon: ShieldCheck, href: "#evidence-actions" },
  ];

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  // Determine sidebar classes
  const getSidebarClasses = () => {
    if (isMobile) {
      return `
        fixed left-0 top-0 h-screen z-50
        bg-[#020617]
        text-white
        border-r border-slate-800
        transition-transform duration-300
        flex flex-col
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        w-72
      `;
    }
    
    return `
      fixed left-0 top-0 h-screen z-50
      bg-[#020617]
      text-white
      border-r border-slate-800
      transition-all duration-300
      flex flex-col
      ${collapsed ? "w-20" : "w-72"}
    `;
  };

  // Determine what to show based on collapsed state
  const showFullContent = !collapsed || isMobile;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 md:hidden bg-[#020617] text-white p-2 rounded-lg hover:bg-slate-800 transition"
        aria-label="Toggle Menu"
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={getSidebarClasses()}>
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-800 flex-shrink-0">
          <h1 className="text-4xl font-bold">AAI</h1>

          {showFullContent && (
            <>
              <p className="mt-4 text-cyan-300 text-sm">
                Adaptive Action Intelligence
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Early Warning → Coordinated Early Action
              </p>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6 px-4 overflow-y-auto">
          {showFullContent && (
            <p className="mb-4 text-xs tracking-widest text-slate-400 font-medium">
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
                  className="
                    flex items-center gap-4
                    rounded-lg
                    px-3 py-3
                    hover:bg-slate-800
                    transition cursor-pointer
                    group
                  "
                >
                  <Icon className="h-5 w-5 text-cyan-400 flex-shrink-0" />
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

        {/* Footer */}
        {showFullContent && (
          <div className="border-t border-slate-800 p-4 flex-shrink-0">
            <p className="text-xs text-slate-500">Prototype v1.0</p>
            <p className="text-xs text-slate-500">IGAD/ICPAC Hackathon</p>
          </div>
        )}
      </aside>
    </>
  );
}