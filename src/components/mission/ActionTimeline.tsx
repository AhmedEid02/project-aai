type ActionTimelineProps = {
  hazard: string;
};

export default function ActionTimeline({
  hazard,
}: ActionTimelineProps) {
  return (
    <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

      <h3 className="text-xl font-bold text-slate-900">
        Operational Timeline
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Recommended actions over time.
      </p>

      <div className="mt-6 space-y-6">

        <div className="flex gap-4">
          <div className="w-24 font-semibold text-blue-600">
            NOW
          </div>

          <div>
            <p>✓ Notify National Disaster Authority</p>
            <p>✓ Activate District Coordination Team</p>
            <p>✓ Disseminate Community Alerts</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-24 font-semibold text-orange-600">
            +6 Hours
          </div>

          <div>
            <p>✓ Assess vulnerable communities</p>
            <p>✓ Verify field conditions</p>
            <p>✓ Coordinate humanitarian partners</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-24 font-semibold text-red-600">
            +24 Hours
          </div>

          <div>
            <p>✓ Deploy emergency resources</p>
            <p>✓ Monitor situation updates</p>
            <p>✓ Review response effectiveness</p>
          </div>
        </div>

      </div>

    </div>
  );
}