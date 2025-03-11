const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
require("./config/mongoose");

const port = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/device.routes")(app);

app.listen(port, () => console.log(`🚀 Server running on port: ${port}`));