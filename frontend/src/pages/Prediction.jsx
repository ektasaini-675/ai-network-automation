import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import api from "../services/api";

import DeviceSelector from "../components/common/DeviceSelector";
import AIAnalysis from "../components/ai/AIAnalysis";

export default function Prediction() {
  const { state } = useLocation();

  const [device, setDevice] = useState(
    state?.device || null
  );

  const [devices, setDevices] = useState([]);

  async function loadDevices() {
    try {
      const response = await api.get("/monitoring/");

      setDevices(response.data);

    } catch (error) {

      console.error(error);

    }
  }

  useEffect(() => {

    loadDevices();

  }, []);

  function handleSelect(deviceId) {

    const selected = devices.find(
      (d) => d.id === Number(deviceId)
    );

    setDevice(selected);

  }

  return (

    <div>

      <h1 className="text-4xl font-bold mb-2">

        AI Network Intelligence

      </h1>

      <p className="text-gray-500 mb-8">

        Machine Learning based device health prediction and diagnostics.

      </p>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <DeviceSelector

          value={device?.id || ""}

          onChange={handleSelect}

        />

      </div>

      <AIAnalysis

        device={device}

      />

    </div>

  );

}