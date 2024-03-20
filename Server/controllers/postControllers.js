const Post = require("../models/Post");
const { validationResult } = require("express-validator");
const Profile = require("../models/ProfileDetails");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.status(500).send("500-Server Error");
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.send(post);
  } catch (error) {
    res.status(500).send("500-Server Error");
  }
};

exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      mediaUrl: req.body.mediaUrl,
    });
    const result = await newPost.save();
    await Profile.findOneAndUpdate(
      { id: req.body.id },
      { $push: { posts: result._id } },
      { new: true },
    )
      .populate("posts")
      .exec();

    res.send(result);
  } catch (error) {
    res.status(500).send("500-Server Error");
  }
};

exports.deletePostById = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).send("404-Post not found");
    }
    res.send(deletedPost);
  } catch (error) {
    res.status(500).send("500-Server Error");
  }
};

exports.updatePostById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPost) {
      return res.status(404).send("404-Post not found");
    }
    res.send(updatedPost);
  } catch (error) {
    res.status(500).send("500-Server Error");
  }
};
