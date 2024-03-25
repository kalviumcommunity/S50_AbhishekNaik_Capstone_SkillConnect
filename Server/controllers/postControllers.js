const Post = require("../models/Post");
const { validationResult } = require("express-validator");
const Profile = require("../models/ProfileDetails");
const handleError = require("../utils/handleError ");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    // console.log(posts);
    res.send(posts);
  } catch (error) {
    handleError(res, 500, "Server Error");
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return handleError(res, 404, "Post not found");
    }
    res.send(post);
  } catch (error) {
    handleError(res, 500, "Server Error");
  }
};

exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // console.log("rb", req.body);
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      videoUrl: req.body.videoUrl,
    });
    // console.log(newPost);
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
    handleError(res, 500, "Server Error");
  }
};

exports.deletePostById = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return handleError(res, 404, "Post not found");
    }
    res.send(deletedPost);
  } catch (error) {
    handleError(res, 500, "Server Error");
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
      return handleError(res, 404, "Post not found");
    }
    res.send(updatedPost);
  } catch (error) {
    handleError(res, 500, "Server Error");
  }
};
