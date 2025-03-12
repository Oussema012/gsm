import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [devices, setDevices] = useState([]);
    const [name, setName] = useState('');
    const [ip, setIp] = useState('');
    const [status, setStatus] = useState('');

    // Fetch devices on component mount
    useEffect(() => {
        fetchDevices();
    }, []);

    // Fetch all devices from the backend
    const fetchDevices = async () => {
        try {
            const response = await axios.get('http://localhost:8000/devices');
            const devicesArray = response.data.devices || [];
            setDevices(devicesArray);
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };

    // Add a new device
    const addDevice = async () => {
        try {
            const deviceStatus = status || 'Unknown'; // Default to 'Unknown' if status is empty
            const response = await axios.post('http://localhost:8000/devices', {
                name,
                ip,
                DeviceStatus: deviceStatus,
            });

            // Update the devices state with the new device
            setDevices((prevDevices) => [...prevDevices, response.data]);

            // Clear the input fields
            setName('');
            setIp('');
            setStatus('');
        } catch (error) {
            console.error('Error adding device:', error);
        }
    };

    // Sync devices from GNS3
    const syncDevices = async () => {
        try {
            const projectId = "2855984f-e7c5-4ff1-8b81-6b0b33a98b76"; // Project ID for souma
            const response = await axios.post('http://localhost:8000/api/gns3/sync-devices', {
                projectId,
            });
            alert(response.data.message);
            fetchDevices(); // Refresh the devices list
        } catch (error) {
            console.error('Error syncing devices:', error);
            alert('Failed to sync devices. Please try again.');
        }
    };

    // Function to determine the button color based on status
    const getStatusButton = (status) => {
        if (!status) {
            return <button style={{ backgroundColor: 'gray', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px' }}>Unknown</button>;
        }

        switch (status.toLowerCase()) {
            case 'active':
                return <button style={{ backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px' }}>Active</button>;
            case 'pending':
                return <button style={{ backgroundColor: 'yellow', color: 'black', border: 'none', borderRadius: '4px', padding: '5px 10px' }}>Pending</button>;
            case 'down':
                return <button style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px' }}>Down</button>;
            default:
                return <button style={{ backgroundColor: 'gray', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px' }}>Unknown</button>;
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Network Dashboard</h1>

            {/* Form to add a new device */}
            <div style={{ marginBottom: '20px' }}>
                <h2>Add New Device</h2>
                <input
                    type="text"
                    placeholder="Device Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="text"
                    placeholder="IP Address"
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px' }}
                >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Down">Down</option>
                </select>
                <button
                    onClick={addDevice}
                    style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Add Device
                </button>
            </div>

            {/* Button to sync devices from GNS3 */}
            <div style={{ marginBottom: '20px' }}>
                <h2>Sync Devices from GNS3</h2>
                <button
                    onClick={syncDevices}
                    style={{ padding: '5px 10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Sync Devices
                </button>
            </div>

            {/* Table to display all devices */}
            <div>
                <h2>Devices List</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>IP Address</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map((device) => (
                            <tr key={device._id} style={{ backgroundColor: '#f9f9f9' }}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{device.name}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{device.ip}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{getStatusButton(device.DeviceStatus)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;