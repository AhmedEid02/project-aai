type Stakeholder = {
  title: string;
  actions: string[];
};

const stakeholderPackages: Stakeholder[] = [
  {
    title: "Ministry of Agriculture",
    actions: [
      "Deploy agricultural extension officers.",
      "Monitor crop and pasture conditions.",
      "Coordinate drought preparedness activities.",
    ],
  },
  {
    title: "ICPAC",
    actions: [
      "Continue monitoring regional forecasts.",
      "Share updated climate outlooks.",
      "Provide technical advisory support.",
    ],
  },
  {
    title: "District Authority",
    actions: [
      "Activate the district disaster committee.",
      "Coordinate local response partners.",
      "Report field observations.",
    ],
  },
  {
    title: "Humanitarian Partners",
    actions: [
      "Review contingency resources.",
      "Prepare targeted assistance.",
      "Coordinate with government agencies.",
    ],
  },
  {
    title: "Communities",
    actions: [
      "Conserve available water.",
      "Protect livestock assets.",
      "Follow official advisories.",
    ],
  },
];

export default function StakeholderActions() {
  return (
    <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold">
        Stakeholder Action Packages
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Tailored operational guidance for each stakeholder.
      </p>

      <div className="mt-6 space-y-5">
        {stakeholderPackages.map((stakeholder) => (
          <div
            key={stakeholder.title}
            className="rounded-xl border p-5"
          >
            <h4 className="font-semibold text-slate-900">
              {stakeholder.title}
            </h4>

            <ul className="mt-3 space-y-2">
              {stakeholder.actions.map((action) => (
                <li key={action}>• {action}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}