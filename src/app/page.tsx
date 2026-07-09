"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MissionControl from "@/components/layout/MissionControl";
import ARIEConsole from "@/components/arie/ARIEConsole";

export default function Home() {
  return (
    <main className="flex h-screen bg-slate-50">
      <Sidebar />

      <section className="flex flex-1 flex-col overflow-hidden">
        <Topbar />

        <div className="flex-1 overflow-y-auto">
          <MissionControl />

          <div className="p-6">
            <ARIEConsole />
          </div>
        </div>
      </section>
    </main>
  );
}