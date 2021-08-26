const express = require("express");

const router = express.Router();

const userAuth = require("./userAuth");
const contacts = require("./contacts");

router.use("/contacts", contacts);
router.use("/user", userAuth);

router.get("/", (req, res) => {
  return res.send("api page");
});

module.exports = router;
