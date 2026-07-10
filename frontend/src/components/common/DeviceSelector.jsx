import { useEffect, useState } from "react";
import { getDevices } from "../../services/deviceService";

export default function DeviceSelector({
  value,
  onChange,
}) {

  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadDevices() {

      try {

        const data = await getDevices();

        setDevices(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    loadDevices();

  }, []);

  return (

    <div>

      <label className="block text-sm font-semibold mb-2">

        Select Device

      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >

        <option value="">

          {loading ? "Loading..." : "Choose a Device"}

        </option>

        {devices.map((device) => (

          <option
            key={device.id}
            value={device.id}
          >

            {device.hostname} • {device.ip_address}

          </option>

        ))}

      </select>

    </div>

  );

}