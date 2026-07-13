import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Server } from "lucide-react";

import DeviceTable from "../components/tables/DeviceTable";
import useDevices from "../hooks/useDevices";

export default function Devices() {
  const { devices, loading, refresh } = useDevices();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.hostname.toLowerCase().includes(search.toLowerCase()) ||
      device.ip_address.toLowerCase().includes(search.toLowerCase()) ||
      device.device_type.toLowerCase().includes(search.toLowerCase()) ||
      device.location.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      device.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-700 text-white rounded-3xl p-8 shadow-xl">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

          <div>

            <div className="flex items-center gap-3">

              <Server size={34} />

              <h1 className="text-4xl font-bold">
                Device Inventory
              </h1>

            </div>

            <p className="mt-3 text-blue-100 max-w-2xl">
              Manage enterprise routers, switches, firewalls and network
              appliances from one centralized dashboard.
            </p>

          </div>

          <Link
            to="/add-device"
            className="flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
          >
            <Plus size={20} />
            Add Device
          </Link>

        </div>

      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6">

        <div className="flex flex-col lg:flex-row gap-4 justify-between">

          <div className="relative w-full lg:w-96">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search hostname, IP, type or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-xl px-5 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option>All</option>
            <option>Online</option>
            <option>Offline</option>
          </select>

        </div>

        <div className="flex flex-wrap gap-6 mt-6 text-sm">

          <span className="font-medium">
            Total Devices:
            <span className="ml-2 text-blue-600">
              {devices.length}
            </span>
          </span>

          <span className="font-medium">
            Showing:
            <span className="ml-2 text-green-600">
              {filteredDevices.length}
            </span>
          </span>

          <span className="font-medium">
            Online:
            <span className="ml-2 text-green-600">
              {devices.filter((d) => d.status === "Online").length}
            </span>
          </span>

          <span className="font-medium">
            Offline:
            <span className="ml-2 text-red-600">
              {devices.filter((d) => d.status === "Offline").length}
            </span>
          </span>

        </div>

      </div>

      <DeviceTable
        devices={filteredDevices}
        loading={loading}
        refresh={refresh}
      />

    </div>
  );
}