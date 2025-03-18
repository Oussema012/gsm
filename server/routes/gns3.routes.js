const express = require("express");
const router = express.Router();
const GNS3Controller = require("../controllers/DeviceController"); // Import the controller

// Sync GNS3 devices
router.post("/sync-devices", GNS3Controller.syncDevicesFromGNS3);

// Get device details using 'show ip' command
router.get("/device-details/:projectId/:nodeId", GNS3Controller.getDeviceDetails);

module.exports = router;
