const axios = require("axios");

// Function to fetch devices from GNS3
const fetchDevicesFromGNS3 = async (projectId) => {
    try {
        const response = await axios.get(`http://gns3-server:3080/v2/projects/${projectId}/nodes`);
        return response.data.nodes; // Assuming GNS3 API returns an array of nodes
    } catch (error) {
        console.error("Error fetching devices from GNS3:", error);
        throw new Error("Error fetching devices");
    }
};

// Function to get details of a device using 'show ip' command
const getDeviceDetailsFromGNS3 = async (projectId, nodeId) => {
    try {
        const response = await axios.get(`http://gns3-server:3080/v2/projects/${projectId}/nodes/${nodeId}/console`);
        return response.data; // Assuming GNS3 API provides the required details
    } catch (error) {
        console.error("Error fetching GNS3 device details:", error);
        throw new Error("Error fetching device details from GNS3");
    }
};

module.exports = {
    fetchDevicesFromGNS3,
    getDeviceDetailsFromGNS3
};
