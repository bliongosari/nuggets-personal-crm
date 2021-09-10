const express = require("express");
const passport = require("passport");
const Journal = require("../models/journal");
const router = express.Router();
const auth = require("../middleware/auth");
const sanitize = require("mongo-sanitize");

const journalController = require("../controllers/journal_controller");

// show journals
router.get("/", auth.authenticateToken, journalController.getAll);

// create a new journal
router.post("/create", auth.authenticateToken, journalController.createNew);

//delete journal
router.get(
  "/delete/:id",
  auth.authenticateToken,
  journalController.deleteJournal
);

//edit journal
router.get("/edit/:id", auth.authenticateToken, journalController.editJournal);

router.post(
  "/edit/:id",
  auth.authenticateToken,
  journalController.postEditedJournal
);
module.exports = router;
