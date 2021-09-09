const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwtdecode = require("jwt-decode");
const auth = require("../middleware/auth");
const sanitize = require("mongo-sanitize");

const regexPassword = new RegExp(/(?=.*\d)(?=.*[a-zA-Z]).{8,}/);
const regexText = new RegExp(/[a-zA-Z ]+/);
const regexEmail = new RegExp(/(\w\.?)+@[\w\.-]+\.\w+/);
const regexDigit = new RegExp(/\d+/);
const regexAntiJS = new RegExp(/[^;<>]+/);

const signUp = async (req, res) => {
  if (
    !req.body.email ||
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.password ||
    !req.body.passwordConfirmation
  ) {
    return res.status(400).json({ error: "Please fill all fields." });
  }
  if (
    regexEmail.test(req.body.email) == false ||
    regexPassword.test(req.body.password) == false ||
    regexText.test(req.body.firstname) == false ||
    regexText.test(req.body.lastname) == false
  ) {
    return res.render("user/sign-up", {
      success: false,
      message: "Please match the fields as requested",
    });
  } else {
    var email = sanitize(req.body.email);
    var password = sanitize(req.body.password);
    var firstname = sanitize(req.body.firstname);
    var lastname = sanitize(req.body.lastname);
    const hashedpassword = await bcrypt.hash(password, 10);
    User.find(
      {
        email: email,
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
          newUser.firstname = firstname;
          newUser.lastname = lastname;
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
};

const verifyToken = async (req, res) => {
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
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Please fill all fields." });
  } else {
    var email = sanitize(req.body.email);
    try {
      const userAll = await User.find({ email: email });
      const user = userAll[0];
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          console.log("error");
          return res.status(111).json({ message: "Password incorrect" });
        }
        if (isMatch) {
          const token = auth.generateToken(user._id);
          return res.status(200).json({
            success: true,
            token: "Bearer " + token,
            message: "Successfully logged in",
          });
        } else {
          return res.status(400).json({ message: "Password incorrect" });
        }
      });
    } catch (err) {
      return res.status(400).json({ message: "Email not found" });
    }
  }
};

const getInfo = async (req, res) => {
  var id = sanitize(req.user.id);
  try {
    const userInfo = await User.findOne({ _id: id });
    return res.status(200).json({
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      email: userInfo.email,
    });
  } catch (e) {
    return res.status(401).json({ message: "No user" });
  }
};

module.exports.verifyToken = verifyToken;
module.exports.signUp = signUp;
module.exports.getInfo = getInfo;
module.exports.login = login;
