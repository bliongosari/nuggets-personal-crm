const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: [Number],
  },
  type: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  repeat: {
    type: String,
    enum: [
      "Never",
      "Every Day",
      "Every Week",
      "Every Fortnight",
      "Every Month",
      "Every Year",
    ],
    default: "Never",
  },
  end_repeat: {
    type: Date,
  },
  alert: {
    type: Date,
  },
  notification_deleted: {
    type: Boolean,
    default: false
  },
  notification_opened: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
  },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
