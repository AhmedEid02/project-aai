"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import { useEffect, useState } from "react";

export default function Topbar() {
  const { collapsed, setCollapsed } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm flex-shrink-0">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Hide toggle button on mobile since we have the hamburger menu */}
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-2 transition hover:bg-slate-100"
            aria-label="Toggle Sidebar"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-6 w-6 text-slate-700" />
            ) : (
              <PanelLeftClose className="h-6 w-6 text-slate-700" />
            )}
          </button>
        )}

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Adaptive Action Intelligence
          </h1>
          <p className="text-sm text-slate-500">
            From Early Warning to Coordinated Action
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          Ahmed
        </div>
      </div>
    </header>
  );
}