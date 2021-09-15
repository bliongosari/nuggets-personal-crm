const express = require("express");

const router = express.Router();

const userAuth = require("./userAuth");
const contacts= require("./contactRoute");
const journalRoute = require("./journalRoute");
const eventRoute = require("./eventRoute");

router.use("/contacts", contacts);
router.use("/user", userAuth);
router.use("/journal", journalRoute);
router.use("/events", eventRoute);

router.get("/", (req, res) => {
  return res.send("api page");
});

module.exports = router;
