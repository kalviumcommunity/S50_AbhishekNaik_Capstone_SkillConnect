import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProfilePosts from "../Posts/ProfilePosts";
import Navbar from "../../utils/Navbar";
import Sidebar from "../../utils/Sidebar";
import ProfileInfo from "./ProfileInfo";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // console.log("Logout clicked");
    axios
      .post(
        "http://localhost:3000/user/logout",
        { h: "h" },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
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

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = document.cookie;
        // console.log("token", token);

        const response = await axios.post(
          "http://localhost:3000/user/getsingle",
          {},
          {
            withCredentials: true,
          },
        );

        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        const data = response.data.user.profile;
        const userposts = response.data.user.profile.posts;
        // console.log("data", data);
        // console.log("userposts", userposts);
        setUser(data);
        setPosts(userposts);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  // console.log("user", user);

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
          {posts.map((post, index) => (
            <ProfilePosts
              key={index}
              title={post.title}
              description={post.description}
              imageUrl={post.imageUrl}
              videoUrl={post.videoUrl}
              user={user}
            />
          ))}
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
