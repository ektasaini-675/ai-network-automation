import {
  Cpu,
  MemoryStick,
  Wifi,
  Activity,
  Router,
  MapPin,
  Network,
} from "lucide-react";

export default function DeviceTelemetry({ device }) {
  if (!device) return null;

  const metrics = [
    {
      label: "CPU Usage",
      value: `${device.cpu_usage}%`,
      icon: <Cpu className="text-blue-600" size={22} />,
      bg: "bg-blue-50",
    },
    {
      label: "Memory Usage",
      value: `${device.memory_usage}%`,
      icon: <MemoryStick className="text-green-600" size={22} />,
      bg: "bg-green-50",
    },
    {
      label: "Latency",
      value: `${device.latency} ms`,
      icon: <Activity className="text-orange-500" size={22} />,
      bg: "bg-orange-50",
    },
    {
      label: "Packet Loss",
      value: `${device.packet_loss}%`,
      icon: <Wifi className="text-red-600" size={22} />,
      bg: "bg-red-50",
    },
    {
      label: "Bandwidth",
      value: `${device.bandwidth} Mbps`,
      icon: <Network className="text-purple-600" size={22} />,
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Current Device Telemetry
      </h2>

      <div className="grid md:grid-cols-2 gap-4 mb-8">

        <div className="flex items-center gap-3">
          <Router className="text-indigo-600" />
          <div>
            <p className="text-sm text-gray-500">Hostname</p>
            <p className="font-semibold">{device.hostname}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Network className="text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">IP Address</p>
            <p className="font-semibold">{device.ip_address}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Cpu className="text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Device Type</p>
            <p className="font-semibold">{device.device_type}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="text-red-600" />
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-semibold">{device.location}</p>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {metrics.map((metric) => (

          <div
            key={metric.label}
            className={`${metric.bg} rounded-xl p-5`}
          >

            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500 text-sm">
                  {metric.label}
                </p>

                <h3 className="text-2xl font-bold mt-2">
                  {metric.value}
                </h3>
              </div>

              {metric.icon}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}