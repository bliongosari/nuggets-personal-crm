const express = require("express");
const passport = require("passport");
const Event = require("../models/event");
const auth = require("../middleware/auth");
const router = express.Router();

// show events
router.get("/", auth.authenticateToken, async (req, res) => {
    
    try {
        const repeat_list = Event.schema.path("repeat").enumValues;
        const alert_list = Event.schema.path("alert").enumValues;
        const events = await Event.find({ user_id: req.user.id });
        return res
          .status(200)
          .json({ 
            user: req.user,
            repeat_list: repeat_list,
            alert_list: alert_list,
            events: events,
            message: "Successfully retrieved" });
    } catch (e) {
        return res.status(401).json({ message: "No user" });
    }
});

// create a new event
router.post("/create", auth.authenticateToken, async (req, res) => {
    try {
        const repeat_list = Event.schema.path("repeat").enumValues;
        const alert_list = Event.schema.path("alert").enumValues;
        var repeat = req.body.repeat;
        var alert = req.body.alert;
        if(repeat_list.includes(repeat)) {
            repeat = repeat_list[repeat];
        }
        else {
            repeat = repeat_list[0];
        }
        if(alert_list.includes(alert)) {
            alert= alert_list[alert];
        }
        else {
            alert = alert_list[0];
        }
        
        const event = new Event({
            user_id: req.body.user_id,
            event_name: req.body.event_name,
            location: req.body.location,
            type: req.body.type,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            repeat: repeat,
            alert: alert,
            notes: req.body.notes,
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
        const events = await Event.find({user_id: req.user.id});
        
        return res.status(200).json({ 
            message: "Successfully deleted",
            events: events,
        });
    } catch (e) {
        console.log(e);
        return res.status(403).json({ message: "Failed to delete event. Try again." });
    }
});

//edit event
router.post("/edit/:id", auth.authenticateToken, async(req,res) => {
    try {
        var event = await Event.findbyId(req.params.id);
        var event_name= req.body.event_name;
        if(event_name == '') {
            event_name = event.event_name;
        }
        var location= req.body.location;
        if(location == '') {
            location = event.location;
        }
        var type= req.body.type;
        if(type == '') {
            type = event.type;
        }
        var start_time= req.body.start_time;
        if(start_time == '') {
            start_time= event.start_time;
        }
        var end_time= req.body.end_time;
        if(end_time == '') {
            end_time = event.end_time;
        }
        var repeat= req.body.repeat;
        if(repeat == '') {
            repeat= event.repeat;
        }
        var alert= req.body.alert;
        if(alert == '') {
            alert = event.alert;
        }
        var notes= req.body.notes;
        if(notes == '') {
            notes= event.notes;
        }

        var event = await Event.findOneAndUpdate( req.params.id, {
            user_id: req.user.id,
            event_name: event_name,
            location: location,
            type: type,
            start_time: start_time,
            end_time: end_time,
            repeat: repeat,
            alert: isalert,
            notes: notes,
        }, {new: true});
        return res.status(200).json({ 
            user: req.user,
            message: "Successfully edited" });
    } catch (e) {
        console.log(e);
        return res
        .status(403)
        .json({ 
            message: "Failed to edit event. Try again." 
            });
    }
});

module.exports = router;