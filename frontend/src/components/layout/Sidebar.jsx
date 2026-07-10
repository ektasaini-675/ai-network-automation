import {
  LayoutDashboard,
  Server,
  Activity,
  BrainCircuit,
  TriangleAlert,
  Settings,
  FileText,
  PlusCircle,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Devices", icon: Server, path: "/devices" },
  { title: "Monitoring", icon: Activity, path: "/monitoring" },
  { title: "AI Insights", icon: BrainCircuit, path: "/prediction" },
  { title: "Alerts", icon: TriangleAlert, path: "/alerts" },
  { title: "Automation", icon: Settings, path: "/automation" },
  { title: "Reports", icon: FileText, path: "/reports" },
  { title: "Add Device", icon: PlusCircle, path: "/add-device" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl">

      <div className="p-8 border-b border-slate-800">

        <h1 className="text-3xl font-bold tracking-wide">
          NetVision AI
        </h1>

        <p className="text-sm text-slate-400 mt-2">
          Enterprise Network Operations Center
        </p>

      </div>

      <nav className="flex-1 mt-6">

        {menu.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `mx-3 mb-2 flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 shadow-lg"
                    : "hover:bg-slate-800"
                }`
              }
            >

              <Icon size={22} />

              <span className="font-medium">
                {item.title}
              </span>

            </NavLink>

          );

        })}

      </nav>

      <div className="border-t border-slate-800 p-6">

        <div className="rounded-xl bg-slate-800 p-4">

          <p className="text-xs text-slate-400">
            System Status
          </p>

          <p className="mt-2 text-green-400 font-semibold">
            ● Operational
          </p>

        </div>

      </div>

    </aside>
  );
}