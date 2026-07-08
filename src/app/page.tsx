"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MissionControl from "@/components/layout/MissionControl";

export default function Home() {
  return (
    <main className="flex h-screen bg-slate-50">

      <Sidebar />

      <section className="flex flex-1 flex-col">

        <Topbar />

        <MissionControl />

      </section>

    </main>
  );
}