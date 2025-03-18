import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const DeviceDetails = () => {
    const { id } = useParams();
    const [device, setDevice] = useState(null);
    const [gns3DeviceDetails, setGns3DeviceDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Device ID from URL:", id); // Log the ID
        
        if (!id) {
            console.error("Device ID is missing or undefined!");
            return;
        }
    
        const fetchDeviceDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/device/${id}`);
                setDevice(response.data.device);
                
                const gns3Response = await axios.get(`http://localhost:8000/device/3c506d62-94a2-434f-87da-f6de85b34a86/67d9e6535fd1f6102db6abe9`);
                setGns3DeviceDetails(gns3Response.data.details);
            } catch (error) {
                console.error('Error fetching device details:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchDeviceDetails();
    }, [id]);
    

    if (loading) return <p>Loading device details...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Device Details</h2>
            <p><strong>Name:</strong> {device?.name || "N/A"}</p>
            <p><strong>IP Address:</strong> {device?.ip || "N/A"}</p>
            <p><strong>Status:</strong> {device?.DeviceStatus || "N/A"}</p>
            <p><strong>MAC Address:</strong> {device?.macAddress || "N/A"}</p>
            <p><strong>Gateway:</strong> {device?.gateway || "N/A"}</p>
            <p><strong>DNS:</strong> {device?.dns || "N/A"}</p>
            <p><strong>LPORT:</strong> {device?.lPort || "N/A"}</p>
            <p><strong>RHOST:PORT:</strong> {device?.rHostPort || "N/A"}</p>
            <p><strong>MTU:</strong> {device?.mtu || "1500"}</p>

            {/* Display GNS3 specific details */}
            <h3>GNS3 Device Details</h3>
            {gns3DeviceDetails ? (
                <>
                    <p><strong>Show IP Output:</strong></p>
                    <pre>{gns3DeviceDetails}</pre>
                </>
            ) : (
                <p>No GNS3 details available.</p>
            )}

            <Link to="/" style={{ color: '#007bff' }}>Back to Devices</Link>
        </div>
    );
};

export default DeviceDetails;
