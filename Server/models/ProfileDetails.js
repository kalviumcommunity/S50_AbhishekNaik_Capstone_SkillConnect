const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  id: String,
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
