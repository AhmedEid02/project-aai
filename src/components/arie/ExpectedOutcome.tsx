import { Target } from "lucide-react";

type ExpectedOutcomeItem = {
  label: string;
  value: string;
  detail: string;
};

export function ExpectedOutcome({
  outcomes,
}: {
  outcomes: ExpectedOutcomeItem[];
}) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
        <Target className="h-4 w-4" />
        Expected Operational Outcome
      </div>

      <h2 className="mt-3 text-xl font-bold text-white">
        What should improve if action is taken?
      </h2>

      <div className="mt-5 space-y-3">
        {outcomes.map((outcome) => (
          <article
            key={outcome.label}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white">
                  {outcome.label}
                </div>
                <p className="mt-1 text-sm leading-5 text-slate-400">
                  {outcome.detail}
                </p>
              </div>

              <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs font-semibold text-cyan-200">
                {outcome.value}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}