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

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  // Delete Device
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

      alert("Failed to delete device");

    }

  }

  // Open Edit Modal
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
      <div className="bg-white rounded-xl shadow-md p-6 mt-8">

        <h2 className="text-xl font-semibold mb-6">
          Device Status
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">Hostname</th>
              <th className="text-left py-3">IP Address</th>
              <th className="text-left py-3">Type</th>
              <th className="text-left py-3">Location</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Actions</th>

            </tr>

          </thead>

          <tbody>

            {devices.map((device) => (

              <tr
                key={device.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-3">
                  {device.hostname}
                </td>

                <td>{device.ip_address}</td>

                <td>{device.device_type}</td>

                <td>{device.location}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      device.status === "Online"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {device.status}
                  </span>

                </td>

                <td className="flex gap-3 py-3">

                  <button
                    onClick={() => handleEdit(device)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit Device"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(device.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Device"
                  >
                    <Trash2 size={18} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Edit Modal */}
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