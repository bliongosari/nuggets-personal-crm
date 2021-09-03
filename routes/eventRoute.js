const express = require("express");
const passport = require("passport");
const Event = require("../models/event");
const auth = require("../middleware/auth");
const router = express.Router();

// show events
router.get("/", auth.authenticateToken, async (req, res) => {
  try {
    const events = await Event.find({ user_id: req.user.id });
    return res.status(200).json({
      events: events,
      message: "Successfully retrieved",
    });
  } catch (e) {
    return res.status(401).json({ message: "No user" });
  }
});

// create a new event
router.post("/create", auth.authenticateToken, async (req, res) => {
  const start = new Date(req.body.start);
  const end = new Date(req.body.end);
  try {
    const event = new Event({
      user_id: req.user.id,
      title: req.body.title,
      location: req.body.location,
      type: req.body.type,
      start: start,
      end: end,
      repeat: req.body.repeat || "Never",
      alert: req.body.alert || "None",
      notes: req.body.notes,
    });
    await event.save();
    console.log(event);
    return res.status(200).json({ message: "Successfully added" });
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "Failed to add event. Try again." });
  }
});

//delete event
router.get("/delete/:id", auth.authenticateToken, async (req, res) => {
  try {
    var eventQueried = await Event.findOne({ _id: req.params.id });
    if ((req.user.id = eventQueried.user_id)) {
      const event = await Event.findOneAndDelete({ _id: req.params.id });
      return res.status(200).json({
        message: "Successfully deleted",
      });
    } else {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(403)
      .json({ message: "Failed to delete event. Try again." });
  }
});

//edit event
router.post("/edit/:id", auth.authenticateToken, async (req, res) => {
  try {
    var event = await Event.findbyId(req.params.id);
    var title = req.body.title;
    if (title == "") {
      title = event.title;
    }
    var location = req.body.location;
    if (location == "") {
      location = event.location;
    }
    var type = req.body.type;
    if (type == "") {
      type = event.type;
    }
    var start = req.body.start;
    if (start == "") {
      start = event.start;
    }
    var end = req.body.end;
    if (end == "") {
      end = event.end;
    }
    var repeat = req.body.repeat;
    if (repeat == "") {
      repeat = event.repeat;
    }
    var alert = req.body.alert;
    if (alert == "") {
      alert = event.alert;
    }
    var notes = req.body.notes;
    if (notes == "") {
      notes = event.notes;
    }

    var event = await Event.findOneAndUpdate(
      req.params.id,
      {
        user_id: req.user.id,
        title: title,
        location: location,
        type: type,
        start: start,
        end: end,
        repeat: repeat,
        alert: isalert,
        notes: notes,
      },
      { new: true }
    );
    return res.status(200).json({
      user: req.user,
      message: "Successfully edited",
    });
  } catch (e) {
    console.log(e);
    return res.status(403).json({
      message: "Failed to edit event. Try again.",
    });
  }
});

module.exports = router;
