import React, { useState } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { FaEnvelope } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import PostModal from "../components/Posts/PostModal"; // Import the PostModal component
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onLogout }) => {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control the modal

  const handleMouseEnter = () => setExpanded(true);
  const handleMouseLeave = () => setExpanded(false);

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/profile");
  };

  const handlePost = () => {
    // Handle post button click
    setShowModal(true); // Show the modal
  };

  const handleModalClose = () => {
    setShowModal(false); // Close the modal
  };

  const renderIcon = (onClick, IconComponent) => {
    return (
      <IconComponent
        onClick={onClick}
        className={`text-white cursor-pointer mb-4 mt-8`}
        size={24}
        style={{ transition: "color 0.5s" }}
      />
    );
  };

  return (
    <div
      className={`bg-gray-900 sticky text-white h-screen p-4 transition-all duration-300 ${
        expanded ? "w-64" : "w-16"
      } fixed left-0 top-0 bottom-0 z-10`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mb-8">
        {/* Profile Button */}
        {expanded
          ? (
            <button
              onClick={handleRedirect}
              className="text-white font-bold mt-8 py-2 px-4 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-500 hover:bg-blue-700"
              style={{ transition: "background-color 0.3s" }}
            >
              Profile
            </button>
          )
          : renderIcon(handleRedirect, AiOutlineUser)}

        {/* Messages Button */}
        {expanded
          ? (
            <button
              onClick={() => console.log("Messages button clicked")}
              className="text-white font-bold mt-8 py-2 px-4 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-500 hover:bg-blue-700"
              style={{ transition: "background-color 0.3s" }}
            >
              Messages
            </button>
          )
          : renderIcon(() => console.log("Messages button clicked"), FaEnvelope)}

        {/* Post Button */}
        {expanded
          ? (
            <button
              onClick={handlePost}
              className="text-white font-bold mt-8 py-2 px-4 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-500 hover:bg-blue-700"
              style={{ transition: "background-color 0.3s" }}
            >
              Add Post
            </button>
          )
          : renderIcon(handlePost, MdLibraryAdd)}

        {/* Logout Button */}
        <div style={{ position: "absolute", bottom: 0 }}>
          {expanded
            ? (
              <button
                onClick={onLogout}
                className="text-white font-bold mt-8 py-2 px-4 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-red-500 bg-red-500 hover:bg-red-700"
                style={{ transition: "background-color 0.3s" }}
              >
                Logout
              </button>
            )
            : renderIcon(onLogout, RiLogoutBoxLine)}
        </div>
      </div>

      {/* Render the PostModal if showModal state is true */}
      {showModal && <PostModal onClose={handleModalClose} />}
    </div>
  );
};

export default Sidebar;
