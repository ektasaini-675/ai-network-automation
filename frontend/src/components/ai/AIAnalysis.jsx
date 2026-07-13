import { useEffect, useState } from "react";
import api from "../../services/api";

import DeviceTelemetry from "./DeviceTelemetry";
import PredictionCard from "./PredictionCard";
import HealthGauge from "./HealthGauge";
import AIExplanation from "./AIExplanation";

export default function AIAnalysis({ device }) {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!device) return;

    async function analyzeDevice() {
      try {
        setLoading(true);
        setError("");
        setPrediction(null);

        const response = await api.post("/prediction/", {
          cpu_usage: device.cpu_usage,
          memory_usage: device.memory_usage,
          latency: device.latency,
          packet_loss: device.packet_loss,
          bandwidth: device.bandwidth,
          device_type: device.device_type,
          location: device.location,
        });

        setPrediction(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to analyze device.");
      } finally {
        setLoading(false);
      }
    }

    analyzeDevice();
  }, [device]);

  if (!device) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
        <h2 className="text-2xl font-bold mb-3">
          No Device Selected
        </h2>

        <p className="text-gray-500">
          Select a device to begin AI analysis.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
        <h2 className="text-2xl font-bold">
          🤖 AI is analyzing the device...
        </h2>

        <p className="text-gray-500 mt-4">
          Running the machine learning model...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-300 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-red-600">
          {error}
        </h2>
      </div>
    );
  }

  if (!prediction) return null;

  return (
    <div className="space-y-8">

      <DeviceTelemetry device={device} />

      <HealthGauge score={prediction.health_score} />

      <PredictionCard prediction={prediction} />

      <AIExplanation device={device} />

    </div>
  );
}