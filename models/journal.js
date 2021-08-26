const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const journalSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  files: {
    type: [{}],
  },
});

const Journal = mongoose.model("Journal", journalSchema);
module.exports = Journal;
