const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: String,
  picture: String,
  email: String,
  bio: String,
  description: String,
  skills: [String],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

module.exports = mongoose.model("Profile", profileSchema);
