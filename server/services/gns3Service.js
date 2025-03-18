const axios = require("axios");

const GNS3_API_URL = "http://localhost:3080/v2"; // Replace with your GNS3 server URL

// Function to fetch devices from GNS3
const fetchDevicesFromGNS3 = async (projectId) => {
    try {
        const response = await axios.get(`${GNS3_API_URL}/projects/${projectId}/nodes`);
        return response.data;
    } catch (error) {
        console.error("Error fetching devices from GNS3:", error);
        throw error;
    }
};

// Function to fetch device details using the 'show ip' command
const getDeviceDetailsFromGNS3 = async (projectId, nodeId) => {
    try {
        const response = await axios.post(`${GNS3_API_URL}/servers/1/projects/${projectId}/nodes/${nodeId}/console`, {
            command: "show ip", // Command to retrieve device information
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching details from GNS3:", error);
        throw error;
    }
};

module.exports = {
    fetchDevicesFromGNS3,
    getDeviceDetailsFromGNS3, 
};
