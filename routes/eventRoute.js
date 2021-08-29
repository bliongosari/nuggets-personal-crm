const express = require("express");
const passport = require("passport");
const Event = require("../models/event");
const auth = require("../middleware/auth");
const router = express.Router();

// show events
router.get("/", auth.authenticateToken, async (req, res) => {
    try {
        const events = await Event.find({ user_id: req.user.id });
        return res
          .status(200)
          .json({ events: events, message: "Successfully retrieved" });
    } catch (e) {
        return res.status(401).json({ message: "No user" });
    }
});

// create a new event
router.post("/create", auth.authenticateToken, async (req, res) => {
    try {
        const event = new Event({
        event_name: req.name,
        location: req. location,
        type: req.type,
        start_time: req.start_time,
        end_time: req.end_time,
        repeat: req.repeat,
        end_repeat: req.end_repeat,
        alert: req.alert,
        notes: req.notes,
    }); 
    await event.save();
    return res.status(200).json({ message: "Successfully added" });
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: "Failed to add event. Try again." });
    }
});

//delete event
router.get("/delete/:id", auth.authenticateToken, async (req,res) => {
    try {
        const event = await Event.findOneAndDelete({_id: req.params.id })
        .exec();
        return res.status(200).json({ message: "Successfully deleted" });
    } catch (e) {
        console.log(e);
        return res.status(403).json({ message: "Failed to delete event. Try again." });
    }
});

//edit event
router.post("/edit/:id", auth.authenticateToken, async(req,res) => {
    try { 
        const event = Event.findById(req.params.id);
        return res.status(200).json({ message: "Successfully edited" });
    } catch (e) {
        console.log(e);
        return res.status(403).json({ message: "Failed to edit event. Try again." });
    }
});

module.exports = router;