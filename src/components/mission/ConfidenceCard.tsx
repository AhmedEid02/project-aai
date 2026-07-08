type ConfidenceCardProps = {
  confidence: number;
};

export default function ConfidenceCard({
  confidence,
}: ConfidenceCardProps) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Confidence
      </p>

      <h3 className="mt-2 text-2xl font-bold text-blue-600">
        {confidence}%
      </h3>

      <div className="mt-3 h-2 rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${confidence}%`,
          }}
        />
      </div>
    </div>
  );
}