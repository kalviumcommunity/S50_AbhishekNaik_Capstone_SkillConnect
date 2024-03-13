import React from "react";
import TypewriterText from "../../utils/TypewriterText";
import { Link } from "react-router-dom";
import { STRINGS } from "../../utils/Strings";
import 'ldrs/trio'

const LandingPage = () => {
  return (
    <div className="relative flex h-screen">
      {/* Left side */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center">
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
            <button className="bg-blue-500 mr-6 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              {STRINGS.signUp}
            </button>
          </Link>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4">
            {STRINGS.logIn}
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="hidden md:block w-1/2 bg-black"></div>

      {/* Logo */}
      <img
        src="site-logo.png"
        alt="Skill Connect"
        className="absolute top-0 left-0 p-4"
      />

      {/* About Button */}
      <Link to="/about" className="absolute top-4 right-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          About
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;
