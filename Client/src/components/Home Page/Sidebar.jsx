import React, { useState } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { FaEnvelope } from "react-icons/fa";
import { Button } from "../ui/button";

const Sidebar = ({ onLogout }) => {
  const [expanded, setExpanded] = useState(false);

  const handleMouseEnter = () => setExpanded(true);
  const handleMouseLeave = () => setExpanded(false);

  const renderButton = (onClick, text, bgColor) => {
    return (
      <Button
        variant="ghost"
        onClick={onClick}
        className={`${
          expanded ? `bg-${bgColor}-500 hover:bg-${bgColor}-700` : "text-white"
        } font-bold mt-8 py-2 px-4 rounded w-full mb-4 focus:outline-none focus:ring-2 ${
          expanded ? `focus:ring-${bgColor}-500` : ""
        }`}
        style={{ transition: "background-color 0.3s" }}
      >
        {text}
      </Button>
    );
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
      className={`bg-gray-900 text-white h-screen p-4 transition-all duration-300 ${
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
              "blue"
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
              "blue"
            )
          : renderIcon(
              () => console.log("Messages button clicked"),
              FaEnvelope
            )}

        {/* Logout Button */}
        <div style={{ position: "absolute", bottom: 0 }}>
          {expanded
            ? renderButton(onLogout, "Logout", "red")
            : renderIcon(onLogout, RiLogoutBoxLine)}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
