import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import api from "../../services/api";

export default function NetworkChart() {
  const [chartData, setChartData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");

  async function loadChartData() {
    try {
      const response = await api.get("/monitoring/");

      const devices = response.data;

      if (devices.length === 0) return;

      const averageCpu =
        devices.reduce(
          (sum, device) => sum + device.cpu_usage,
          0
        ) / devices.length;

      const now = new Date();

      const timeLabel = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setChartData((previous) => {
        const updated = [
          ...previous,
          {
            time: timeLabel,
            cpu: Number(averageCpu.toFixed(1)),
          },
        ];

        return updated.slice(-10);
      });

      setLastUpdated(timeLabel);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadChartData();

    const interval = setInterval(loadChartData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-xl font-bold">
            Live CPU Usage Trend
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Average CPU utilization across all devices
          </p>

        </div>

        <div className="text-right">

          <div className="flex items-center justify-end gap-2">

            <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>

            <span className="text-green-600 font-semibold">
              LIVE
            </span>

          </div>

          <p className="text-xs text-gray-500 mt-1">
            Last Updated: {lastUpdated || "--"}
          </p>

        </div>

      </div>

      <ResponsiveContainer width="100%" height={350}>

        <LineChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis domain={[0, 100]} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="cpu"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}