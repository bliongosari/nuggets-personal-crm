const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const Journal = require("../models/journal");
const Events = require("../models/event");
const Contact = require("../models/contact");
const Reminder = require("../models/reminder");
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

router.get('/verify/:id', userController.verify);

router.post("/edit", auth.authenticateToken, async (req, res) => {
  try {
    var firstname = sanitize(req.body.firstname);
    var lastname = sanitize(req.body.lastname);
    var id = sanitize(req.user.id);
    var changes = {
      firstname: firstname,
      lastname: lastname
    }
    await User.findByIdAndUpdate(id, changes);
    return res.status(200).json({
      message: "Successfully edited",
    });
  } catch (e) {
    console.log(e);
    return res.status(403).json({
      message: "Failed to edit event. Try again.",
    });
  }
});

router.post("/changePassword", auth.authenticateToken, async (req, res) => {
  try {
    var password = sanitize(req.body.password);
    var old = sanitize(req.body.oldPassword);
    var id = sanitize(req.user.id);
    const hashedpassword = await bcrypt.hash(password, 10);
    var changes = {
      password: hashedpassword
    }
    const user = await User.findById(id);
    //const user = userAll[0];
    bcrypt.compare(old, user.password, async (err, isMatch) => {
      if (err) {
        return res.status(111).json({ message: "Failed to change password. Try again." });
      }
    if (isMatch) {
      await User.findByIdAndUpdate(id, changes);
      return res.status(200).json({
        message: "Successfully changed",
      });
    }
    else {
      return res.status(111).json({ message: "Password incorrect" });
    }
  });
  } catch (e) {
    console.log(e);
    return res.status(403).json({
      message: "Failed to change password. Try again.",
    });
  }
});


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
    const contacts = await Reminder.find({ belongs_to: req.user.id });
    const events = await Events.find({ user_id: req.user.id });
    let editedContacts = [];
    let editedEvents = [];
    //console.log(contacts);
    let eventsOutstanding = []
    for (var i =0; i < contacts.length; i++) {
      if (contacts[i].alert && new Date(contacts[i].alert) >= Date.now()){
        editedEvents.push(contacts[i])
      }
      else if (contacts[i].alert && new Date(contacts[i].alert) < Date.now()){
        eventsOutstanding.push(contacts[i])
      }
    }

    //let eventsOutstanding = []
    for (var i =0; i < events.length; i++) {
      // console.log(events[i]);
      if (events[i].alert > new Date(0) && events[i].alert !== "None" && !events[i].notification_deleted){
        if (new Date(events[i].start) < Date.now() && !events[i].notification_opened){
          eventsOutstanding.push(events[i])
        }
        else if (new Date(events[i].start) > Date.now()) {
          editedEvents.push(events[i])
        }
      }
    }

    const sortedEvents = editedEvents.sort(
      (obj1, obj2) => new Date(obj2.alert) - new Date(obj1.alert)
    );

    const sortedOutstandingEvents = eventsOutstanding.sort(
      (obj1, obj2) => new Date(obj2.alert) - new Date(obj1.alert)
    );
    //onsole.log(sortedEvents);
    //console.log(sortedOutstandingEvents);
    return res
      .status(200)
      .json({ pastNotif: sortedOutstandingEvents.reverse(), eventsNotif: sortedEvents.reverse() });
  } catch (e) {
    console.log("error")
    return res.status(403).json({ message: "Error" });
  }
})

router.post("/logout", async (req, res) => {});

module.exports = router;