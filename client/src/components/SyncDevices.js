import React from "react";

function SyncDevices({ onSync }) {
  const handleSync = () => {
    onSync();
  };

  return (
    <div className="sync-devices">
      <button onClick={handleSync}>Sync Devices</button>
    </div>
  );
}

export default SyncDevices;