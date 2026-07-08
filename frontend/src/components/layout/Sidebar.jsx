import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Devices", path: "/devices" },
    { name: "Monitoring", path: "/monitoring" },
    { name: "Prediction", path: "/prediction" },
    { name: "Automation", path: "/automation" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white">

      <div className="text-2xl font-bold p-6 border-b border-slate-700">
        AI NOC
      </div>

      <nav className="mt-6">

        {menu.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-6 py-3 hover:bg-slate-700 ${
                isActive ? "bg-slate-700" : ""
              }`
            }
          >
            {item.name}
          </NavLink>

        ))}

      </nav>

    </aside>
  );
}