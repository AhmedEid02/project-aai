import { Handshake, Siren, UsersRound } from "lucide-react";

type ActionPackage = {
  stakeholder: string;
  action: string;
  window: string;
  priority: "Low" | "Medium" | "High" | "Critical";
};

export function OperationalDecision({
  packages,
}: {
  packages: ActionPackage[];
}) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
        <Siren className="h-4 w-4" />
        Operational Decision
      </div>

      <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
          Recommended decision
        </div>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Activate district anticipatory action coordination
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          ARIE recommends a no-regrets coordination trigger: validate priority
          locations, prepare early action packages, and push localized advisories
          before households shift into erosive coping.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {packages.map((item) => (
          <article
            key={item.stakeholder}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <UsersRound className="h-4 w-4 text-cyan-300" />
                  {item.stakeholder}
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {item.action}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 md:justify-end">
                <span className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                  {item.window}
                </span>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    item.priority === "Critical"
                      ? "bg-red-400/10 text-red-200"
                      : item.priority === "High"
                        ? "bg-amber-400/10 text-amber-200"
                        : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {item.priority}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Handshake className="h-4 w-4 text-emerald-300" />
          Coordination logic
        </div>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          The decision is not only a warning. It defines who should act, what
          they should do, and when action should begin.
        </p>
      </div>
    </section>
  );
}