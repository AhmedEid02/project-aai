import { Database, FileSearch, ShieldCheck } from "lucide-react";

type Evidence = {
  source: string;
  signal: string;
  confidence: "Low" | "Medium" | "High";
  use: string;
};

export function EvidencePanel({ evidence }: { evidence: Evidence[] }) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
        <Database className="h-4 w-4" />
        Evidence Panel
      </div>

      <h2 className="mt-3 text-xl font-bold text-white">
        Explainable intelligence trace
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-300">
        Every recommendation should show what evidence was used, how strong it is,
        and why it matters for early action.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {evidence.map((item) => (
          <article
            key={item.source}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <FileSearch className="h-4 w-4 text-cyan-300" />
                {item.source}
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  item.confidence === "High"
                    ? "bg-emerald-400/10 text-emerald-200"
                    : item.confidence === "Medium"
                      ? "bg-amber-400/10 text-amber-200"
                      : "bg-red-400/10 text-red-200"
                }`}
              >
                {item.confidence}
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              {item.signal}
            </p>

            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5" />
                Operational use
              </div>

              <p className="mt-2 text-sm leading-5 text-slate-400">
                {item.use}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}