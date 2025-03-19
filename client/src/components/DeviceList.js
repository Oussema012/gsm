import React from "react";

function DeviceList({ devices, onDeviceClick }) {
  // Ensure devices is an array before mapping
  if (!devices || !Array.isArray(devices)) {
    return <div>No devices found.</div>;
  }

  return (
    <div className="device-list">
      <h2>Devices</h2>
      <ul>
        {devices.map((device) => (
          <li
            key={device._id}
            onClick={() => onDeviceClick(device.projectId, device.nodeId)} // Pass projectId and nodeId
          >
            <strong>{device.name}</strong> - {device.ip}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeviceList;