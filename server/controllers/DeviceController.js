const Device = require("../models/Device");

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
};