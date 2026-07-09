import {
  LayoutDashboard,
  Server,
  Activity,
  BrainCircuit,
  Settings,
  FileText,
  PlusCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menu = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Devices", icon: Server, path: "/devices" },
  { title: "Monitoring", icon: Activity, path: "/monitoring" },
  { title: "Prediction", icon: BrainCircuit, path: "/prediction" },
  { title: "Automation", icon: Settings, path: "/automation" },
  { title: "Reports", icon: FileText, path: "/reports" },
  {title: "Add Device", icon: PlusCircle, path: "/add-device"},
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white h-screen shadow-xl">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-2xl font-bold">
          NetVision AI
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Network Operations Center
        </p>

      </div>

      <nav className="mt-5">

        {menu.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-4 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />

              {item.title}

            </NavLink>

          );
        })}

      </nav>

    </aside>
  );
}