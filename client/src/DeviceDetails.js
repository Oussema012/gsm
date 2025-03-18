import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const DeviceDetails = () => {
    const { deviceId } = useParams();
    const [device, setDevice] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/device/${deviceId}`)
            .then((response) => {
                setDevice(response.data.device);
            })
            .catch((error) => {
                console.error('Error fetching device details:', error);
            });
    }, [deviceId]);

    if (!device) return <p>Loading...</p>;

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
            <Link to="/">Back to Devices</Link>
        </div>
    );
};



export default DeviceDetails;
