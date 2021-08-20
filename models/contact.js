const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  email: {
    type: String,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
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
    type: [Tag],
  },
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
