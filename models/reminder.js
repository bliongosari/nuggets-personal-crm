   
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reminderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  belongs_to: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  full_name: {
      type: String,
      required: true,
  },
  alert: {
    type: Date,
    required: true,
  },
  notification_deleted: {
    type: Boolean,
    default: false
  },
  notification_opened: {
    type: Boolean,
    default: false
  },
});

const Reminder = mongoose.model("Reminder", reminderSchema);
module.exports = Reminder;