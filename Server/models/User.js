const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  }
});

module.exports = mongoose.model("User", userSchema);
