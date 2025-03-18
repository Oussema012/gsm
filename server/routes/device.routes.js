const deviceController =require("../controllers/DeviceController");

module.exports=(app)=>{
    app.post("/devices",deviceController.createDevice),
    app.get("/devices",deviceController.getAllDevices),
    app.get("/device/:id",deviceController.getDeviceById),
    app.put("/devices/:id",deviceController.updateDevice),
    app.delete("/devices/:id",deviceController.deleteDevice)
    app.get("device/:projectId/:nodeId",deviceController.getDeviceDetails)


}
//hné les actions lkol li fi controllers kima create device , get all devices ...
