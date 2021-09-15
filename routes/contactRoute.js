const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");
const auth = require("../middleware/auth");

// get contacts
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

router.get("/recent", auth.authenticateToken, async (req, res) => {
  try {
    const contacts = await Contact.find({ user_id: req.user.id });
    const sortedContacts = contacts.sort(
      (obj1, obj2) => new Date(obj2.createdOn) - new Date(obj1.createdOn)
    );
    return res
      .status(200)
      .json({ contacts: sortedContacts.slice(0, 9), message: "Successfully retrieved" });
  } catch (e) {
    return res.status(401).json({ message: "No user" });
  }
});

// get contact profile
router.get("/:id", auth.authenticateToken, async (req, res) => {
  const contact = Contact.findById(req.params.id);
  contact
      .then(() => res.json(contact))
      .catch((err) => next(err));
});

// create new contact
router.post("/create", auth.authenticateToken, async (req, res) => {
  try {
    const contact = new Contact({
      full_name: req.full_name,
      preferred_name: req.preferred_name,
      birthday: req.birthday,
      relationship: req.relationship,
      tags: req.tags,
      meeting_notes: req.meeting_notes,
      description: req.description,
      email: req.email,
      phone_number: req.phone_number,
      linkedin: req.linkedin,
      twitter: req.twitter
    });
    await contact.save();
    return res.status(200).json({ message: "Successfully added" });
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "Failed to add contact. Try again." });
  }
});

// delete contact
router.get("/delete/:id", auth.authenticateToken, async (req,res) => {
  try {
      const contact = await Contact.findOneAndDelete({_id: req.params.id })
      .exec();
      return res.status(200).json({ message: "Successfully deleted" });
  } catch (e) {
      console.log(e);
      return res.status(403).json({ message: "Failed to delete contact. Try again." });
  }
});

// edit contact
router.post("/edit/:id", auth.authenticateToken, async(req,res) => {
  try {
      const contact = Contact.findById(req.params.id);
      return res.status(200).json({ message: "Successfully edited" });
  } catch (e) {
      console.log(e);
      return res.status(403).json({ message: "Failed to edit contact. Try again." });
  }
});

module.exports = router;
