const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");
const Reminder = require("../models/reminder");
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

// add new contact
router.post("/add", auth.authenticateToken, async (req, res) => {
  try {
    const contact = new Contact({
      user_id: req.user.id,
      full_name: req.body.full_name,
      preferred_name: req.body.preferred_name,
      birthday: req.body.birthday,
      relationship: req.body.relationship,
      tags: renderTags(req.body.tags),
      meeting_notes: req.body.meeting_notes,
      description: req.body.description,
      email: req.body.email,
      phone_number: req.body.phone_number,
      linkedin: req.body.linkedin,
      twitter: req.body.twitter,
      lifeevents: [],
      reminders: [],
      tasks: [],
      conversations: [],
    });
    await contact.save();
    return res.status(200).json({ message: "Successfully added" });
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "Failed to add contact. Try again." });
  }
});

router.post("/addReminder", auth.authenticateToken, async (req, res) => {
  try {
    const contact = await Contact.findById(req.body.userID);
    const reminder = new Reminder({
      user_id: req.body.userID,
      alert: new Date(req.body.alert),
      full_name: contact.full_name,
      belongs_to: req.user.id
    });
    await reminder.save();
    return res.status(200).json({ message: "Successfully added" });
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "Failed to add reminder. Try again." });
  }
});

// delete contact
router.delete("/delete/:id", auth.authenticateToken, async (req,res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    await Reminder.deleteMany({ user_id: contact._id });
    await Contact.deleteOne(contact);
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "Failed to delete contact. Try again." });
  }
});

const renderTags = (tags) => {
  let result = ""
  for (var i=0; i< tags.length; i++) {
    if (i !== 0){
      result += "," + tags[i].name 
    }
    else {
      result += tags[i].name
    }
  }
  return result;
}

// edit contact
router.put("/edit/:id", auth.authenticateToken, async(req, res) => {
  try {
    req.body.tags = renderTags(req.body.tags);
    const contact = await Contact.findById(req.params.id);
    Object.keys(req.body).forEach((key) => {contact[key] = req.body[key]})
    await contact.save();
    return res.status(200).json({ message: "Successfully edited" });
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "Failed to edit contact. Try again." });
  }
});


router.post('/delete-notif/:id', auth.authenticateToken, async(req, res) => {
  console.log("yes");
  try {
    var eventQueried = await Reminder.findOne({ _id: req.params.id });
    if ((req.user.id == eventQueried.belongs_to)) {
      const event = await Reminder.findOneAndDelete({ _id: req.params.id });
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
});

router.post('/open-notif/:id', auth.authenticateToken, async(req, res) => {
  try {
    // console.log(req.params.id);
    // var eventID = sanitize(req.params.id);
    // console.log(eventID);
    // console.log("yes");
    const edited = await Reminder.findOneAndUpdate(
      {_id: req.params.id},
      {
        notification_opened: true
      }
    );
    //console.log(edited);
    return res.status(200).json({
      message: "Successfully opened",
    });
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: "No user" });
  }
});


module.exports = router;
