const express = require("express");
const passport = require("passport");
const Event = require("../models/event");
const router = express.Router();

// show events
router.get("/", async (req, res) => {
    Event.find()
        .then(event=> {
            res.json(event)
        }).catch(err=>{
            console.log(err)
        });
});

// create a new event
router.post("/create", async (req, res) => {
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
    })
  
    event.save()
      .then(() => res.json(event))
      .catch((err) => next(err));
});

//delete event
router.delete("/delete/:id", async (req,res) => {
    Event.findOneAndDelete({_id: req.params.id })
        .exec()
        .then((event) => res.json())
        .catch((err) => next(err));
});

//edit event
router.post("/edit/:id", async(req,res) => {
    const event = Event.findById(req.params.id);
});

module.exports = router;