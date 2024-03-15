import React, { useState } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { FaEnvelope } from "react-icons/fa";

const Sidebar = ({ onLogout }) => {
  const [expanded, setExpanded] = useState(false);

  const handleMouseEnter = () => setExpanded(true);
  const handleMouseLeave = () => setExpanded(false);

  const renderButton = (onClick, text, bgColor) => {
    return (
      <button
        onClick={onClick}
        className={`${
          expanded ? `bg-${bgColor}-500 hover:bg-${bgColor}-700` : "text-white"
        } font-bold py-2 px-4 rounded w-full mb-4 focus:outline-none focus:ring-2 ${
          expanded ? `focus:ring-${bgColor}-500` : ""
        }`}
      >
        {text}
      </button>
    );
  };

  const renderIcon = (onClick, IconComponent) => {
    return (
      <IconComponent
        onClick={onClick}
        className={`text-white cursor-pointer mb-4`}
        size={24}
      />
    );
  };

  return (
    <div
      className={`bg-gray-400 text-white h-screen p-4 transition-all duration-300 ${
        expanded ? "w-64" : "w-16"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mb-8">
        {/* Profile Button */}
        {expanded
          ? renderButton(
              () => console.log("Profile button clicked"),
              "Profile",
              "red"
            )
          : renderIcon(
              () => console.log("Profile button clicked"),
              AiOutlineUser
            )}

        {/* Messages Button */}
        {expanded
          ? renderButton(
              () => console.log("Messages button clicked"),
              "Messages",
              "red"
            )
          : renderIcon(
              () => console.log("Messages button clicked"),
              FaEnvelope
            )}

        {/* Logout Button */}
        {expanded
          ? renderButton(onLogout, "Logout", "red")
          : renderIcon(onLogout, RiLogoutBoxLine)}
      </div>
    </div>
  );
};

export default Sidebar;
