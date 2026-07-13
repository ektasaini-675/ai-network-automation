export default function HealthGauge({ score }) {
  if (score === undefined || score === null) return null;

  let color = "bg-green-500";

  if (score < 80) color = "bg-yellow-500";

  if (score < 60) color = "bg-red-500";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Device Health Score
      </h2>

      <div className="flex justify-between mb-3">

        <span className="font-medium">
          Overall Health
        </span>

        <span className="font-bold text-2xl">
          {score}%
        </span>

      </div>

      <div className="w-full bg-gray-200 rounded-full h-5">

        <div
          className={`${color} h-5 rounded-full transition-all duration-700`}
          style={{
            width: `${score}%`,
          }}
        />

      </div>

      <p className="text-gray-500 mt-4">

        AI-generated health score based on
        CPU, Memory, Latency,
        Packet Loss and Bandwidth.

      </p>

    </div>
  );
}