import {
  MapPinned,
  BrainCircuit,
  CloudRain,
  Sprout,
  ShieldAlert,
  FileText,
  ChevronRight,
} from "lucide-react";

const steps = [
  {
    title: "Incident",
    subtitle: "Field Report",
    icon: MapPinned,
    color: "bg-slate-100 text-slate-700",
  },
  {
    title: "Assessment",
    subtitle: "AI Risk Analysis",
    icon: BrainCircuit,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Climate",
    subtitle: "Evidence Fusion",
    icon: CloudRain,
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    title: "Impacts",
    subtitle: "Expected Effects",
    icon: Sprout,
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "Actions",
    subtitle: "Priority Response",
    icon: ShieldAlert,
    color: "bg-orange-100 text-orange-700",
  },
  {
    title: "Reports",
    subtitle: "Operational Products",
    icon: FileText,
    color: "bg-emerald-100 text-emerald-700",
  },
];

export default function IntelligencePipeline() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">
          Adaptive Action Intelligence Pipeline
        </h2>

        <p className="text-sm text-slate-500">
          From incident detection to operational decision support.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">

        {steps.map((step, index) => {

          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="flex items-center gap-3"
            >

              <div className="flex w-36 flex-col items-center rounded-xl border bg-slate-50 p-4">

                <div
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${step.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <div className="text-center">

                  <p className="font-semibold">
                    {step.title}
                  </p>

                  <p className="text-xs text-slate-500">
                    {step.subtitle}
                  </p>

                </div>

              </div>

              {index < steps.length - 1 && (
                <ChevronRight className="h-6 w-6 text-slate-400" />
              )}

            </div>
          );

        })}

      </div>

    </div>
  );
}