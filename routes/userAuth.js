const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwtdecode = require("jwt-decode");
const auth = require("../middleware/auth");

const regexPassword = new RegExp(/(?=.*\d)(?=.*[a-zA-Z]).{8,}/);
const regexText = new RegExp(/[a-zA-Z ]+/);
const regexEmail = new RegExp(/(\w\.?)+@[\w\.-]+\.\w+/);
const regexDigit = new RegExp(/\d+/);
const regexAntiJS = new RegExp(/[^;<>]+/);

router.get("/verifyToken", async (req, res) => {
  let tokenPassed =
    req.headers["x-access-token"] || req.headers["authorization"];

  if (tokenPassed) {
    const token = tokenPassed.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token invalid" });
      }
      return res.status(200).json({ message: "Token verified" });
    });
  } else {
    res.status(401).json({ message: "No Token" });
  }
});

router.get("/info", auth.authenticateToken, async (req, res) => {
  try {
    User.findOne({ _id: req.user.id }).then(function (userInfo) {
      return res.status(200).json({
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        email: userInfo.email,
      });
    });
  } catch (e) {
    return res.status(401).json({ message: "No user" });
  }
});

router.post("/sign-up", async (req, res) => {
  if (
    !req.body.email ||
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.password ||
    !req.body.passwordConfirmation
  ) {
    return res.status(400).json({ error: "Please fill all fields." });
  } else {
    const hashedpassword = await bcrypt.hash(req.body.password, 10);
    User.find(
      {
        email: req.body.email,
      },
      (err, previousUsers) => {
        if (err) {
          return res.status(400).json({ error: err });
        } else if (previousUsers.length > 0) {
          return res
            .status(400)
            .json({ message: "You already have an account." });
        } else {
          const newUser = new User();
          newUser.email = req.body.email;
          newUser.firstname = req.body.firstname;
          newUser.lastname = req.body.lastname;
          newUser.password = hashedpassword;
          newUser.save((err, user) => {
            if (err) {
              return res
                .status(400)
                .json({ message: "Sign up failed. Try Again" });
            } else {
              return res
                .status(200)
                .json({ message: "Successfully signed up" });
            }
          });
        }
      }
    );
  }
});

router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Please fill all fields." });
  } else {
    User.findOne({
      email: req.body.email,
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "Email not found" });
        }
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            const token = auth.generateToken(user._id);
            res.status(200).json({
              success: true,
              token: "Bearer " + token,
              message: "Successfully logged in",
            });
          } else {
            return res
              .status(400)
              .json({ passwordincorrect: "Password incorrect" });
          }
        });
      })
      .catch((err) => console.log(err));
  }
});

router.post("/logout", async (req, res) => {});

module.exports = router;
