// routes/gns3.routes.js
const express = require("express");
const router = express.Router();
const GNS3Controller = require("../controllers/GNS3Controller");

router.post("/sync-devices", GNS3Controller.syncDevicesFromGNS3);


module.exports = router;
//define a route to synchronize devices from gns3 to mongodb