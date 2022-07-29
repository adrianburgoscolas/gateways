const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./utils/db");

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
//  serial: String
//  name: String
//  ipv4: String
//}
app.post("/api/addgateway", async (req, res) => {
  try {
    const newGateway = await db.AddGateway(req.body);
    res.status(201).json(newGateway);
  } catch (err) {
    res.status(500).send(err);
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
