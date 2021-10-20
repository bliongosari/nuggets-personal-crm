const express = require("express");
const passport = require("passport");
const Journal = require("../models/journal");
const router = express.Router();
const auth = require("../middleware/auth");
const sanitize = require("mongo-sanitize");
const BSON = require('bson');
const newBSON = new BSON();

const getAll = async (req, res) => {
  try {
    const journals = await Journal.find({ user_id: req.user.id });
    const parsedDates = [];
    var i=0;
    journals.sort(function compare(a, b) {
      var dateA = new Date(a.createdOn);
      var dateB = new Date(b.createdOn);
      return dateB - dateA;
    });
    var i=0;
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    for(i=0; i<journals.length;i++) {
      var date = new Date(journals[i].createdOn);
      parsedDates[i] = date.toLocaleDateString('en-US', options);
    }
    return res.status(200).json({
      journals: journals,
      dates: parsedDates,
      user: req.user,
      message: "Successfully retrieved",
    });
  } catch (e) {
    return res.status(401).json({
      message: "No user",
    });
  }
};

const createNew = async (req, res) => {
  try {
    const journal = new Journal({
      user_id: req.user.id,
      title: req.body.title,
      description: req.body.description,
    });
    await journal.save();
    return res.status(200).json({
      message: "Successfully added",
    });
  } catch (e) {
    console.log(e);
    return res
      .status(403)
      .json({ message: "Failed to add journal. Try again." });
  }
};

const deleteJournal = async (req, res) => {
  try {
    var id = sanitize(req.params.id);
    const journal = await Journal.findOneAndDelete({
      _id: id,
    });
    const journals = await Journal.find({ user_id: req.user.id });
    return res.status(200).json({
      journals: journals,
      message: "Successfully deleted",
    });
  } catch (e) {
    console.log(e);
    return res.status(403).json({
      message: "Failed to delete journal. Try again.",
    });
  }
};

const editJournal = async (req, res) => {
  try {
    const journal = Journal.findOne({_id: req.params.id});
    return res.status(200).json({
      user: req.user,
      journal: journal,
      message: "Successfully retrieved",
    });
  } catch (e) {
    console.log(e);
    return res.status(403).json({
      message: "Failed to retrieve journal. Try again.",
      msg: e,
    });
  }
};

const postEditedJournal = async (req, res) => {
  try {
    var journal = await Journal.findOne({_id: req.params.id});
    var title = sanitize(req.body.title);
    if (title == "") {
      title = journal.title;
    }
    var description = sanitize(req.body.description);
    if (description == "") {
      description = journal.description;
    }

    journal = await Journal.findOneAndUpdate(
      {_id: req.params.id},
      {
        title: title,
        description: description,
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
      message: "Failed to edit journal. Try again.",
    });
  }
};

module.exports.postEditedJournal = postEditedJournal;
module.exports.editJournal = editJournal;
module.exports.deleteJournal = deleteJournal;
module.exports.createNew = createNew;
module.exports.getAll = getAll;
module.exports.createNew = createNew;
