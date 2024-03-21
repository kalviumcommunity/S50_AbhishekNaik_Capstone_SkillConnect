import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Navbar from "../../utils/Navbar";
import Sidebar from "../../utils/Sidebar";
import ProfileInfo from "./ProfileInfo";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const handleRedirect = () => {
    navigate("/homepage");
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
    picture: "",
    skills: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      fetch("http://localhost:3000/user")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const userDetails = data[0].profile;
          // console.log(data[0].profile);
          setUser(userDetails);
          // localStorage.setItem('token', token);
        })
        // .then(()=>{
        // })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log("gdgd", user);
  // }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar />
      <div className="flex">
        <Sidebar onLogout={handleLogout} />
        <motion.div
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="w-full px-8 py-6"
        >
          <ProfileInfo user={user} />
        </motion.div>
      </div>
      <motion.img
        onClick={handleRedirect}
        src="site-logo.png"
        alt="Skill Connect"
        className="absolute top-0 left-0 p-4"
        style={{
          filter:
            "brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(175deg)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
};

export default ProfilePage;
