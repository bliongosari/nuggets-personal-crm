const express = require("express");

const router = express.Router();

const userAuth = require("./userAuth");

router.use("/user", userAuth);

router.get("/", (req, res) => {
  return res.send("api page");
});

module.exports = router;
