
const mongoose = require("mongoose");
const DeviceSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        ip: { type: String, default: "N/A" },
        DeviceStatus: { type: String, default: "Unknown" },
    },
    { timestamps: true }
);

const Device = mongoose.model("Device", DeviceSchema);
module.exports = Device;
