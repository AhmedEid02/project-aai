import {

  Wheat,

  Beef,

  Droplets,

  Users,

  TriangleAlert,

} from "lucide-react";



import type { IntelligenceContext } from "@/lib/intelligence";



type Props = {

  context: IntelligenceContext;

};



const getBadgeColor = (level: string) => {

  switch (level) {

    case "High":

      return "bg-red-100 text-red-700 border-red-200";

    case "Moderate":

      return "bg-amber-100 text-amber-700 border-amber-200";

    default:

      return "bg-green-100 text-green-700 border-green-200";

  }

};



export default function ExpectedImpactCard({ context }: Props) {

  const impact = context.impact;



  const items = [

    {

      title: "Crop Impact",

      value: impact.cropImpact,

      icon: Wheat,

    },

    {

      title: "Livestock Impact",

      value: impact.livestockImpact,

      icon: Beef,

    },

    {

      title: "Water Impact",

      value: impact.waterImpact,

      icon: Droplets,

    },

    {

      title: "Community Impact",

      value: impact.communityImpact,

      icon: Users,

    },

    {

      title: "Humanitarian Priority",

      value: impact.humanitarianPriority,

      icon: TriangleAlert,

    },

  ];



  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-900">

          Expected Impacts

        </h2>

        <p className="mt-1 text-sm text-slate-600">

          Estimated sectoral impacts based on the current incident and

          climate evidence.

        </p>

      </div>



      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">

        {items.map((item) => {

          const Icon = item.icon;



          return (

            <div

              key={item.title}

              className="rounded-xl border border-slate-200 p-4 transition-shadow hover:shadow-md"

            >

              <div className="mb-3 flex items-center gap-2">

                <Icon className="h-5 w-5 text-cyan-600" />

                <span className="text-sm font-semibold text-slate-700">

                  {item.title}

                </span>

              </div>



              <span

                className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${getBadgeColor(

                  item.value

                )}`}

              >

                {item.value}

              </span>

            </div>

          );

        })}

      </div>

    </div>

  );

}