import React from "react";
import PostButton from "./PostButton";

const Navbar = () => {
  const handlePost = () => {
    // console.log("Post button clicked!");
  };

  return (
    <nav className="bg-gray-900 p-6">
      <div className="flex justify-between items-center">
        <div></div>
        <PostButton onClick={handlePost} />
      </div>
    </nav>
  );
};

export default Navbar;
