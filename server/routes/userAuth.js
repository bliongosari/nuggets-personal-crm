const express = require("express");
const passport = require("passport");
const { User } = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {});

router.post("/login", async (req, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
  res.json({
    token,
    user: {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });
});

router.post("/logout", async (req, res) => {});

module.exports = router;
