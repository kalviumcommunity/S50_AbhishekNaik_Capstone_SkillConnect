import React from "react";
import TypewriterText from "../TypewriterText";

// Constants for hardcoded strings
const STRINGS = {
  connect: "Connect.",
  learn: "Learn.",
  grow: "Grow.",
  tagline: "SkillConnect: Where Knowledge Meets Community.",
  signUp: "Sign Up",
  logIn: "Log In",
};

const LandingPage = () => {
  return (
    <>
      <div className="flex h-screen">
        {/* Left side */}
        <div className="w-1/2 bg-white flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold">
              <TypewriterText strings={[STRINGS.connect, STRINGS.learn, STRINGS.grow]} />
            </h1>
            <p className="text-2xl mt-4 font-poppins">{STRINGS.tagline}</p>
          </div>
          <div className="mt-8">
            <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mr-4">
              {STRINGS.signUp}
            </button>
            <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
              {STRINGS.logIn}
            </button>
          </div>
        </div>

        {/* Right side */}
        <div className="w-1/2 bg-black"></div>

        {/* Logo */}
        <img
          src="./src/assets/site-logo2.png"
          alt="Skill Connect"
          className="absolute top-0 left- p-4"
        />
      </div>
    </>
  );
};

export default LandingPage;
