"use client";

import {
  CloudRain,
  Droplets,
  Trees,
  Users,
  TrendingUp,
  BrainCircuit,
  ArrowDown,
} from "lucide-react";

import type { Assessment } from "@/lib/intelligence";

type ClimateFusionTraceProps = {
  assessment: Assessment;
};

type FusionNode = {
  title: string;
  value: string;
  confidence: number;
  explanation: string;
  icon: React.ReactNode;
};

export default function ClimateFusionTrace({
  assessment,
}: ClimateFusionTraceProps) {

  const nodes: FusionNode[] =
  assessment.drivers.map((driver) => {

    const icon =
  driver.label.toLowerCase().includes("rain")
    ? <CloudRain className="h-5 w-5 text-cyan-700" />

  : driver.label.toLowerCase().includes("water")
    ? <Droplets className="h-5 w-5 text-blue-700" />

  : driver.label.toLowerCase().includes("pasture")
    ? <Trees className="h-5 w-5 text-green-700" />

  : driver.label.toLowerCase().includes("livelihood")
    ? <Users className="h-5 w-5 text-amber-700" />

  : <TrendingUp className="h-5 w-5 text-red-700" />;

    return {

      title: driver.label,

      value: driver.trend,

      confidence: driver.score,

      explanation: driver.evidence,

      icon,

    };

  });

  return (

    <section className="rounded-3xl border bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">

        <BrainCircuit className="h-7 w-7 text-cyan-600"/>

        <div>

          <h2 className="text-2xl font-bold">

            Climate Fusion Trace

          </h2>

          <p className="text-sm text-slate-500">

            Explainable reasoning behind the operational recommendation.

          </p>

        </div>

      </div>

      <div className="mt-8 space-y-4">

        {nodes.map((node,index)=>(

          <div key={node.title}>

            <div className="rounded-2xl border bg-slate-50 p-5">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  {node.icon}

                  <div>

                    <div className="font-semibold">

                      {node.title}

                    </div>

                    <div className="text-sm text-slate-500">

                      {node.explanation}

                    </div>

                  </div>

                </div>

                <div className="text-right">

                  <div className="font-bold">

                    {node.value}

                  </div>

                  <div className="text-xs text-slate-500">

                    {node.confidence}% confidence

                  </div>

                </div>

              </div>

            </div>

            {index < nodes.length-1 && (

              <div className="flex justify-center py-2">

                <ArrowDown className="h-5 w-5 text-slate-400"/>

              </div>

            )}

          </div>

        ))}

      </div>

    </section>

  );

}