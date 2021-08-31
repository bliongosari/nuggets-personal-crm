const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

require("dotenv").config();
require("./config/database").establishDB();

const app = express();
const routes = require("./routes/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/", routes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Error. Unauthorized");
  });
}

app.use(express.json());

PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Backend on port " + PORT));

module.exports = app;
