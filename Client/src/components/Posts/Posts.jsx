import React, { useEffect, useState } from "react";
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
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };
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
        <div
          className="grid gap-10"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Post Media"
              className="w-1/2 mb-2 rounded-lg"
              style={{ flexBasis: "50%", maxWidth: "45%" }}
            />
          )}
          {videoUrl && (
            <iframe
              src={videoUrl}
              allowFullScreen
              className="mb-2 rounded-lg"
              style={{ flexBasis: "50%", maxWidth: "45%" }}
            />
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
            <span>Like</span>
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
