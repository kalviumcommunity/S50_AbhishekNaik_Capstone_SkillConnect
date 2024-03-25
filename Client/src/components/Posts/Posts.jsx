import React from "react";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { Button } from "../ui/button";

const Post = ({ title, description, imageUrl, videoUrl }) => {
  // Dummy functions for like and comment actions
  const handleLike = () => {
    console.log("Liked!");
  };

  const handleComment = () => {
    console.log("Commented!");
  };

  const handleOptions = () => {
    console.log("Options clicked!");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-700 mb-4">{description}</p>
          {imageUrl && (
            <img src={imageUrl} alt="Post Media" className="max-w-full" />
          )}
          {videoUrl && (
            <iframe src={videoUrl} allowFullScreen width={500} height={300} />
          )}
        </div>
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={handleLike}
            className="bg-blue-200 hover:bg-blue-800 text-blue-500 font-bold py-1 px-2 rounded flex items-center mr-2"
          >
            <FaThumbsUp className="mr-1 text-sm" />
            <span className="text-sm">Like</span>
          </Button>
          <Button
            variant="ghost"
            onClick={handleComment}
            className="bg-green-200 hover:bg-green-800 text-green-500 font-bold py-1 px-2 rounded flex items-center mr-2"
          >
            <FaComment className="mr-1 text-sm" />
            <span className="text-sm">Comment</span>
          </Button>
          <Button
            variant="ghost"
            onClick={handleOptions}
            className="bg-gray-200 hover:bg-gray-500 text-gray-800 font-bold py-1 px-2 rounded flex items-center"
          >
            <HiDotsHorizontal className="mr-1 text-sm" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Post;
