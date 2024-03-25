import React from "react";
import { FaThumbsUp, FaComment } from "react-icons/fa";

const Post = ({ title, description }) => {
  // Dummy functions for like and comment actions
  const handleLike = () => {
    // Add logic for like action
    console.log("Liked!");
  };

  const handleComment = () => {
    // Add logic for comment action
    console.log("Commented!");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        {/* Like Button */}
        <button
          onClick={handleLike}
          className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold py-1 px-2 rounded flex items-center mr-2"
        >
          <FaThumbsUp className="mr-1 text-sm" />
          <span className="text-sm">Like</span>
        </button>
        {/* Comment Button */}
        <button
          onClick={handleComment}
          className="bg-green-200 hover:bg-green-300 text-green-800 font-bold py-1 px-2 rounded flex items-center"
        >
          <FaComment className="mr-1 text-sm" />
          <span className="text-sm">Comment</span>
        </button>
        {/* {imageUrl && (
          <img src={imageUrl} alt="Post Image" className="w-full mb-4" />
        )}
        {videoUrl && (
          <div className="w-full mb-4">
            <iframe
              title="Post Video"
              src={videoUrl}
              frameBorder="0"
              allowFullScreen
              className="w-full"
            ></iframe>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Post;
