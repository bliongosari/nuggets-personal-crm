const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const Journal = require("../models/journal");
const Events = require("../models/event");
const Contact = require("../models/contact");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwtdecode = require("jwt-decode");
const auth = require("../middleware/auth");
const sanitize = require("mongo-sanitize");

const userController = require("../controllers/auth_controller");

const regexPassword = new RegExp(/(?=.*\d)(?=.*[a-zA-Z]).{8,}/);
const regexText = new RegExp(/[a-zA-Z ]+/);
const regexEmail = new RegExp(/(\w\.?)+@[\w\.-]+\.\w+/);
const regexDigit = new RegExp(/\d+/);
const regexAntiJS = new RegExp(/[^;<>]+/);

router.get("/verifyToken", userController.verifyToken);

router.get("/info", auth.authenticateToken, userController.getInfo);

router.post("/sign-up", userController.signUp);

router.post("/login", userController.login);

router.get("/numDetails", auth.authenticateToken, async (req, res) => {
        try {
          const contacts = await Contact.find({ user_id: req.user.id });
          const events = await Events.find({ user_id: req.user.id });
          const journal = await Journal.find({ user_id: req.user.id });
          return res
            .status(200)
            .json({ contacts: contacts.length, events: events.length, journal: journal.length, message: "Successfully retrieved" });
        } catch (e) {
            console.log(e);
          return res.status(401).json({ message: "Error" });
        }
})


router.get("/notifications", auth.authenticateToken, async (req, res) => {
  try {
    const contacts = await Contact.find({ user_id: req.user.id });
    const events = await Events.find({ user_id: req.user.id });
    let editedContacts = [];
    for (var i =0; i < contacts.length; i++) {
      if (typeof contacts[i].alert !== "undefined"){
        editedContacts.push(contacts[i])
      }
    }
    let editedEvents = [];
    let eventsOutstanding = []
    for (var i =0; i < events.length; i++) {
      if (events[i].alert !== "None" ){
        editedEvents.push(events[i])
      }
    }

    const sortedEvents = editedEvents.sort(
      (obj1, obj2) => new Date(obj2.start) - new Date(obj1.start)
    );

    const sortedOutstandingEvents = eventsOutstanding.sort(
      (obj1, obj2) => new Date(obj2.start) - new Date(obj1.start)
    );
    return res
      .status(200)
      .json({ pastNotif: sortedOutstandingEvents.reverse(), eventsNotif: sortedEvents.reverse() });
  } catch (e) {
    return res.status(403).json({ message: "Error" });
  }
})

router.post("/logout", async (req, res) => {});

module.exports = router;
