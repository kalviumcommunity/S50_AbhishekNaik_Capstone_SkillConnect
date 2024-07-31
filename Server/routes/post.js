const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  deletePostById,
  updatePostById,
  makeComment,
} = require("../controllers/postControllers");
const validatePostData = require("../middleware/validatePostData");
const validateEditPostData = require("../middleware/validateEditPostData");

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", validatePostData, createPost);
router.delete("/:id", deletePostById);
router.patch("/:id", validateEditPostData, updatePostById);
router.put("/:id", validateEditPostData, updatePostById);
router.post("/:id/comments", makeComment);

module.exports = router;
