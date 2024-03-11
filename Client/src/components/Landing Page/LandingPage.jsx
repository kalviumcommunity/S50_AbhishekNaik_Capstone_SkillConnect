import React from "react";
import Typewriter from "typewriter-effect";

const LandingPage = () => {
  return (
    <>
      <div className="flex h-screen">
        {/* Left side */}
        <div className="w-1/2 bg-white flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold">
              <Typewriter
                options={{
                  loop: true,
                  autoStart: true,
                  cursor: "",
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Connect.")
                    .pauseFor(1500)
                    .deleteAll()
                    .typeString(" Learn.")
                    .pauseFor(1500)
                    .deleteAll()
                    .typeString("  Grow.")
                    .pauseFor(1500)
                    .start();
                }}
              />
            </h1>
            <p className="text-2xl mt-4 font-poppins">
              SkillConnect: Where Knowledge Meets Community.
            </p>
          </div>
          <div className="mt-8">
            <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mr-4">
              Sign Up
            </button>
            <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
              Log In
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
