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

app.post("/api/setgateway", (req, res) => {
  const gw = req.body;

  res.json(gw);
});

//Not Found
app.use("/", (_, res) => {
  res.status(404).send("Not Found");
});

const port = process.env.NODE_ENV === "development" ? 3001 : process.env.PORT;
app.listen(port, () => {
  console.log("listening on port: " + port);
});
