const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

require("dotenv").config();

const routes = require("./routes/index");
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb://brandonvincent:brandonvincent@cluster0-shard-00-00.j9iov.mongodb.net:27017,cluster0-shard-00-01.j9iov.mongodb.net:27017,cluster0-shard-00-02.j9iov.mongodb.net:27017/personal-crm?ssl=true&replicaSet=atlas-deqszg-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/", routes);

PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Backend on port " + PORT));
