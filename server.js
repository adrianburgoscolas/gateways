const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./utils/db");
const {
  ValidateGateway,
  ValidateDevice,
  GatewayError,
} = require("./utils/helpers");

require("dotenv").config();

//Middleware to parse incoming request with JSON payloads
app.use(express.json());

//CORS allow all origin
app.use(cors());

app.get("/", (_, res) => {
  res.send("hola");
});

//API entry point to add a new gateway without devices.
//data format JSON
//{
//  gatewaySerial: String,
//  gatewayName: String,
//  ipv4: String
//}
app.post("/api/addgateway", async (req, res) => {
  try {
    ValidateGateway(req.body);
    const newGateway = await db.AddGateway(req.body);
    res.status(201).json(newGateway);
  } catch (err) {
    if (err instanceof GatewayError) {
      res.status(err.status).send("Error: " + err.message);
      return;
    }
    throw err;
  }
});

//API entry point to get a gateway's info.
//data format JSON
//{
//  gatewaySerial: String
//}
app.post("/api/getgateway", async (req, res) => {
  try {
    if (!req.body.gatewaySerial || typeof req.body.gatewaySerial !== "string") {
      throw new GatewayError("Missing Gateway Data", 400);
    }
    const gw = await db.GetGateway(req.body.gatewaySerial);
    res.status(200).json(gw);
  } catch (err) {
    if (err instanceof GatewayError) {
      res.status(err.status).send("Error: " + err.message);
      return;
    }
    throw err;
  }
});

//API entry point to add a new device to a given gateway.
//data format JSON
//{
//  gatewaySerial: String,
//  device: {
//    uid: Number,
//    vendor: String,
//    status: String
//  }
//}
//assuming the device "date created" field is the date
//the device was added to its gateway in the db,
//so this field is generated in the server
app.put("/api/adddevice", async (req, res) => {
  try {
    ValidateDevice(req.body.device);
    const updatedGateway = await db.AddDevice(
      req.body.gatewaySerial,
      req.body.device
    );
    res.status(200).json(updatedGateway);
  } catch (err) {
    if (err instanceof GatewayError) {
      res.status(err.status).send("Error: " + err.message);
      return;
    }
    throw err;
  }
});

//API entry point to del a gateway.
//data format JSON
//{
//  gatewaySerial: String
//}
app.delete("/api/delgateway", async (req, res) => {
  try {
    if (!req.body.gatewaySerial || typeof req.body.gatewaySerial !== "string") {
      throw new GatewayError("Missing Gateway Data", 400);
    }
    const deletedGateway = await db.DelGateway(req.body.gatewaySerial);
    res.status(200).json(deletedGateway);
  } catch (err) {
    if (err instanceof GatewayError) {
      res.status(err.status).send("Error: " + err.message);
      return;
    }
    throw err;
  }
});

//API entry point to del a device from a gateway.
//data format JSON
//{
//  gatewaySerial: String,
//  device: {uid: Number}
//}
app.put("/api/deldevice", async (req, res) => {
  try {
    if (
      !req.body.gatewaySerial ||
      typeof req.body.gatewaySerial !== "string" ||
      !req.body.device ||
      !req.body.device.uid ||
      typeof req.body.device.uid !== "number"
    ) {
      throw new GatewayError("Missing Gateway Data", 400);
    }
    const updatedGateway = await db.DelDevice(
      req.body.gatewaySerial,
      req.body.device.uid
    );
    res.status(200).json(updatedGateway);
  } catch (err) {
    if (err instanceof GatewayError) {
      res.status(err.status).send("Error: " + err.message);
      return;
    }
    throw err;
  }
});

//API entry point to list all gateways.
//Returns an array of gateway objects with basic info
app.get("/api/getallgateways", async (_, res) => {
  try {
    const gatewaysArr = await db.GetAllGateways();
    const resultGatewayArr = gatewaysArr.map((gateway) => {
      return {
        gatewaySerial: gateway.gatewayserial,
        gatewayName: gateway.gatewayname,
        associatedDevices: gateway.devices.length,
      };
    });
    res.status(200).json(resultGatewayArr);
  } catch (err) {
    if (err instanceof GatewayError) {
      res.status(err.status).send("Error: " + err.message);
      return;
    }
    throw err;
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

module.exports = app;
