const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  event_name: {
    type: String,
    required: true,
  },
  location: {
    type: [Number],
  },
  type: {
    type: String,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
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
    type: String,
    enum: [
      "None",
      "At time of event",
      "5 minutes before",
      "10 minutes before",
      "15 minutes before",
      "20 minutes before",
      "1 hour before",
      "2 hours before",
      "1 day before",
      "2 days before",
      "1 week before",
    ],
    default: "None",
  },
  notes: {
    type: String,
  },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
