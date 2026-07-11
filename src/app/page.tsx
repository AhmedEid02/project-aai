"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MissionControl from "@/components/layout/MissionControl";
import { SprintClock } from "@/components/arie/SprintClock";
import ARIEConsole from "@/components/arie/ARIEConsole";

export default function Home() {
  return (
    <main className="flex h-screen scroll-smooth bg-slate-50">
      <Sidebar />

      <section className="flex flex-1 flex-col overflow-hidden">
        <Topbar />

        <div className="flex-1 scroll-smooth overflow-y-auto">
          <section id="mission-control" className="scroll-mt-6">
            <MissionControl />
          </section>

          <div className="space-y-6 p-6">
            <section id="final-sprint" className="scroll-mt-6">
              <SprintClock />
            </section>

            <section id="arie-console" className="scroll-mt-6">
              <ARIEConsole />
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}