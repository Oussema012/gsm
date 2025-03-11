const mongoose = require("mongoose");

// define a schema 
const DeviceSchema =new mongoose.Schema(
    {
        name : String,
        ip : String ,
        DeviceStatus : String , 
       


    }, {timestamps:true}
);

const Device=mongoose.model("Device",DeviceSchema);
module.exports=Device;