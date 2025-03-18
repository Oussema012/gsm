import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DeviceDetails from './DeviceDetails';

function DeviceList() {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        try {
            const response = await axios.get('http://localhost:8000/devices');
            setDevices(response.data.devices || []);
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };

    const syncDevices = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/gns3/sync-devices', {
                projectId: "3c506d62-94a2-434f-87da-f6de85b34a86"
            });
            alert(response.data.message);
            fetchDevices();
        } catch (error) {
            console.error('Error syncing devices:', error);
            alert('Failed to sync devices. Please try again.');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Network Dashboard</h1>

            <button onClick={syncDevices} style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Sync Devices from GNS3
            </button>

            <h2>Devices List</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4' }}>
                        <th>Name</th>
                        <th>IP Address</th>
                        <th>Status</th>
                        <th>MAC Address</th>
                        <th>Gateway</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {devices.map((device) => (
                        <tr key={device._id} style={{ textAlign: 'center' }}>
                            <td>{device.name}</td>
                            <td>{device.ip || "N/A"}</td>
                            <td>{device.DeviceStatus}</td>
                            <td>{device.macAddress || "N/A"}</td>
                            <td>{device.gateway || "N/A"}</td>
                            <td>
                                <Link to={`/device/${device._id}`} style={{ color: '#007bff', textDecoration: 'none' }}>View Details</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DeviceList />} />
                <Route path="/device/:deviceId" element={<DeviceDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
