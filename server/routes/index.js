const express = require("express");

const router = express.Router();

router.get("/*", (req, res) => {
  res.send("Backend here");
});

module.exports = router;
