import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex bg-slate-100">

      <Sidebar />

      <div className="flex-1 flex flex-col h-screen">

        <Navbar />

        <main className="p-8 overflow-y-auto flex-1">

          <Outlet />

        </main>

      </div>

    </div>
  );
}