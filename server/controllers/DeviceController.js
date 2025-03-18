const Device = require("../models/Device");
const { fetchDevicesFromGNS3, getDeviceDetailsFromGNS3 } = require("../services/gns3Service");

module.exports = {
    // Create a new device
    createDevice: async (req, res) => {
        try {
            const { name, ip, DeviceStatus } = req.body;
            const newDevice = new Device({ name, ip, DeviceStatus });
            await newDevice.save();
            res.status(201).json({ message: "Device created successfully", device: newDevice });
        } catch (error) {
            res.status(500).json({ message: "Error creating device", error: error.message });
        }
    },

    // Get all devices
    getAllDevices: async (req, res) => {
        try {
            const devices = await Device.find();
            res.status(200).json({ message: "Devices fetched successfully", devices });
        } catch (error) {
            res.status(500).json({ message: "Error fetching devices", error: error.message });
        }
    },

    // Get a single device by ID
    getDeviceById: async (req, res) => {
        try {
            const device = await Device.findById(req.params.id);
            if (!device) {
                return res.status(404).json({ message: "Device not found" });
            }
            res.status(200).json({ message: "Device fetched successfully", device });
        } catch (error) {
            res.status(500).json({ message: "Error fetching device", error: error.message });
        }
    },

    // Update a device by ID
    updateDevice: async (req, res) => {
        try {
            const { name, ip, DeviceStatus } = req.body;
            const updatedDevice = await Device.findByIdAndUpdate(
                req.params.id,
                { name, ip, DeviceStatus },
                { new: true } // Return the updated document
            );
            if (!updatedDevice) {
                return res.status(404).json({ message: "Device not found" });
            }
            res.status(200).json({ message: "Device updated successfully", device: updatedDevice });
        } catch (error) {
            res.status(500).json({ message: "Error updating device", error: error.message });
        }
    },

    // Delete a device by ID
    deleteDevice: async (req, res) => {
        try {
            const deletedDevice = await Device.findByIdAndDelete(req.params.id);
            if (!deletedDevice) {
                return res.status(404).json({ message: "Device not found" });
            }
            res.status(200).json({ message: "Device deleted successfully", device: deletedDevice });
        } catch (error) {
            res.status(500).json({ message: "Error deleting device", error: error.message });
        }
    },

    // Sync devices from GNS3
    syncDevicesFromGNS3: async (req, res) => {
        const { projectId } = req.body;

        if (!projectId) {
            return res.status(400).json({ message: "Project ID is required" });
        }

        try {
            console.log("Fetching devices from GNS3...");
            const gns3Devices = await fetchDevicesFromGNS3(projectId);

            if (!gns3Devices || gns3Devices.length === 0) {
                return res.status(404).json({ message: "No devices found in GNS3 project" });
            }

            console.log("Devices fetched from GNS3:", gns3Devices);

            const savedDevices = await Promise.all(
                gns3Devices.map(async (device) => {
                    const existingDevice = await Device.findOne({ name: device.name });
                    if (existingDevice) {
                        // Update existing device details
                        existingDevice.ip = device.properties?.ip_address || "N/A";
                        existingDevice.DeviceStatus = device.status || "Unknown";
                        return await existingDevice.save();
                    }

                    // Create new device if not already present
                    const newDevice = new Device({
                        name: device.name,
                        ip: device.properties?.ip_address || "N/A",
                        DeviceStatus: device.status || "Unknown",
                    });

                    return await newDevice.save();
                })
            );

            res.status(200).json({ message: "Devices synced successfully", devices: savedDevices });
        } catch (error) {
            console.error("Error in syncDevicesFromGNS3:", error);
            res.status(500).json({ message: "Error syncing devices", error: error.message });
        }
    },

    // Fetch device details (show ip command)
    getDeviceDetails: async (req, res) => {
        const { projectId, nodeId } = req.params;

        if (!projectId || !nodeId) {
            return res.status(400).json({ message: "Project ID and Node ID are required" });
        }

        try {
            const deviceDetails = await getDeviceDetailsFromGNS3(projectId, nodeId);
            res.status(200).json({ message: "Device details fetched", details: deviceDetails });
        } catch (error) {
            console.error("Error fetching device details:", error);
            res.status(500).json({ message: "Error fetching device details", error: error.message });
        }
    }
};
