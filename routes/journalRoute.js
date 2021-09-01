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
      .json({ 
          journals: journals, 
          user: req.user,
          message: "Successfully retrieved" 
        });
  } catch (e) {
    return res.status(401).json({ 
        message: "No user" });
  }
});

// create a new journal
router.post("/create", auth.authenticateToken, async (req, res) => {
  try {
    const journal = new Journal({
      user_id: req.user.id,
      title: req.body.title,
      description: req.body.description,
      files: req.body.files,
    });
    console.log(journal);
    await journal.save();
    return res
        .status(200)
        .json({ 
            message: "Successfully added" 
        });
  } catch (e) {
    console.log(e);
    return res
      .status(403)
      .json({ message: "Failed to add journal. Try again." });
  }
});

//delete journal
router.get("/delete/:id", auth.authenticateToken, async (req, res) => {
  try {
    const journal = await Journal.findOneAndDelete({
      _id: req.params.id,
    })
    const journals = await Journal.find({user_id: req.user.id});
    return res.status(200)
        .json({ 
            journals: journals,
            message: "Successfully deleted" 
        });
  } catch (e) {
    console.log(e);
    return res
      .status(403)
      .json({ 
          message: "Failed to delete journal. Try again." 
        });
  }
});

//edit journal
router.get("/edit/:id", auth.authenticateToken, async (req, res) => {
    try {
      const journal = Journal.findById(req.params.id);
      return res.status(200).json({ 
          user: req.user,
          journal: journal,
          message: "Successfully retrieved" });
    } catch (e) {
      console.log(e);
      return res
        .status(403)
        .json({ 
            message: "Failed to retrieve journal. Try again." 
          });
    }
});

router.post("/edit/:id", auth.authenticateToken, async (req, res) => {
  try {
    console.log("before: "  + await Journal.find({user_id: req.user.id}));
    
    var journal = await Journal.findbyId(req.params.id);
    var title = req.body.title;
    if(title =='') {
        title = journal.title;
    }
    var description = req.body.description;
    if(description=='') {
        description = journal.description;
    }
    var files = req.body.files;

    journal = await Journal.findOneAndUpdate( req.params.id, {
        title: title,
        description: description,
        files: files,
    }, {new: true});
    console.log("after: "  + await Journal.find({user_id: req.user.id}));
    return res.status(200).json({ 
        user: req.user,
        message: "Successfully edited" });
  } catch (e) {
    console.log(e);
    return res
      .status(403)
      .json({ 
          message: "Failed to edit journal. Try again." 
        });
  }
});

module.exports = router;
