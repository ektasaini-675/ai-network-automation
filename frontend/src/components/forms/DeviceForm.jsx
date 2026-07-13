import { useState } from "react";
import { createDevice } from "../../services/deviceService";
import toast from "react-hot-toast";

export default function DeviceForm() {

  const [form, setForm] = useState({
    hostname: "",
    ip_address: "",
    device_type: "",
    location: "",
    status: "Online",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createDevice(form);

      toast.success("Device added successfully!");

      setForm({
        hostname: "",
        ip_address: "",
        device_type: "",
        location: "",
        status: "Online",
      });

    } catch (err) {
      console.error(err);
      toast.error("Failed to add device.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-xl font-bold mb-4">Add Device</h2>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Hostname"
        name="hostname"
        value={form.hostname}
        onChange={handleChange}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="IP Address"
        name="ip_address"
        value={form.ip_address}
        onChange={handleChange}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Device Type"
        name="device_type"
        value={form.device_type}
        onChange={handleChange}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Location"
        name="location"
        value={form.location}
        onChange={handleChange}
      />

      <select
        className="border p-2 w-full mb-4"
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option>Online</option>
        <option>Offline</option>
      </select>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Device
      </button>
    </form>
  );
}