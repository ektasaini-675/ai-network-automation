import { useEffect, useState } from "react";
import { getDevices } from "../services/deviceService";

export default function useDevices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadDevices() {
    try {
      const data = await getDevices();
      setDevices(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDevices();
  }, []);

  return {
    devices,
    loading,
    refresh: loadDevices,
  };
}