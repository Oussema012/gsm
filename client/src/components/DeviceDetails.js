import React from "react";

function DeviceDetails({ device }) {
  if (!device) {
    return <div>No device selected.</div>;
  }

  // Function to render properties in a structured way
  const renderProperties = (properties) => {
    return Object.entries(properties).map(([key, value]) => (
      <div key={key} className="property-item">
        <strong>{key}:</strong> {value === null ? "N/A" : value.toString()}
      </div>
    ));
  };

  return (
    <div className="device-details">
      <h2>Device Details</h2>
      <p><strong>Name:</strong> {device.name}</p>
      <p><strong>Node ID:</strong> {device.node_id}</p>
      <p><strong>Type:</strong> {device.node_type}</p>
      <p><strong>Status:</strong> {device.status}</p>

      <h3>Ports</h3>
      <ul>
        {device.ports.map((port, index) => (
          <li key={index}>
            <strong>{port.name}</strong> ({port.short_name})
          </li>
        ))}
      </ul>

      <h3>Properties</h3>
      <div className="properties-container">
        {renderProperties(device.properties)}
      </div>
    </div>
  );
}

export default DeviceDetails;