const deviceController =require("../controllers/DeviceController");

module.exports=(app)=>{
    app.post("/devices",deviceController.createDevice),
    app.get("/devices",deviceController.getAllDevices),
    app.get("/devices/:id",deviceController.getDeviceById),
    app.put("/devices/:id",deviceController.updateDevice),
    app.delete("/devices/:id",deviceController.deleteDevice)


}

