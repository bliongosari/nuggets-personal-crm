const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

require("dotenv").config();
require("./config/database").establishDB();

const routes = require("./routes/index");
const app = express();

app.use(express.json());

app.use("/", routes);

PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Backend on port " + PORT));

module.exports = app;
