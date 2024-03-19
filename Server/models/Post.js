const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: String,
  caption: String,
  image: String,
  video: String,
  comments: {
    type: Array,
    default: [],
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  created_at: Date.now(),
});

module.exports = mongoose.model("Post", postSchema);
