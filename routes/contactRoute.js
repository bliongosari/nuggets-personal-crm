const express = require("express");
const passport = require("passport");
const { Contact } = require("../models/Contact");
const router = express.Router();

// show contacts
router.get("/", async (req, res) => {
    const contacts = Contact.find();
    contact
        .then(contact=> {
            res.json(contact)
        }).catch(err=>{
            console.log(err)
        });
});

// show contact profile
 router.get("/:id", async (req, res) => {
    const contact = Contact.findById(req.params.id);
    contact
        .then(() => res.json(contact))
        .catch((err) => next(err));
});

// create new contact
router.post("/create", async (req, res) => {
  const contact = new Contact({
      full_name: req.full_name,
      preferred_name: req.preferred_name,
      birthday: req.birthday,
      relationship: req.relationship,
      tags: req.tags,
      meeting_notes: req.how_we_met,
      description: req.description,
      email: req.email,
      phone_number: req.phone_number,
      linkedin: req.linkedin,
      twitter: req.twitter})

  contact.save()
    .then(() => res.json(contact))
    .catch((err) => next(err));
});

//delete contact
router.delete("/delete/:id", async (req,res) => {
    Contact.findOneAndDelete({_id: req.params.id })
        .exec()
        .then((contact) => res.json())
        .catch((err) => next(err));
});

//edit contact
router.post("/edit/:id", async(req,res) => {
    const contact = Contact.findById(req.params.id);
});

module.exports = router;
