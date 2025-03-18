import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const DeviceDetails = () => {
    const { deviceId } = useParams();
    const [device, setDevice] = useState(null);
    const [gns3DeviceDetails, setGns3DeviceDetails] = useState(null);

    useEffect(() => {
        // Fetch the device details from your backend (MongoDB or your API)
        axios.get(`http://localhost:8000/device/${deviceId}`)
            .then((response) => {
                setDevice(response.data.device);
            })
            .catch((error) => {
                console.error('Error fetching device details:', error);
            });

        // Fetch GNS3 specific details (show ip command)
        const fetchGns3DeviceDetails = async () => {
            try {
                const projectId = "yourProjectId"; // Replace with your actual projectId
                const nodeId = deviceId; // You can use the deviceId as the nodeId
                const response = await axios.get(`http://localhost:5000/api/gns3/device-details/${projectId}/${nodeId}`);
                setGns3DeviceDetails(response.data.details); // Update state with GNS3 data
            } catch (error) {
                console.error("Error fetching GNS3 device details:", error.response.data);
            }
        };

        if (deviceId) {
            fetchGns3DeviceDetails();
        }
    }, [deviceId, device]);

    if (!device || !gns3DeviceDetails) return <p>Loading...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Device Details</h2>
            <p><strong>Name:</strong> {device.name}</p>
            <p><strong>IP Address:</strong> {device.ip || "N/A"}</p>
            <p><strong>Status:</strong> {device.DeviceStatus}</p>
            <p><strong>MAC Address:</strong> {device.macAddress || "N/A"}</p>
            <p><strong>Gateway:</strong> {device.gateway || "N/A"}</p>
            <p><strong>DNS:</strong> {device.dns || "N/A"}</p>
            <p><strong>LPORT:</strong> {device.lPort || "N/A"}</p>
            <p><strong>RHOST:PORT:</strong> {device.rHostPort || "N/A"}</p>
            <p><strong>MTU:</strong> {device.mtu || "1500"}</p>
            
            {/* Display GNS3 specific details */}
            <h3>GNS3 Device Details</h3>
            {gns3DeviceDetails && (
                <>
                    <p><strong>Show IP Output:</strong></p>
                    <pre>{gns3DeviceDetails}</pre>
                </>
            )}

            <Link to="/">Back to Devices</Link>
        </div>
    );
};

export default DeviceDetails;
