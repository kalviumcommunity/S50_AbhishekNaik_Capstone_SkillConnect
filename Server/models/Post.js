const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: [String],
  videoUrl: String,
  comments: [{
    text: String,
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile"
    },
    commentedAt: {
      type: Date,
      default: Date.now,
    }
  }],
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: String,
  createdByID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  picture: String,
  bio: String,
});

module.exports = mongoose.model("Post", postSchema);
