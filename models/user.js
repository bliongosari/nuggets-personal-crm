const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  preferred_name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
}
});

userSchema.methods.generateVerificationToken = function () {
  const user = this;
  const verificationToken = jwt.sign(
      { ID: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
  );
  return verificationToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
