const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwtdecode = require("jwt-decode");

const regexPassword = new RegExp(/(?=.*\d)(?=.*[a-zA-Z]).{8,}/);
const regexText = new RegExp(/[a-zA-Z ]+/);
const regexEmail = new RegExp(/(\w\.?)+@[\w\.-]+\.\w+/);
const regexDigit = new RegExp(/\d+/);
const regexAntiJS = new RegExp(/[^;<>]+/);

function generateToken(payload) {
  const token = jwt.sign({ email: payload }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
}

const authenticateToken = (req, res, next) => {
  let tokenPassed =
    req.headers["x-access-token"] || req.headers["authorization"];
  if (tokenPassed) {
    const token = tokenPassed.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.Status(403).json({ message: "Token invalid" });
      }
      next();
    });
  } else {
    res.Status(401).json({ message: "No Token" });
  }
};

router.get("/info", authenticateToken, async (req, res) => {});

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
    //console.log(req.body.email);
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
              const token = generateToken(newUser.email);
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
            const token = generateToken(req.body.email);
            res.status(200).json({
              success: true,
              token: "Bearer " + token,
              user: user,
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
