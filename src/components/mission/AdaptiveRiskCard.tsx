type AdaptiveRiskCardProps = {
  score: number;
};

export default function AdaptiveRiskCard({
  score,
}: AdaptiveRiskCardProps) {
  let level = "Low";
  let color = "text-green-600";

  if (score >= 25) {
    level = "Moderate";
    color = "text-yellow-600";
  }

  if (score >= 50) {
    level = "High";
    color = "text-orange-600";
  }

  if (score >= 75) {
    level = "Critical";
    color = "text-red-600";
  }

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Adaptive Risk
      </p>

      <h3 className={`mt-2 text-2xl font-bold ${color}`}>
        {score}
      </h3>

      <p className={`mt-1 text-sm font-semibold ${color}`}>
        {level}
      </p>
    </div>
  );
}