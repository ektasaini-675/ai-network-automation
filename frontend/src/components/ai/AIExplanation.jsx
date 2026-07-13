import {
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function AIExplanation({ device }) {

  if (!device) return null;

  const reasons = [];

  if (device.cpu_usage > 80)
    reasons.push({
      text: "High CPU utilization detected.",
      danger: true,
    });

  if (device.memory_usage > 80)
    reasons.push({
      text: "Memory usage is above recommended levels.",
      danger: true,
    });

  if (device.latency > 60)
    reasons.push({
      text: "Network latency is unusually high.",
      danger: true,
    });

  if (device.packet_loss > 2)
    reasons.push({
      text: "Packet loss may impact connectivity.",
      danger: true,
    });

  if (reasons.length === 0)
    reasons.push({
      text: "All monitored parameters are within safe limits.",
      danger: false,
    });

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">

        AI Explanation

      </h2>

      <div className="space-y-4">

        {reasons.map((item, index) => (

          <div
            key={index}
            className="flex items-start gap-3"
          >

            {item.danger ? (

              <AlertTriangle
                className="text-red-500 mt-1"
                size={20}
              />

            ) : (

              <CheckCircle
                className="text-green-500 mt-1"
                size={20}
              />

            )}

            <p className="text-gray-700">

              {item.text}

            </p>

          </div>

        ))}

      </div>

    </div>

  );
}