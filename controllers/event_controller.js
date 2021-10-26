const express = require("express");
const passport = require("passport");
const Event = require("../models/event");
const auth = require("../middleware/auth");
const router = express.Router();
const sanitize = require("mongo-sanitize");
const MS_PER_MINUTE = 60000;

const getAll = async (req, res) => {
  try {
    const events = await Event.find({ user_id: req.user.id });
    return res.status(200).json({
      events: events,
      message: "Successfully retrieved",
    });
  } catch (e) {
    return res.status(401).json({ message: "No user" });
  }
};

const getTop10 = async (req, res) => {
  try {
    const events = await Event.find({ user_id: req.user.id });
    // console.log(events);
    var endDate = new Date();
    endDate.setDate(endDate.getDate() + 14);
    var filteredEvents = events.filter((event) => {
      var date = new Date(event.start);
      var date2 = new Date(event.end);
      var curDate = new Date();
      return (
        (date >= curDate && date <= endDate) ||
        (date2 >= curDate && date2 <= endDate)
      );
    });
    const sortedEvents = filteredEvents.sort(
      (obj1, obj2) => new Date(obj2.start) - new Date(obj1.start)
    );

    return res.status(200).json({
      events: sortedEvents.reverse().slice(0, 10),
      message: "Successfully retrieved",
    });
  } catch (e) {
    return res.status(403).json({ message: "Error in retrieving data" });
  }
};

const createEvent = async (req, res) => {
  const start = new Date(req.body.start);
  const end = new Date(req.body.end);
  try {

    const alertTime = getAlert(start, req.body.alert);
    //console.log(alertTime);
    const event = new Event({
      user_id: req.user.id,
      title: req.body.title,
      location: req.body.location,
      type: req.body.type,
      start: start,
      end: end,
      alert: alertTime,
      notes: req.body.notes,
    });
    console.log(event);
    const savedEvent = await event.save();
    return res
      .status(200)
      .json({ message: "Successfully added", event: savedEvent });
  } catch (e) {
    return res.status(403).json({ message: "Failed to add event. Try again." });
  }
};

const deleteNotif = async (req, res) => {
  try {
    var eventID = sanitize(req.params.id);
    await Event.findOneAndUpdate(
      {_id: eventID},
      {
        notification_deleted: true
      }
    );
    return res.status(200).json({
      message: "Successfully edited",
    });
  } catch (e) {
    return res.status(401).json({ message: "No user" });
  }
}

const openNotif = async (req, res) => {
  try {
    var eventID = sanitize(req.params.id);
    await Event.findOneAndUpdate(
      {_id: eventID},
      {
        notification_opened: true
      }
    );
    return res.status(200).json({
      message: "Successfully opened",
    });
  } catch (e) {
    return res.status(401).json({ message: "No user" });
  }
}

const deleteEvent = async (req, res) => {
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
};

const editEvent = async (req, res) => {
  try {
    var eventID = sanitize(req.params.id);
    var changes = {}
    var event = await Event.findOne({ _id: eventID});
    var title = sanitize(req.body.title);
    if (title == "") {
      title = event.title;
    }
    var location = sanitize(req.body.location);
    if (location == "") {
      location = event.location;
    }
    var type = sanitize(req.body.type);
    if (type == "") {
      type = event.type;
    }
    var start = new Date(sanitize(req.body.start));
    if (start == "") {
      start = (event.start);
    }
    var end = new Date(sanitize(req.body.end));
    if (end == "") {
      end = (event.end);
    }
    var repeat = sanitize(req.body.repeat);
    if (repeat == "") {
      repeat = event.repeat;
    }
    var alert = sanitize(req.body.alert);
    if (alert == "") {
      alert = getAlert(start, event.start - event.alert);
    }
    else {
      alert = getAlert(start, req.body.alert);
    }

    var notes = sanitize(req.body.notes);
    if (notes == "") {
      notes = event.notes;
    }

    event = await Event.findOneAndUpdate(
      {_id: eventID},
      {
        title: title,
        location: location,
        type: type,
        start: new Date(start),
        end: new Date(end),
        alert: new Date(alert),
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
};

function getAlert(start, alert) {
  var alertTime = null;
  if(alert == "None") {
    return alertTime
  }
  else if(alert == "At time of the event") {
    alertTime = new Date(start);
  }
  else if(alert.includes("minute")) {
    alertTime = new Date(start - parseInt(alert.split(" ")[0]) * MS_PER_MINUTE);
  }
  else if(alert.includes("hour")) {
    alertTime = new Date(start - parseInt(alert.split(" ")[0]) * MS_PER_MINUTE * 60);
  }
  else if(alert.includes("day")) {
    alertTime = new Date(start - parseInt(alert.split(" ")[0]) * MS_PER_MINUTE * 60 * 24);
  }
  else if(alert.includes("week")) {
    alertTime = new Date(start - parseInt(alert.split(" ")[0]) * MS_PER_MINUTE * 60 * 24 * 7);
  }
  return alertTime;
}

module.exports.editEvent = editEvent;
module.exports.deleteEvent = deleteEvent;
module.exports.createEvent = createEvent;
module.exports.getAll = getAll;
module.exports.getTop10 = getTop10;
module.exports.deleteNotif = deleteNotif;
module.exports.openNotif = openNotif;