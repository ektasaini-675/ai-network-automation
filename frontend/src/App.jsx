import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import Monitoring from "./pages/Monitoring";
import Prediction from "./pages/Prediction";
import Automation from "./pages/Automation";
import Reports from "./pages/Reports";
import AddDevice from "./pages/AddDevice";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<Dashboard />} />

          <Route path="devices" element={<Devices />} />

          <Route path="monitoring" element={<Monitoring />} />

          <Route path="prediction" element={<Prediction />} />

          <Route path="automation" element={<Automation />} />

          <Route path="reports" element={<Reports />} />

          <Route path="add-device" element={<AddDevice />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;