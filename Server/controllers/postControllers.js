const Post = require("../models/Post");
const { validationResult } = require("express-validator");
const Profile = require("../models/ProfileDetails");

const handleError = (res, statusCode, message) => {
  res.status(statusCode).send({ error: message });
};

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

const extractVideoId = (videoLink) => {
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = videoLink.match(youtubeRegex);
  return match?.[1];
};

const getEmbeddedVideoUrl = (videoLink) => {
  if (videoLink.includes("youtu.be")) {
    const videoId = extractVideoId(videoLink);
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  return videoLink;
};

exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let videoUrl = req.body.videoUrl;
    if (videoUrl) {
      videoUrl = getEmbeddedVideoUrl(videoUrl);
    }
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      videoUrl: videoUrl,
      createdBy: req.user.name,
      createdByID: req.user._id,
      picture: req.user.picture,
      bio: req.user.bio,
    });
    const result = await newPost.save();
    await Profile.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { posts: result._id } },
      { new: true }
    )
      .populate("posts")
      .exec();
    // console.log(result);
    res.send(result);
  } catch (error) {
    handleError(res, 500, "Server Error");
  }
};
// console.log(req.user._id);
// console.log(req.user._id.toString());

exports.deletePostById = async (req, res) => {
  try {
    const deletedPost = await Post.findById(req.params.id);
    // console.log("deletedPost", deletedPost.createdByID);
    // console.log("req.user._id", req.user._id);
    if (!deletedPost) {
      return handleError(res, 404, "Post not found");
    }
    const userID = req.user._id.toString();
    const deleteID = deletedPost.createdByID.toString();
    // console.log("userID", userID);
    if (deleteID !== userID) {
      return handleError(
        res,
        403,
        "Unauthorized: You are not allowed to delete this post"
      );
    }
    // await deletedPost.remove();
    await deletedPost.deleteOne();
    // console.log("Hitting here");
    res.send({ message: "Post deleted successfully" });
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
    const postId = req.params.id;
    const updatedFields = req.body;

    // Check if the request includes a 'like' action
    if (updatedFields.action === "like") {
      // Increment the 'likes' count for the post
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $inc: { likes: 1 } },
        { new: true }
      );
      return res.json(updatedPost);
    }

    const post = await Post.findById(postId);
    if (!post) {
      return handleError(res, 404, "Post not found");
    }

    const userID = req.user._id.toString();
    const postCreatorID = post.createdByID.toString();

    if (postCreatorID !== userID) {
      return handleError(
        res,
        403,
        "Unauthorized: You are not allowed to update this post"
      );
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, updatedFields, {
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

exports.makeComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const postId = req.params.id;
    const { text } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return handleError(res, 404, "Post not found");
    }

    const comment = {
      text: text,
      commentedBy: req.user._id,
      commentedAt: Date.now(),
    };

    post.comments.push(comment);
    await post.save();

    res.send(post);
  } catch (error) {
    handleError(res, 500, "Server Error");
  }
};
