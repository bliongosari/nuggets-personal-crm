const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const app = express();
const routes = require("./routes/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/", routes);

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // every 1 minute
  max: 60,
});
app.use("/api/", apiLimiter);

if (process.env.NODE_ENV !== "test") {
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
}

app.use(express.json());

module.exports = app;
