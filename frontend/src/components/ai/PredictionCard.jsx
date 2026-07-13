import {
  BrainCircuit,
  ShieldCheck,
  AlertTriangle,
  BadgeCheck,
} from "lucide-react";

export default function PredictionCard({ prediction }) {
  if (!prediction) return null;

  const riskColor =
    prediction.risk === "Low"
      ? "bg-green-100 text-green-700"
      : prediction.risk === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex items-center gap-3 mb-6">

        <BrainCircuit
          className="text-indigo-600"
          size={28}
        />

        <h2 className="text-2xl font-bold">
          AI Prediction Result
        </h2>

      </div>

      <div className="space-y-5">

        <div className="flex justify-between items-center">

          <span className="font-medium">
            Prediction
          </span>

          <span className="font-bold text-indigo-600">
            {prediction.prediction}
          </span>

        </div>

        <div className="flex justify-between items-center">

          <span className="font-medium">
            Confidence
          </span>

          <span className="font-bold">
            {prediction.confidence}%
          </span>

        </div>

        <div className="flex justify-between items-center">

          <span className="font-medium">
            Health Score
          </span>

          <span className="font-bold text-green-600">
            {prediction.health_score}%
          </span>

        </div>

        <div className="flex justify-between items-center">

          <span className="font-medium">
            Risk Level
          </span>

          <span
            className={`px-3 py-1 rounded-full font-semibold ${riskColor}`}
          >
            {prediction.risk}
          </span>

        </div>

        <div className="border-t pt-5">

          <div className="flex items-start gap-3">

            {prediction.risk === "Low" ? (
              <BadgeCheck
                className="text-green-600 mt-1"
                size={22}
              />
            ) : prediction.risk === "Medium" ? (
              <AlertTriangle
                className="text-yellow-500 mt-1"
                size={22}
              />
            ) : (
              <ShieldCheck
                className="text-red-600 mt-1"
                size={22}
              />
            )}

            <div>

              <p className="font-semibold mb-2">
                AI Recommendation
              </p>

              <p className="text-gray-600">
                {prediction.recommendation}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}