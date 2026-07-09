import { useState, useEffect } from "react";
import { updateDevice } from "../../services/deviceService";

export default function EditDeviceForm({
  device,
  onClose,
  refresh,
}) {

  const [form, setForm] = useState({
    hostname: "",
    ip_address: "",
    device_type: "",
    location: "",
    status: "Online",
  });

  useEffect(() => {
    if (device) {
      setForm(device);
    }
  }, [device]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await updateDevice(device.id, form);

      refresh();

      onClose();

    } catch (error) {
      console.error(error);
      alert("Failed to update device.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <label className="block font-medium mb-2">
        Hostname
      </label>

      <input
        className="w-full border rounded-lg p-3 mb-4"
        name="hostname"
        value={form.hostname}
        onChange={handleChange}
      />

      <label className="block font-medium mb-2">
        IP Address
      </label>

      <input
        className="w-full border rounded-lg p-3 mb-4"
        name="ip_address"
        value={form.ip_address}
        onChange={handleChange}
      />

      <label className="block font-medium mb-2">
        Device Type
      </label>

      <input
        className="w-full border rounded-lg p-3 mb-4"
        name="device_type"
        value={form.device_type}
        onChange={handleChange}
      />

      <label className="block font-medium mb-2">
        Location
      </label>

      <input
        className="w-full border rounded-lg p-3 mb-4"
        name="location"
        value={form.location}
        onChange={handleChange}
      />

      <label className="block font-medium mb-2">
        Status
      </label>

      <select
        className="w-full border rounded-lg p-3 mb-6"
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option>Online</option>
        <option>Offline</option>
      </select>

      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 rounded-lg border"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Save Changes
        </button>

      </div>

    </form>
  );
}