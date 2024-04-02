import React, { useState } from "react";
import { FaThumbsUp, FaComment, FaTrash, FaEdit } from "react-icons/fa";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
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

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const { toast } = useToast();

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
      console.error(error);
    }
  };

  const handleComment = () => {
    setIsCommentModalOpen(true);
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:3000/post/${postId}`, {
          withCredentials: true,
        });
        console.log(response.data);
        window.location.reload();
      } catch (error) {
        const message = error.response.data.error;
        console.log(message);
        toast({
          variant: "destructive",
          title: message,
        });
      }
    }
  };

  const handleEdit = () => {
    console.log("Edit clicked!");
  };

  return (
    <motion.div
      className="bg-gray-100 rounded-lg shadow-md overflow-hidden mt-6"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="p-3 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.img
          src={picture}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-3"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <div>
          <h2 className="text-lg font-semibold">{createdBy}</h2>
          <p className="text-sm text-gray-600">{bio}</p>
        </div>
      </motion.div>
      <motion.div
        className="px-4 py-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-semibold mb-1">{post.title}</h2>
        <p>{post.description}</p>
        <motion.div
          className="flex flex-wrap items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            size="lg"
            variant="ghost"
            onClick={handleLike}
            className="text-gray-600 flex items-center mr-3 mb-2 lg:mb-0 lg:mr-4 px-4 py-2"
          >
            <FaThumbsUp className="mr-1" />
            <span>{post.likes} Likes</span>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={handleComment}
            className="text-gray-600 flex items-center mr-3 mb-2 lg:mb-0 lg:mr-4 px-4 py-2"
          >
            <FaComment className="mr-1" />
            <span>Comment</span>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={handleDelete}
            className="text-gray-600 flex items-center mr-3 mb-2 lg:mb-0 lg:mr-4 px-4 py-2"
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
        </motion.div>
      </motion.div>
      {isCommentModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white p-6 rounded-md w-96"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
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
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Post;
