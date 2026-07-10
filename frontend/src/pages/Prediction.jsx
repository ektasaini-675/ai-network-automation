import { useEffect, useState } from "react";
import api from "../services/api";

export default function Prediction() {

  const [devices, setDevices] = useState([]);

  async function loadPredictions() {

    try {

      const response = await api.get("/monitoring/");

      setDevices(response.data);

    } catch (error) {

      console.error(error);

    }

  }

  useEffect(() => {

    loadPredictions();

  }, []);

  const healthy = devices.filter(
    (d) => d.health_score >= 80
  ).length;

  const warning = devices.filter(
    (d) => d.health_score >= 60 && d.health_score < 80
  ).length;

  const critical = devices.filter(
    (d) => d.health_score < 60
  ).length;

  const averageHealth =
    devices.length > 0
      ? (
          devices.reduce(
            (sum, d) => sum + d.health_score,
            0
          ) / devices.length
        ).toFixed(1)
      : 0;

  const criticalDevices = [...devices]
    .sort((a, b) => a.health_score - b.health_score)
    .slice(0, 5);

  return (

    <div>

      <h1 className="text-4xl font-bold mb-2">

        AI Insights

      </h1>

      <p className="text-gray-500 mb-8">

        AI-powered network health analysis and recommendations

      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <p className="text-gray-500">

            Average Health

          </p>

          <h2 className="text-4xl font-bold text-indigo-600 mt-3">

            {averageHealth}%

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <p className="text-gray-500">

            Healthy Devices

          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-3">

            {healthy}

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <p className="text-gray-500">

            Warning Devices

          </p>

          <h2 className="text-4xl font-bold text-yellow-500 mt-3">

            {warning}

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <p className="text-gray-500">

            Critical Devices

          </p>

          <h2 className="text-4xl font-bold text-red-600 mt-3">

            {critical}

          </h2>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

        <h2 className="text-2xl font-bold mb-6">

          AI Recommendations

        </h2>

        <div className="space-y-4">

          {criticalDevices.length === 0 ? (

            <p className="text-green-600">

              No critical devices detected.

            </p>

          ) : (

            criticalDevices.map((device) => (

              <div
                key={device.id}
                className="border rounded-xl p-5 hover:bg-gray-50"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="font-bold text-lg">

                      {device.hostname}

                    </h3>

                    <p className="text-gray-500">

                      {device.ip_address}

                    </p>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-full font-medium ${
                      device.health_score >= 80
                        ? "bg-green-100 text-green-700"
                        : device.health_score >= 60
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {device.health_score}%

                  </span>

                </div>

                <div className="mt-4">

                  <p>

                    <span className="font-semibold">

                      Status:

                    </span>{" "}

                    {device.status}

                  </p>

                  <p className="mt-2">

                    <span className="font-semibold">

                      Recommendation:

                    </span>{" "}

                    {device.recommendation}

                  </p>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );

}