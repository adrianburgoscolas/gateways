const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./utils/db");
const { ValidateGateway } = require("./utils/helpers");

require("dotenv").config();

//Middleware to parse incoming request with JSON payloads
app.use(express.json());

//CORS allow all origin
app.use(cors());

app.get("/", (_, res) => {
  res.send("hola");
});

//API entry point to add a new gateway without periferals.
//data format JSON
//{
//  gatewaySerial: String,
//  gatewayName: String,
//  ipv4: String
//}
app.post("/api/addgateway", async (req, res) => {
  try {
    ValidateGateway(req.body);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
    return;
  }
  try {
    const newGateway = await db.AddGateway(req.body);
    res.status(201).json(newGateway);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

//API entry point to get a gateway.
//data format JSON
//{
//  serial: String
//}
app.get("/api/getgateway", async (req, res) => {
  try {
    const gw = await db.GetGateway(req.body.serial);
    res.status(200).json(gw);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

//Not Found
app.use("/", (_, res) => {
  res.status(404).send("Not Found");
});

const port = process.env.NODE_ENV === "development" ? 3001 : process.env.PORT;
app.listen(port, () => {
  console.log("listening on port: " + port);
});
