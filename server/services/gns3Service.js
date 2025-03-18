const axios = require("axios");

const GNS3_API_URL = "http://localhost:3080/v2"; // Replace with your GNS3 server URL

const fetchDevicesFromGNS3 = async (projectId) => {
    try {
        const response = await axios.get(`${GNS3_API_URL}/projects/${projectId}/nodes`);
        return response.data;
    } catch (error) {
        console.error("Error fetching devices from GNS3:", error);
        throw error;
    }
};

module.exports = {
    fetchDevicesFromGNS3,
};