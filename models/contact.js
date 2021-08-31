const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Tag = require("./tag");

const contactSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  preferred_name: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  tags:
    [{type: Schema.ObjectId, ref: 'Tag'}],
  meeting_notes: {
    type: String,
  },
  description: {
    type: String,
  },
  email: {
    type: String,
  },
  phone_number: {
    type: Number,
  },
  linkedin: {
    type: String,
  },
  twitter: {
    type: String,
  },
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
