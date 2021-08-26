const express = require("express");
const passport = require("passport");
const Journal = require("../models/journal");
const router = express.Router();

// show journals
router.get("/", async (req, res) => {
    Journal.find()
        .then(journal=> {
            res.json(journal)
        }).catch(err=>{
            console.log(err)
        });
});

// create a new journal
router.post("/create", async (req, res) => {
    const journal = new Journal({
        title: req.title,
        description: req. description,
        files: req.files,
    })
  
    journal.save()
      .then(() => res.json(journal))
      .catch((err) => next(err));
});

//delete journal
router.delete("/delete/:id", async (req,res) => {
    Journal.findOneAndDelete({_id: req.params.id })
        .exec()
        .then((journal) => res.json())
        .catch((err) => next(err));
});

//edit journal
router.post("/edit/:id", async(req,res) => {
    const journal = Journal.findById(req.params.id);
});

module.exports = router;