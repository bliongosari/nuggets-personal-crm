const express = require("express");
const passport = require("passport");
const Event = require("../models/event");
const auth = require("../middleware/auth");
const router = express.Router();
const sanitize = require("mongo-sanitize");
const eventController = require("../controllers/event_controller");

// show events
router.get("/", auth.authenticateToken, eventController.getAll);

// show recent events
router.get("/top10", auth.authenticateToken, eventController.getTop10);

// create a new event
router.post("/create", auth.authenticateToken, eventController.createEvent);

//delete event
router.get("/delete/:id", auth.authenticateToken, eventController.deleteEvent);

//edit event
router.post("/edit/:id", auth.authenticateToken, eventController.editEvent);

router.post('/delete-notif/:id', auth.authenticateToken, eventController.deleteNotif);

router.post('/open-notif/:id', auth.authenticateToken, eventController.openNotif);

module.exports = router;
