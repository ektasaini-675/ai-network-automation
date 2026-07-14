import { useEffect, useRef, useState } from "react";
import { Bell, UserCircle, ChevronDown } from "lucide-react";
import api from "../../services/api";

export default function Navbar() {
  const [alerts, setAlerts] = useState([]);
  const [showAlerts, setShowAlerts] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const alertRef = useRef(null);
  const profileRef = useRef(null);

  async function loadAlerts() {
    try {
      const response = await api.get("/alerts/");
      setAlerts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadAlerts();

    const interval = setInterval(loadAlerts, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        alertRef.current &&
        !alertRef.current.contains(event.target)
      ) {
        setShowAlerts(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <header className="h-16 bg-white shadow flex justify-between items-center px-8">

      <div>

        <h1 className="text-2xl font-bold">
          NetVision AI
        </h1>

        <p className="text-gray-500 text-sm">
          AI Powered Network Operations Center
        </p>

      </div>

      <div className="flex items-center gap-8">

        {/* Notifications */}

        <div
          className="relative"
          ref={alertRef}
        >

          <button
            onClick={() => setShowAlerts(!showAlerts)}
            className="relative"
          >

            <Bell className="cursor-pointer hover:text-blue-600 transition" />

            {alerts.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
                {alerts.length}
              </span>
            )}

          </button>

          {showAlerts && (

            <div className="absolute right-0 mt-3 w-96 bg-white shadow-2xl rounded-xl border z-50">

              <div className="p-4 border-b">

                <h2 className="font-bold">
                  Notifications
                </h2>

              </div>

              <div className="max-h-80 overflow-y-auto">

                {alerts.length === 0 ? (

                  <p className="p-4 text-gray-500">
                    No active alerts.
                  </p>

                ) : (

                  alerts.slice(0, 5).map((alert, index) => (

                    <div
                      key={index}
                      className="p-4 border-b hover:bg-gray-50"
                    >

                      <div className="flex justify-between">

                        <span className="font-semibold">
                          {alert.device}
                        </span>

                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            alert.severity === "Critical"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {alert.severity}
                        </span>

                      </div>

                      <p className="text-sm text-gray-600 mt-1">
                        {alert.message}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {alert.value}
                      </p>

                    </div>

                  ))

                )}

              </div>

            </div>

          )}

        </div>

        {/* Profile */}

        <div
          className="relative"
          ref={profileRef}
        >

          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >

            <UserCircle />

            <span>Admin</span>

            <ChevronDown size={18} />

          </button>

          {showProfile && (

            <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-xl border z-50">

              <div className="p-4 border-b">

                <h3 className="font-bold">
                  Administrator
                </h3>

                <p className="text-sm text-green-600">
                  ● System Operational
                </p>

              </div>

              <div className="p-2">

                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">
                  About NetVision AI
                </button>

                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">
                  Version 1.0.0
                </button>

                <button
                  disabled
                  className="w-full text-left px-3 py-2 rounded-lg text-gray-400 cursor-not-allowed"
                >
                  Logout (Coming Soon)
                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}