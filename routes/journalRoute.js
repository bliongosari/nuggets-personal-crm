const express = require("express");
const passport = require("passport");
const Journal = require("../models/journal");
const router = express.Router();
const auth = require("../middleware/auth");

// show journals
router.get("/", auth.authenticateToken, async (req, res) => {
    try {
        const journals = await Journal.find({ user_id: req.user.id });
        return res
          .status(200)
          .json({ journals: journals, message: "Successfully retrieved" });
    } catch (e) {
        return res.status(401).json({ message: "No user" });
    }
});

// create a new journal
router.post("/create", auth.authenticateToken, async (req, res) => {
    try{
        const journal = new Journal({
        title: req.title,
        description: req. description,
        files: req.files,
    });
    await journal.save();
    return res.status(200).json({ message: "Successfully added" });
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: "Failed to add journal. Try again." });
    }
});

//delete journal
router.get("/delete/:id", auth.authenticateToken, async (req,res) => {
    try {
        const journal = await Journal.findOneAndDelete({_id: req.params.id })
        .exec();
        return res.status(200).json({ message: "Successfully deleted" });
    } catch (e) {
        console.log(e);
        return res.status(403).json({ message: "Failed to delete journal. Try again." });
    }
});

//edit journal
router.post("/edit/:id", auth.authenticateToken, async(req,res) => {
    try { 
        const journal = Journal.findById(req.params.id);
        return res.status(200).json({ message: "Successfully edited" });
    } catch (e) {
        console.log(e);
        return res.status(403).json({ message: "Failed to edit journal. Try again." });
    }
});

module.exports = router;