const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Tag = require("./tag");

const lifeeventSchema = new Schema({
  category: {
    type: String,
  },
  date: {
    type: Date,
  },
  title: {
    type: String,
  },
  story: {
    type: String,
  },
  notes: {
    type: String,
  },
});

const reminderSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  repeat: {
    type: String,
  },
});

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
  tags: {
    type: String,
  },
  relationship: {
    type: String,
  },
  meeting_notes: {
    type: String,
  },
  description: {
    type: String,
  },
  alert: {
    type: Number,
  },
  email: {
    type: String,
  },
  phone_number: {
    type: Number,
  },
  notification_deleted: {
    type: Boolean,
    default: false
  },
  linkedin: {
    type: String,
  },
  twitter: {
    type: String,
  },
  lifeevents: [lifeeventSchema],
  reminders: [reminderSchema],
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;