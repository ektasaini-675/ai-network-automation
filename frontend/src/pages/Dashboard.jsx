import StatCard from "../components/cards/StatCard";
import NetworkChart from "../components/charts/NetworkChart";
import DeviceTable from "../components/tables/DeviceTable";
import useDevices from "../hooks/useDevices";

import {
  Router,
  ShieldCheck,
  TriangleAlert,
  Cpu,
} from "lucide-react";

export default function Dashboard() {

  // Fetch devices from backend
  const { devices, loading, refresh } = useDevices();

  // Dashboard statistics
  const stats = [
    {
      title: "Active Devices",
      value: devices.length,
      icon: <Router size={40} />,
      color: "text-blue-600",
    },
    {
      title: "Healthy Devices",
      value: devices.filter(
        (d) => d.status === "Online"
      ).length,
      icon: <ShieldCheck size={40} />,
      color: "text-green-600",
    },
    {
      title: "Offline Devices",
      value: devices.filter(
        (d) => d.status === "Offline"
      ).length,
      icon: <TriangleAlert size={40} />,
      color: "text-red-600",
    },
    {
      title: "CPU Usage",
      value: "67%",
      icon: <Cpu size={40} />,
      color: "text-orange-500",
    },
  ];

  return (
    <div>

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p className="text-gray-500 mb-8">
        Welcome to NetVision AI
      </p>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((card) => (
          <StatCard
            key={card.title}
            {...card}
          />
        ))}

      </div>

      {/* Chart */}
      <NetworkChart />

      {/* Device Table */}
      <DeviceTable
        devices={devices}
        loading={loading}
        refresh={refresh}
      />

    </div>
  );
}