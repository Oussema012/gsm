// controllers/GNS3Controller.js
const Device = require("../models/Device");
const { fetchDevicesFromGNS3 } = require("../services/gns3Service");

const syncDevicesFromGNS3 = async (req, res) => {
    const { projectId } = req.body;

    if (!projectId) {
        return res.status(400).json({ message: "Project ID is required" });
    }

    try {
        console.log("Fetching devices from GNS3...");
        const gns3Devices = await fetchDevicesFromGNS3(projectId);
        console.log("Devices fetched from GNS3:", gns3Devices);

        console.log("Saving devices to MongoDB...");
        const savedDevices = await Promise.all(
            gns3Devices.map(async (device) => {
                const existingDevice = await Device.findOne({ name: device.name });
                if (existingDevice) {
                    existingDevice.ip = device.properties?.ip_address || "N/A";
                    existingDevice.DeviceStatus = device.status || "Unknown";
                    return await existingDevice.save();
                }
                const newDevice = new Device({
                    name: device.name,
                    ip: device.properties?.ip_address || "N/A",
                    DeviceStatus: device.status || "Unknown",
                });
                return await newDevice.save();
            })
        );
        console.log("Devices saved to MongoDB:", savedDevices);

        res.status(200).json({ message: "Devices synced successfully", devices: savedDevices });
    } catch (error) {
        console.error("Error in syncDevicesFromGNS3:", error);
        res.status(500).json({ message: "Error syncing devices", error: error.message });
    }
};

module.exports = {
    syncDevicesFromGNS3,
};