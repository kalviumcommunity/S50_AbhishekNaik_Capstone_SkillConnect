import React from "react";
import TypewriterText from "../TypewriterText";
import { Link } from "react-router-dom";

const STRINGS = {
  connect: "Connect.",
  learn: "Learn.",
  grow: "Grow.",
  tagline: "SkillConnect: Where Knowledge Meets Community.",
  signUp: "Get Started",
  logIn: "Log In",
};

const LandingPage = () => {
  const handleSignUp = () => {
    // Add logic to handle sign-up action
  };
  const handleLogIn = () => {
    // Add logic to handle sign-up action
  };

  return (
    <div className="flex h-screen">
      {/* Left side */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            <TypewriterText
              strings={[STRINGS.connect, STRINGS.learn, STRINGS.grow]}
            />
          </h1>
          <p className="text-2xl mt-4 font-poppins">{STRINGS.tagline}</p>
        </div>
        <div className="mt-8">
          <Link to="/signup">
            <button
              className="bg-blue-500 mr-6 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSignUp}
            >
              {STRINGS.signUp}
            </button>
          </Link>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            onClick={handleLogIn}
          >
            {STRINGS.logIn}
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="w-1/2 bg-black"></div>

      {/* Logo */}
      <img
        src="site-logo.png"
        alt="Skill Connect"
        className="absolute top-0 left-0 p-4"
      />
    </div>
  );
};

export default LandingPage;
