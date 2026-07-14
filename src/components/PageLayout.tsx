"use client";

import { useSidebar } from "@/context/SidebarContext";
import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";
import { useEffect, useState } from "react";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed } = useSidebar();
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
    <div className="flex h-screen">
      <Sidebar />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isMobile ? "ml-0" : collapsed ? "ml-20" : "ml-72"
        }`}
      >
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}