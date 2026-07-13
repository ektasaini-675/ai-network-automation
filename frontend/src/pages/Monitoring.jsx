import { useEffect, useState } from "react";
import NetworkChart from "../components/charts/NetworkChart";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { BrainCircuit } from "lucide-react";

export default function Monitoring() {

  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();

  async function loadMonitoring() {
    try {
      const response = await api.get("/monitoring/");
      setDevices(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {

    loadMonitoring();

    const interval = setInterval(loadMonitoring, 5000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div>

      <h1 className="text-4xl font-bold mb-2">
        AI Network Operations Center
      </h1>

      <p className="text-gray-500 mb-8">
        AI Powered Device Monitoring & Health Prediction
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {devices.map((device) => (

          <div
            key={device.id}
            className="bg-white rounded-2xl shadow-lg p-6"
          >

            <div className="flex justify-between items-center mb-6">

              <div>

                <h2 className="text-xl font-bold">
                  {device.hostname}
                </h2>

                <p className="text-gray-500">
                  {device.ip_address}
                </p>

              </div>

              <span
                className={`px-4 py-2 rounded-full font-semibold ${device.health_score >= 80
                  ? "bg-green-100 text-green-700"
                  : device.health_score >= 60
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                  }`}
              >
                {device.status}
              </span>

            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">

              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-gray-500">CPU</p>
                <h3 className="text-2xl font-bold text-blue-600">
                  {device.cpu_usage}%
                </h3>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-gray-500">Memory</p>
                <h3 className="text-2xl font-bold text-green-600">
                  {device.memory_usage}%
                </h3>
              </div>

              <div className="bg-orange-50 rounded-xl p-4">
                <p className="text-gray-500">Latency</p>
                <h3 className="text-2xl font-bold text-orange-500">
                  {device.latency} ms
                </h3>
              </div>

              <div className="bg-red-50 rounded-xl p-4">
                <p className="text-gray-500">Packet Loss</p>
                <h3 className="text-2xl font-bold text-red-600">
                  {device.packet_loss}%
                </h3>
              </div>

            </div>

            <div className="border-t pt-4">

              <div className="flex justify-between items-center mb-3">

                <div className="flex items-center gap-2">

                  <BrainCircuit
                    size={18}
                    className="text-indigo-600"
                  />

                  <span className="font-semibold">
                    AI Health Score
                  </span>

                </div>

                <span className="text-2xl font-bold text-indigo-600">
                  {device.health_score}%
                </span>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">

                <div
                  className={`h-3 rounded-full ${device.health_score >= 80
                    ? "bg-green-500"
                    : device.health_score >= 60
                      ? "bg-yellow-500"
                      : "bg-red-500"
                    }`}
                  style={{
                    width: `${device.health_score}%`,
                  }}
                />

              </div>

              <p className="mt-4 text-gray-600">

                <span className="font-semibold">
                  Recommendation:
                </span>

                {" "}

                {device.recommendation}

              </p>

            </div>

            <div className="mt-6">

              <button
                onClick={() =>
                  navigate("/prediction", {
                    state: { device },
                  })
                }
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition duration-300"
              >
                🤖 Analyze with AI
              </button>

            </div>

          </div>

        ))}

      </div>

      <NetworkChart />

    </div>

  );

}