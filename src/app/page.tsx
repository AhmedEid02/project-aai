"use client";

import PageLayout from "@/components/PageLayout";
import MissionControl from "@/components/layout/MissionControl";
import { SprintClock } from "@/components/arie/SprintClock";
import ARIEConsole from "@/components/arie/ARIEConsole";

export default function Home() {
  return (
    <PageLayout>
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
    </PageLayout>
  );
}