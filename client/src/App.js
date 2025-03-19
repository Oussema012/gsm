import React, { useState, useEffect } from "react";
import SyncDevices from "./components/SyncDevices";
import DeviceList from "./components/DeviceList";
import DeviceDetails from "./components/DeviceDetails";
import "./App.css";

function App() {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  // Replace with your GNS3 project ID
  const projectId = "3c506d62-94a2-434f-87da-f6de85b34a86";

  // Fetch devices on component mount
  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/gns3/sync-devices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setDevices(data.devices || []);
    } catch (error) {
      console.error("Error fetching devices:", error);
      setDevices([]);
    }
  };

  const handleDeviceClick = async (projectId, nodeId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/gns3/device-details/${projectId}/${nodeId}`);
      const data = await response.json();
      setSelectedDevice(data.details);
    } catch (error) {
      console.error("Error fetching device details:", error);
    }
  };

  return (
    <div className="App">
      <h1>GNS3 Device Manager</h1>
      <SyncDevices onSync={fetchDevices} />
      <div className="container">
        <DeviceList devices={devices} onDeviceClick={handleDeviceClick} />
        {selectedDevice && <DeviceDetails device={selectedDevice} />}
      </div>
    </div>
  );
}

export default App;