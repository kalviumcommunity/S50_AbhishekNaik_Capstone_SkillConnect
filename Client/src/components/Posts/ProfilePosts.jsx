import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { Button } from "../ui/button";

const ProfilePosts = ({ title, description, imageUrl, videoUrl, user }) => {
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
    <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden mt-6 w-full">
      <div className="p-3 flex items-center">
        <img
          src={user.picture}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.bio}</p>
        </div>
      </div>
      <div className="px-4 py-3">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-gray-700 mb-2">{description}</p>
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
              height={400}
              className="mb-2 rounded-lg"
              style={{ flexBasis: "50%", maxWidth: "45%" }}
            />
          )}
        </div>

        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={handleLike}
            className="text-gray-600 flex items-center mr-3"
          >
            <FaThumbsUp className="mr-1" />
            <span>Like</span>
          </Button>
          <Button
            variant="ghost"
            onClick={handleComment}
            className="text-gray-600 flex items-center mr-3"
          >
            <FaComment className="mr-1" />
            <span>Comment</span>
          </Button>
          <Button
            variant="ghost"
            onClick={handleOptions}
            className="text-gray-600 flex items-center"
          >
            <HiDotsHorizontal className="mr-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePosts;
