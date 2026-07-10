export default function StatCard({
  title,
  value,
  icon,
  color,
}) {

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300 border border-gray-100">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm font-medium">

            {title}

          </p>

          <h2 className={`text-4xl font-bold mt-3 ${color}`}>

            {value}

          </h2>

        </div>

        <div className={`${color}`}>

          {icon}

        </div>

      </div>

    </div>

  );

}