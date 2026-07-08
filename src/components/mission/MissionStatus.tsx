type MissionStatusProps = {
  recommendation: string;
};

export default function MissionStatus({
  recommendation,
}: MissionStatusProps) {
  let label = "Preparing";
  let bgColor = "bg-yellow-100";
  let textColor = "text-yellow-700";

  if (recommendation === "Proceed with Early Action") {
    label = "Early Action";
    bgColor = "bg-orange-100";
    textColor = "text-orange-700";
  }

  if (recommendation === "Escalate Emergency Preparedness") {
    label = "Emergency";
    bgColor = "bg-red-100";
    textColor = "text-red-700";
  }

  return (
    <div className={`rounded-lg ${bgColor} p-4`}>
      <p className={`text-xs font-semibold uppercase tracking-wide ${textColor}`}>
        Mission Status
      </p>

      <h3 className={`mt-2 text-xl font-bold ${textColor}`}>
        {label}
      </h3>
    </div>
  );
}