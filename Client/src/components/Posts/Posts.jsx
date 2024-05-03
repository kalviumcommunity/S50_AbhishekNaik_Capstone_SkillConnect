import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaComment, FaTrash, FaEdit } from "react-icons/fa";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { motion } from "framer-motion";

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
  });

  const { toast } = useToast();

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const handleLike = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/post/${postId}`,
        { action: "like" },
        {
          withCredentials: true,
        }
      );
      setPost(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleComment = () => {
    setIsCommentModalOpen(true);
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
        // console.log(message);
        toast({
          variant: "destructive",
          title: message,
        });
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
        {
          withCredentials: true,
        }
      );
      setPost(response.data);
      handleCloseEditModal();
      window.location.reload();
    } catch (error) {
      const message = error.response.data.error;
      toast({
        variant: "destructive",
        title: message,
      });
    }
  };

  return (
    <motion.div
      className="bg-gray-100 rounded-lg shadow-md overflow-hidden mt-6"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-3 flex items-center">
        <img
          src={picture}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h2 className="text-lg font-semibold">{createdBy}</h2>
          <p className="text-sm text-gray-600">{bio}</p>
        </div>
      </div>
      <div className="px-4 py-3">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        {expanded ? (
          <pre className="text-wrap">{description}</pre>
        ) : (
          <pre>{description.slice(0, 300)}...</pre>
        )}
        <button
          className="text-blue-500 hover:underline"
          onClick={toggleDescription}
        >
          {expanded ? "See Less" : "See More"}
        </button>
        <div className="flex gap-1">
          {imageUrl &&
            imageUrl.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                className="w-full md:w-1/2 mb-2 rounded-lg"
              />
            ))}
          {videoUrl && (
            <div className="w-full md:w-1/2 mb-2 rounded-lg">
              <iframe
                src={videoUrl}
                allowFullScreen
                className="w-full h-full rounded-lg"
                width="100%" 
                height="100%" 
              />
            </div>
          )}
        </div>
        <div className="flex items-center">
          <Button
            size="lg"
            variant="ghost"
            onClick={handleLike}
            className="text-gray-600 flex items-center mr-3 px-4 py-2"
          >
            <FaThumbsUp className="mr-1" />
            <span>{post.likes} Likes</span>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={handleComment}
            className="text-gray-600 flex items-center mr-3 px-4 py-2"
          >
            <FaComment className="mr-1" />
            <span>Comment</span>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={handleDelete}
            className="text-gray-600 flex items-center mr-3 px-4 py-2"
          >
            <FaTrash className="mr-1" />
            <span>Delete</span>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={handleEdit}
            className="text-gray-600 flex items-center px-4 py-2"
          >
            <FaEdit className="mr-1" />
            <span>Edit</span>
          </Button>
        </div>
      </div>

      {isCommentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-semibold mb-2">Comment Modal</h2>
            <textarea
              placeholder="Write your comment here..."
              className="w-full p-2 border rounded-md resize-none"
              style={{ minWidth: "calc(100% - 2rem)" }}
            ></textarea>
            <div className="mt-2 flex justify-end">
              <Button
                onClick={handleCloseCommentModal}
                className="mr-2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  handleCloseCommentModal();
                }}
              >
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-semibold mb-2">Edit Post</h2>
            <input
              type="text"
              placeholder="Title"
              value={editedPost.title}
              onChange={(e) =>
                setEditedPost({ ...editedPost, title: e.target.value })
              }
              className="w-full p-2 border rounded-md mb-2"
            />
            <textarea
              placeholder="Description"
              value={editedPost.description}
              onChange={(e) =>
                setEditedPost({ ...editedPost, description: e.target.value })
              }
              className="w-full p-2 border rounded-md resize-none mb-2"
              rows="4"
            ></textarea>
            <input
              type="text"
              placeholder="Image URL"
              value={editedPost.imageUrl}
              onChange={(e) =>
                setEditedPost({ ...editedPost, imageUrl: e.target.value })
              }
              className="w-full p-2 border rounded-md mb-2"
            />
            <input
              type="text"
              placeholder="Video URL"
              value={editedPost.videoUrl}
              onChange={(e) =>
                setEditedPost({ ...editedPost, videoUrl: e.target.value })
              }
              className="w-full p-2 border rounded-md mb-2"
            />
            <div className="mt-2 flex justify-end">
              <Button
                onClick={handleCloseEditModal}
                className="mr-2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={handleUpdatePost}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Post;
