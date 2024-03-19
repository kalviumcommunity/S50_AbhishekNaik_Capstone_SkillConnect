import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../Home Page/Navbar";
import Sidebar from "../Home Page/Sidebar";
import ProfileInfo from "./ProfileInfo";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const handleRedirect = () => {
    navigate("/homepage");
  };

  // Dummy user data for demonstration
  const [user, setUser] = useState({
    name: "John",
    email: "",
    bio: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro necessitatibus nisi atque enim, quas sequi, amet saepe illum magni modi ratione aut, rem placeat odit itaque quis reiciendis cum ullam?",
    avatar: "",
    skills: [
      "React JS",
      "Node JS",
      "MongoDB",
      "Express JS",
      "HTML",
      "CSS",
      "JavaScript",
    ],
  });
  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar onLogout={handleLogout} />
        <div className="w-full px-8 py-6">
          <ProfileInfo user={user} />
        </div>
      </div>
      <img
        onClick={handleRedirect}
        src="site-logo.png"
        alt="Skill Connect"
        className="absolute top-0 left-0 p-4"
        style={{
          filter:
            "brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(175deg)",
        }}
      />
    </div>
  );
};

export default ProfilePage;
