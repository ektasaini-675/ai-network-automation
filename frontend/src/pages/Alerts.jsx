import { useEffect, useState } from "react";
import api from "../services/api";

export default function Alerts() {

  const [alerts, setAlerts] = useState([]);

  async function loadAlerts() {

    try {

      const response = await api.get("/alerts");

      setAlerts(response.data);

    } catch (error) {

      console.error(error);

    }

  }

  useEffect(() => {

    loadAlerts();

    const interval = setInterval(loadAlerts, 5000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div>

      <h1 className="text-4xl font-bold mb-2">

        Alert Center

      </h1>

      <p className="text-gray-500 mb-8">

        Real-time network alerts and incidents

      </p>

      {alerts.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

          <h2 className="text-2xl font-bold text-green-600">

            ✅ No Active Alerts

          </h2>

          <p className="text-gray-500 mt-2">

            Your network is operating normally.

          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {alerts.map((alert, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 border-l-8 border-red-500"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-xl font-bold">

                    {alert.device}

                  </h2>

                  <p className="text-gray-500">

                    {alert.message}

                  </p>

                </div>

                <div className="text-right">

                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${
                      alert.severity === "Critical"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >

                    {alert.severity}

                  </span>

                  <p className="mt-3 text-2xl font-bold">

                    {alert.value}

                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}