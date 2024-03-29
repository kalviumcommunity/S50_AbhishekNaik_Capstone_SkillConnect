import React, { useState } from "react";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { Button } from "../ui/button";
import axios from "axios";

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

  const handleLike = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/post/${postId}`, { action: 'like' }, {
        withCredentials: true,
      });
      setPost(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = () => {
    console.log("Commented!");
  };

  const handleOptions = () => {
    console.log("Options clicked!");
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden mt-6">
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
        <h2 className="text-lg font-semibold mb-1">{post.title}</h2>
        <p>{post.description}</p>
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
            onClick={handleOptions}
            className="text-gray-600 flex items-center px-4 py-2"
          >
            <HiDotsHorizontal className="mr-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Post;
