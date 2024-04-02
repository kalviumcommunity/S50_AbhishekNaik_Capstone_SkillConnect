const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  videoUrl: String,
  comments: {
    type: Array,
    default: [],
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: String,
  createdByID: String,
  picture: String,
  bio: String,
});

module.exports = mongoose.model("Post", postSchema);
