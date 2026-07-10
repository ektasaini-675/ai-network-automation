import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";

export default function Reports() {

  const [stats, setStats] = useState(null);

  useEffect(() => {

    async function loadStats() {

      try {

        const data = await getDashboardStats();

        setStats(data);

      } catch (error) {

        console.error(error);

      }

    }

    loadStats();

  }, []);

  if (!stats) {

    return (

      <div className="text-center mt-20">

        Loading Reports...

      </div>

    );

  }

  return (

    <div>

      <h1 className="text-4xl font-bold mb-2">

        Network Reports

      </h1>

      <p className="text-gray-500 mb-8">

        AI Generated Network Summary

      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <p className="text-gray-500">

            Total Devices

          </p>

          <h2 className="text-4xl font-bold mt-3 text-blue-600">

            {stats.total_devices}

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <p className="text-gray-500">

            Online Devices

          </p>

          <h2 className="text-4xl font-bold mt-3 text-green-600">

            {stats.online_devices}

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <p className="text-gray-500">

            Offline Devices

          </p>

          <h2 className="text-4xl font-bold mt-3 text-red-600">

            {stats.offline_devices}

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <p className="text-gray-500">

            Average CPU

          </p>

          <h2 className="text-4xl font-bold mt-3 text-orange-500">

            {stats.average_cpu}%

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <p className="text-gray-500">

            Average Memory

          </p>

          <h2 className="text-4xl font-bold mt-3 text-purple-600">

            {stats.average_memory}%

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <p className="text-gray-500">

            Active Alerts

          </p>

          <h2 className="text-4xl font-bold mt-3 text-yellow-500">

            {stats.alerts}

          </h2>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

        <h2 className="text-2xl font-bold mb-6">

          AI Summary

        </h2>

        <ul className="space-y-4 list-disc list-inside text-gray-700">

          <li>

            {stats.online_devices} devices are operating normally.

          </li>

          <li>

            {stats.offline_devices} devices require investigation.

          </li>

          <li>

            Average CPU utilization is {stats.average_cpu}%.

          </li>

          <li>

            Average Memory utilization is {stats.average_memory}%.

          </li>

          <li>

            {stats.alerts} active alerts detected by AI.

          </li>

        </ul>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 flex gap-4">

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
          onClick={() => window.print()}
        >

          Print Report

        </button>

      </div>

    </div>

  );

}