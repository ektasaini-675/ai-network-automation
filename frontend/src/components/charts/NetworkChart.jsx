import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { time: "10:00", cpu: 45 },
  { time: "10:05", cpu: 55 },
  { time: "10:10", cpu: 60 },
  { time: "10:15", cpu: 52 },
  { time: "10:20", cpu: 70 },
  { time: "10:25", cpu: 65 },
];

export default function NetworkChart() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4">
        Network Health
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="cpu"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}