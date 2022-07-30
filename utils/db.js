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
  periferals: [
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
    throw new GatewayError("Gateway not found", 500);
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
        periferals: [],
      });
      const newDbEntry = await newGateway.save();
      return newDbEntry;
    }
    throw new GatewayError("Gateway already exist", 500);
  }

  //AddPeriferal add a periferal device to a gateway in DB.
  async AddPeriferal(gatewaySerial, periferal) {
    const foundedGateway = await this.GetGateway(gatewaySerial);
    if (foundedGateway.periferals.length >= 10) {
      throw new GatewayError(
        "There are to many periferals in this gateway",
        500
      );
    }
    if (
      foundedGateway.periferals
        .map((periferal) => periferal.uid)
        .indexOf(periferal.uid) !== -1
    ) {
      throw new GatewayError("Periferal already exist in this gateway", 500);
    }
    const updatedGateway = await this._gateway.findOneAndUpdate(
      { _id: foundedGateway._id },
      {
        $push: {
          periferals: {
            ...periferal,
            datecreated: new Date().toLocaleString(),
          },
        },
      },
      { new: true }
    );
    return updatedGateway;
  }
}
const db = new GatewaysDB(Gateway);
module.exports = db;
