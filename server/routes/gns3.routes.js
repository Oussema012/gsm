// routes/gns3.routes.js
const express = require("express");
const router = express.Router();
const GNS3Controller = require("../controllers/GNS3Controller");

router.post("/sync-devices", GNS3Controller.syncDevicesFromGNS3);

module.exports = router;