const mongoose = require("mongoose");
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

  //AddGateway add a gateway entry to DB.
  async AddGateway(gw) {
    const newGateway = new this._gateway({
      gatewayserial: gw.serial,
      gatewayname: gw.name,
      ipv4: gw.ipv4,
      periferals: [],
    });
    const newDbEntry = await newGateway.save();
    return newDbEntry;
  }
}
const db = new GatewaysDB(Gateway);
module.exports = db;
