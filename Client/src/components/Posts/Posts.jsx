import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaComment, FaTrash, FaEdit } from "react-icons/fa";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { jwtDecode } from "jwt-decode";

const Post = ({
  title,
  description,
  imageUrl,
  videoUrl,
  createdBy,
  picture,
  bio,
  postId,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedPost, setEditedPost] = useState({
    title,
    description,
    imageUrl,
    videoUrl,
  });
  const [post, setPost] = useState({
    title,
    description,
    imageUrl,
    videoUrl,
    createdBy,
    picture,
    bio,
    likes: 0,
    comments: [],
  });
  console.log("post", post);
  const [newComment, setNewComment] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/post/${postId}`,
          { withCredentials: true }
        );
        setPost((prev) => ({ ...prev, comments: response.data }));
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchComments();
  }, [postId]);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const handleLike = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/post/${postId}`,
        { action: "like" },
        { withCredentials: true }
      );
      setPost(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleComment = async () => {
    if (!newComment) {
      toast({ variant: "destructive", title: "Comment cannot be empty" });
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/post/${postId}/comments`,
        { text: newComment },
        { withCredentials: true }
      );
      setPost(response.data);
      setNewComment("");
      setIsCommentModalOpen(false);
    } catch (error) {
      const message = error.response.data.error;
      toast({ variant: "destructive", title: message });
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/post/${postId}`, {
          withCredentials: true,
        });
        window.location.reload();
      } catch (error) {
        const message = error.response.data.error;
        toast({ variant: "destructive", title: message });
      }
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdatePost = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/post/${postId}`,
        editedPost,
        { withCredentials: true }
      );
      setPost(response.data);
      handleCloseEditModal();
      window.location.reload();
    } catch (error) {
      const message = error.response.data.error;
      toast({ variant: "destructive", title: message });
    }
  };

  return (
    <motion.div
      className="bg-black text-white rounded-lg shadow-md overflow-hidden mt-6 mx-auto w-full max-w-xl"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-4 py-2 flex items-center">
        <img
          src={picture}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h2 className="text-lg font-semibold">{createdBy}</h2>
          <p className="text-sm text-gray-400">{bio}</p>
        </div>
      </div>
      <div className="px-4 py-3">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        {expanded ? (
          <pre className="whitespace-pre-wrap">{description}</pre>
        ) : (
          <pre className="whitespace-pre-wrap">
            {description.slice(0, 300)}...
          </pre>
        )}
        <button
          className="text-blue-400 hover:underline"
          onClick={toggleDescription}
        >
          {expanded ? "See Less" : "See More"}
        </button>

        <div className="flex flex-col gap-4 p-4 bg-black rounded-lg shadow-lg">
          {/* Carousel for images */}
          {imageUrl && imageUrl.length > 0 && (
            <Carousel showThumbs={false} infiniteLoop useKeyboardArrows>
              {imageUrl.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Image ${index}`}
                    className="w-full h-auto rounded-lg object-cover shadow-md"
                  />
                </div>
              ))}
            </Carousel>
          )}

          {/* Video iframe */}
          {videoUrl && (
            <div className="w-full h-60 md:h-80 bg-black rounded-lg overflow-hidden shadow-md">
              <iframe
                src={videoUrl}
                allowFullScreen
                className="w-full h-full"
                frameBorder="0"
              />
            </div>
          )}
        </div>

        <div className="flex items-center mt-4">
          <Button
            size="lg"
            variant="ghost"
            onClick={handleLike}
            className="text-gray-400 flex items-center mr-3 px-4 py-2"
          >
            <FaThumbsUp className="mr-1" />
            <span>{post.likes} Likes</span>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={() => setIsCommentModalOpen(true)}
            className="text-gray-400 flex items-center mr-3 px-4 py-2"
          >
            <FaComment className="mr-1" />
            <span>Comment</span>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={handleEdit}
            className="text-gray-400 flex items-center mr-3 px-4 py-2"
          >
            <FaEdit className="mr-1" />
            <span>Edit</span>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={handleDelete}
            className="text-gray-400 flex items-center px-4 py-2"
          >
            <FaTrash className="mr-1" />
            <span>Delete</span>
          </Button>
        </div>
      </div>
      {isCommentModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black p-4 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add Comment</h2>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="4"
              className="w-full border-black border rounded-lg p-2 mb-4 bg-black text-white"
            />
            <Button
              size="lg"
              onClick={handleComment}
              className="bg-blue-500 text-white"
            >
              Add Comment
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleCloseCommentModal}
              className="ml-2 text-gray-400"
            >
              Cancel
            </Button>
            <h3 className="text-lg font-semibold mt-4">Comments:</h3>
            {post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment._id} className="border-t border-black pt-2">
                  <p className="text-sm">{comment.text}</p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black p-4 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
            <input
              type="text"
              value={editedPost.title}
              onChange={(e) =>
                setEditedPost({ ...editedPost, title: e.target.value })
              }
              className="w-full border-black border rounded-lg p-2 mb-4 bg-black text-white"
              placeholder="Title"
            />
            <textarea
              value={editedPost.description}
              onChange={(e) =>
                setEditedPost({ ...editedPost, description: e.target.value })
              }
              rows="4"
              className="w-full border-black border rounded-lg p-2 mb-4 bg-black text-white"
              placeholder="Description"
            />
            <input
              type="text"
              value={editedPost.videoUrl}
              onChange={(e) =>
                setEditedPost({ ...editedPost, videoUrl: e.target.value })
              }
              className="w-full border-black border rounded-lg p-2 mb-4 bg-black text-white"
              placeholder="Video URL"
            />
            <Button
              size="lg"
              onClick={handleUpdatePost}
              className="bg-blue-500 text-white"
            >
              Update Post
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleCloseEditModal}
              className="ml-2 text-gray-400"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Post;
