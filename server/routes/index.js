const express = require("express");

const router = express.Router();

const userAuth = require("./userAuth");

router.use("/api/authUser", userAuth);

router.get("/*", (req, res) => {
  res.send("Backend here");
});

module.exports = router;
