import {
  CloudRain,
  Droplets,
  MapPinned,
  ThermometerSun,
  UsersRound,
  Wind,
} from "lucide-react";

const climateSignals = [
  {
    label: "Rainfall signal",
    value: "Below normal",
    detail: "Seasonal rainfall performance requires field validation.",
    icon: CloudRain,
  },
  {
    label: "Temperature stress",
    value: "Elevated",
    detail: "Higher daytime heat may increase crop and livestock stress.",
    icon: ThermometerSun,
  },
  {
    label: "Water availability",
    value: "Tightening",
    detail: "Pressure expected around shallow wells, berkads, and boreholes.",
    icon: Droplets,
  },
  {
    label: "Wind / dust exposure",
    value: "Moderate",
    detail: "May affect road movement, water access, and field operations.",
    icon: Wind,
  },
];

export function ClimateContext() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
            <MapPinned className="h-4 w-4" />
            Situation Awareness
          </div>

          <h2 className="mt-3 text-xl font-bold text-white">
            Gabiley Agro-Pastoral Monitoring Cell
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            The current scenario focuses on dryland farming and pastoral livelihood
            exposure, where climate advisories must move quickly from technical
            warning into local decisions on planting, water, pasture, livestock
            movement, and household preparedness.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            <UsersRound className="h-4 w-4" />
            Exposed groups
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "Smallholder farmers",
              "Pastoralists",
              "Women farmers",
              "Youth messengers",
            ].map((group) => (
              <span
                key={group}
                className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-200"
              >
                {group}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {climateSignals.map((signal) => {
          const Icon = signal.icon;

          return (
            <article
              key={signal.label}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <Icon className="h-5 w-5 text-cyan-300" />
                <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
                  Climate signal
                </span>
              </div>

              <div className="mt-4 text-xs uppercase tracking-[0.16em] text-slate-500">
                {signal.label}
              </div>

              <div className="mt-1 text-lg font-bold text-white">
                {signal.value}
              </div>

              <p className="mt-2 text-sm leading-5 text-slate-400">
                {signal.detail}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}