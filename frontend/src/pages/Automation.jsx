import { useState } from "react";
import api from "../services/api";
import DeviceSelector from "../components/common/DeviceSelector";
import toast from "react-hot-toast";

export default function Automation() {

  const [deviceId, setDeviceId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function execute(action) {

    if (!deviceId) {

      toast.error("Please select a device.");

      return;

    }

    try {

      setLoading(true);

      const response = await api.post(
        `/automation/${action}/${deviceId}`
      );

      setResult(response.data);

      toast.success(`${response.data.action} completed successfully!`);

    } catch (error) {

      console.error(error);

      toast.error("Automation request failed.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <div>

      <h1 className="text-4xl font-bold mb-2">

        Automation Center

      </h1>

      <p className="text-gray-500 mb-8">

        Execute network automation tasks on managed devices.

      </p>

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <DeviceSelector
          value={deviceId}
          onChange={setDeviceId}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

          <button
            onClick={() => execute("ping")}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 transition"
          >
            📡 Ping
          </button>

          <button
            onClick={() => execute("restart")}
            className="bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 transition"
          >
            🔄 Restart
          </button>

          <button
            onClick={() => execute("backup")}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 transition"
          >
            💾 Backup
          </button>

          <button
            onClick={() => execute("diagnostics")}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-3 transition"
          >
            🩺 Diagnostics
          </button>

        </div>

      </div>

      {loading && (

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 text-center">

          <p className="text-lg font-medium">

            Executing Automation...

          </p>

        </div>

      )}

      {result && (

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold mb-6">

            Automation Result

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <p className="mb-3">

                <strong>Device ID:</strong> {result.device_id}

              </p>

              <p className="mb-3">

                <strong>Action:</strong> {result.action}

              </p>

              <p>

                <strong>Status:</strong>

                <span className="ml-2 text-green-600 font-semibold">

                  {result.status}

                </span>

              </p>

            </div>

            <div>

              <p className="mb-3">

                <strong>Execution Time:</strong>

                {" "}
                {result.execution_time}s

              </p>

              <p className="mb-3">

                <strong>Timestamp:</strong>

                {" "}
                {result.timestamp}

              </p>

              <p>

                <strong>Message:</strong>

                {" "}
                {result.message}

              </p>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}