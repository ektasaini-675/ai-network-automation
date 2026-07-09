export default function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className={`text-3xl font-bold mt-3 ${color}`}>
            {value}
          </h2>
        </div>

        <div className="text-blue-600">
          {icon}
        </div>

      </div>

    </div>
  );
}