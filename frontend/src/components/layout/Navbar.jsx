import { Bell, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-white shadow flex justify-between items-center px-8">

      <div>

        <h1 className="text-2xl font-bold">
          AI Network Automation
        </h1>

        <p className="text-gray-500 text-sm">
          Real-time Network Monitoring & Automation
        </p>

      </div>

      <div className="flex items-center gap-6">

        <Bell className="cursor-pointer" />

        <div className="flex items-center gap-2">

          <UserCircle />

          <span>Admin</span>

        </div>

      </div>

    </header>
  );
}