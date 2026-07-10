import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { deleteDevice } from "../../services/deviceService";

import Modal from "../common/Modal";
import EditDeviceForm from "../forms/EditDeviceForm";

export default function DeviceTable({
  devices,
  loading,
  refresh,
}) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  async function handleDelete(id) {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this device?"
    );

    if (!confirmDelete) return;

    try {

      await deleteDevice(id);

      refresh();

    } catch (error) {

      console.error(error);

      alert("Failed to delete device.");

    }

  }

  function handleEdit(device) {

    setSelectedDevice(device);

    setIsModalOpen(true);

  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mt-8">
        Loading Devices...
      </div>
    );
  }

  return (
    <>

      <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Device Status
        </h2>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>

              <tr className="border-b bg-gray-100">

                <th className="text-left py-4 px-3">Hostname</th>

                <th className="text-left py-4 px-3">IP Address</th>

                <th className="text-left py-4 px-3">Type</th>

                <th className="text-left py-4 px-3">Location</th>

                <th className="text-left py-4 px-3">Status</th>

                <th className="text-center py-4 px-3">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {devices.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-12 text-gray-500"
                  >
                    No devices found.
                  </td>

                </tr>

              ) : (

                devices.map((device) => (

                  <tr
                    key={device.id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="px-3 py-4 font-medium">
                      {device.hostname}
                    </td>

                    <td className="px-3 py-4">
                      {device.ip_address}
                    </td>

                    <td className="px-3 py-4">
                      {device.device_type}
                    </td>

                    <td className="px-3 py-4">
                      {device.location}
                    </td>

                    <td className="px-3 py-4">

                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                          device.status === "Online"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >

                        <span>

                          {device.status === "Online"
                            ? "🟢"
                            : "🔴"}

                        </span>

                        {device.status}

                      </span>

                    </td>

                    <td className="px-3 py-4">

                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() => handleEdit(device)}
                          className="p-2 rounded-lg hover:bg-blue-100 transition"
                          title="Edit Device"
                        >
                          <Pencil
                            size={18}
                            className="text-blue-600"
                          />
                        </button>

                        <button
                          onClick={() => handleDelete(device.id)}
                          className="p-2 rounded-lg hover:bg-red-100 transition"
                          title="Delete Device"
                        >
                          <Trash2
                            size={18}
                            className="text-red-600"
                          />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Device"
      >

        <EditDeviceForm
          device={selectedDevice}
          refresh={refresh}
          onClose={() => setIsModalOpen(false)}
        />

      </Modal>

    </>
  );

}