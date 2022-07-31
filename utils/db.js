const mongoose = require("mongoose");
const { GatewayError } = require("./helpers");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { Schema } = mongoose;

//DB data structure
const GatewaySchema = new Schema({
  gatewayserial: String,
  gatewayname: String,
  ipv4: String,
  devices: [
    {
      uid: Number,
      vendor: String,
      datecreated: String,
      status: String,
    },
  ],
});

const Gateway = mongoose.model("gateways", GatewaySchema);

//DB handler
class GatewaysDB {
  constructor(gateway) {
    this._gateway = gateway;
  }

  //GetGateway gets a gateway entry from DB.
  async GetGateway(serial) {
    const foundedGateway = await this._gateway.findOne({
      gatewayserial: serial,
    });
    if (foundedGateway) {
      return foundedGateway;
    }
    throw new GatewayError("Gateway not found", 404);
  }

  //AddGateway add a gateway entry to DB.
  async AddGateway(gw) {
    try {
      await this.GetGateway(gw.gatewaySerial);
    } catch (err) {
      const newGateway = new this._gateway({
        gatewayserial: gw.gatewaySerial,
        gatewayname: gw.gatewayName,
        ipv4: gw.ipv4,
        devices: [],
      });
      const newDbEntry = await newGateway.save();
      return newDbEntry;
    }
    throw new GatewayError("Gateway already exist", 409);
  }

  //AddDevice add a device device to a gateway in DB.
  async AddDevice(gatewaySerial, device) {
    const foundedGateway = await this.GetGateway(gatewaySerial);
    if (foundedGateway.devices.length >= 10) {
      throw new GatewayError("There are to many devices in this gateway", 409);
    }
    if (
      foundedGateway.devices.map((device) => device.uid).indexOf(device.uid) !==
      -1
    ) {
      throw new GatewayError("Device already exist in this gateway", 409);
    }
    const updatedGateway = await this._gateway.findOneAndUpdate(
      { _id: foundedGateway._id },
      {
        $push: {
          devices: {
            ...device,
            datecreated: new Date().toLocaleString(),
          },
        },
      },
      { new: true }
    );
    return updatedGateway;
  }

  //DelGateway delete a gateway from DB.
  async DelGateway(serial) {
    const deletedGateway = await this._gateway.findOneAndDelete({
      gatewayserial: serial,
    });
    if (deletedGateway) {
      return deletedGateway;
    }
    throw new GatewayError("Gateway not found", 404);
  }

  //DelDevice delete a given device from a given gateway.
  async DelDevice(gatewaySerial, uid) {
    const foundedGateway = await this.GetGateway(gatewaySerial);
    const deviceIndex = foundedGateway.devices
      .map((device) => device.uid)
      .indexOf(uid);
    if (deviceIndex === -1) {
      throw new GatewayError("Device Not Found", 404);
    }
    foundedGateway.devices.splice(deviceIndex, 1);
    const updatedGateway = await this._gateway.findOneAndUpdate(
      { _id: foundedGateway._id },
      { devices: foundedGateway.devices },
      { new: true }
    );
    return updatedGateway;
  }
}
const db = new GatewaysDB(Gateway);
module.exports = db;
