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
      <div className="text-center mt-20">
        Loading Dashboard...
      </div>
    );

  }

  const cards = [

    {
      title: "Devices",
      value: stats.total_devices,
      icon: <Router size={36} />,
      color: "text-blue-600",
    },

    {
      title: "Online",
      value: stats.online_devices,
      icon: <ShieldCheck size={36} />,
      color: "text-green-600",
    },

    {
      title: "Offline",
      value: stats.offline_devices,
      icon: <TriangleAlert size={36} />,
      color: "text-red-600",
    },

    {
      title: "Avg CPU",
      value: `${stats.average_cpu}%`,
      icon: <Cpu size={36} />,
      color: "text-orange-500",
    },

    {
      title: "Avg Memory",
      value: `${stats.average_memory}%`,
      icon: <MemoryStick size={36} />,
      color: "text-purple-600",
    },

    {
      title: "Alerts",
      value: stats.alerts,
      icon: <Bell size={36} />,
      color: "text-yellow-500",
    },

  ];

  return (

    <div>

      <h1 className="text-4xl font-bold mb-2">
        Network Operations Center
      </h1>

      <p className="text-gray-500 mb-8">
        AI Network Automation Dashboard
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {cards.map((card) => (

          <StatCard
            key={card.title}
            {...card}
          />

        ))}

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