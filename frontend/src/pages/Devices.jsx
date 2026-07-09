import DeviceTable from "../components/tables/DeviceTable";
import useDevices from "../hooks/useDevices";
import { Link } from "react-router-dom";

export default function Devices() {

  const { devices, loading, refresh } = useDevices();

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

      <DeviceTable
        devices={devices}
        loading={loading}
        refresh={refresh}
      />

    </div>
  );
}