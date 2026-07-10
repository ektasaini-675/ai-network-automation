import DeviceTable from "../components/tables/DeviceTable";
import useDevices from "../hooks/useDevices";
import { Link } from "react-router-dom";
import { useState } from "react";

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
    <div>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Devices
        </h1>

        <Link
          to="/add-device"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Device
        </Link>

      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

        <input
          type="text"
          placeholder="🔍 Search devices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option>All</option>
          <option>Online</option>
          <option>Offline</option>
        </select>

      </div>

      <DeviceTable
        devices={filteredDevices}
        loading={loading}
        refresh={refresh}
      />

    </div>
  );
}