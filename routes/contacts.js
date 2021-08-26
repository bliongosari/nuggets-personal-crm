const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");
const auth = require("../middleware/auth");

router.get("/all", auth.authenticateToken, async (req, res) => {
  try {
    const contacts = await Contact.find({ user_id: req.user.id });
    return res
      .status(200)
      .json({ contacts: contacts, message: "Successfully retrieved" });
  } catch (e) {
    return res.status(401).json({ message: "No user" });
  }
});

router.post("/add", auth.authenticateToken, async (req, res) => {
  try {
    const newContact = new Contact({
      user_id: req.user.id,
      full_name: req.body.full_name,
      preferred_name: req.body.preferred_name,
      birthday: req.body.birthday,
    });
    await newContact.save();
    return res.status(200).json({ message: "Successfully added" });
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "Failed to add user. Try again." });
  }
});

module.exports = router;
