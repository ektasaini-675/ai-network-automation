import { useEffect, useState } from "react";

import StatCard from "../components/cards/StatCard";
import NetworkChart from "../components/charts/NetworkChart";
import DeviceTable from "../components/tables/DeviceTable";

import useDevices from "../hooks/useDevices";
import { getDashboardStats } from "../services/dashboardService";

import {
  Router,
  ShieldCheck,
  TriangleAlert,
  Cpu,
  MemoryStick,
  Bell,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  const { devices, loading, refresh } = useDevices();

  const [stats, setStats] = useState(null);

  async function loadDashboard() {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-xl font-semibold text-gray-500">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "Devices",
      value: stats.total_devices,
      icon: <Router size={34} />,
      color: "text-blue-600",
    },
    {
      title: "Online",
      value: stats.online_devices,
      icon: <ShieldCheck size={34} />,
      color: "text-green-600",
    },
    {
      title: "Offline",
      value: stats.offline_devices,
      icon: <TriangleAlert size={34} />,
      color: "text-red-600",
    },
    {
      title: "Avg CPU",
      value: `${stats.average_cpu}%`,
      icon: <Cpu size={34} />,
      color: "text-orange-500",
    },
    {
      title: "Avg Memory",
      value: `${stats.average_memory}%`,
      icon: <MemoryStick size={34} />,
      color: "text-purple-600",
    },
    {
      title: "Alerts",
      value: stats.alerts,
      icon: <Bell size={34} />,
      color: "text-yellow-500",
    },
  ];

  const healthScore = Math.max(
    0,
    Math.round(
      100 -
        (stats.average_cpu * 0.3 +
          stats.average_memory * 0.2 +
          stats.alerts * 8)
    )
  );

  return (
    <div className="space-y-8">

      {/* Hero Section */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white p-8 shadow-xl">

        <div className="flex flex-col lg:flex-row justify-between gap-8">

          <div>

            <h1 className="text-4xl font-bold mb-3">
              Network Operations Center
            </h1>

            <p className="text-blue-100 text-lg">
              Monitor • Predict • Automate
            </p>

            <p className="mt-6 text-blue-100 max-w-2xl">
              Centralized monitoring of enterprise network devices with
              AI-powered analytics, automation workflows and real-time
              operational insights.
            </p>

          </div>

          <div className="bg-white/15 backdrop-blur rounded-2xl p-6 min-w-[260px]">

            <div className="flex items-center gap-3 mb-4">

              <Activity size={28} />

              <h2 className="text-xl font-semibold">
                Network Health
              </h2>

            </div>

            <h1 className="text-6xl font-bold">
              {healthScore}%
            </h1>

            <div className="w-full h-3 rounded-full bg-white/20 mt-5">

              <div
                className="h-3 rounded-full bg-green-400"
                style={{ width: `${healthScore}%` }}
              />

            </div>

            <p className="mt-4 text-sm text-blue-100">
              Overall network performance based on CPU,
              memory utilization and active alerts.
            </p>

          </div>

        </div>

      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {cards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}

      </div>

      {/* Quick Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-xl font-bold mb-5">
            Recent Alerts
          </h2>

          {stats.alerts === 0 ? (
            <p className="text-green-600 font-medium">
              ✅ No active alerts detected.
            </p>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>High CPU Usage</span>
                <span className="text-red-600 font-semibold">
                  Active
                </span>
              </div>

              <div className="flex justify-between">
                <span>Packet Loss</span>
                <span className="text-orange-500 font-semibold">
                  Monitoring
                </span>
              </div>
            </div>
          )}

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-xl font-bold mb-5">
            Network Summary
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Total Devices</span>

              <strong>{stats.total_devices}</strong>

            </div>

            <div className="flex justify-between">

              <span>Availability</span>

              <strong className="text-green-600">
                {stats.total_devices === 0
                  ? "0%"
                  : `${Math.round(
                      (stats.online_devices / stats.total_devices) * 100
                    )}%`}
              </strong>

            </div>

            <div className="flex justify-between">

              <span>Average CPU</span>

              <strong>{stats.average_cpu}%</strong>

            </div>

            <div className="flex justify-between">

              <span>Average Memory</span>

              <strong>{stats.average_memory}%</strong>

            </div>

          </div>

        </div>

      </div>

      <NetworkChart />

      <DeviceTable
        devices={devices}
        loading={loading}
        refresh={refresh}
      />

    </div>
  );
}