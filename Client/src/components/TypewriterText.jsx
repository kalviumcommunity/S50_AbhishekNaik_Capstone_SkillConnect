import React from "react";
import Typewriter from "typewriter-effect";

const TypewriterText = ({ strings }) => {
  return (
    <Typewriter
      options={{
        loop: true,
        autoStart: true,
        cursor: "",
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString(strings[0])
          .pauseFor(1500)
          .deleteAll()
          .typeString(strings[1])
          .pauseFor(1500)
          .deleteAll()
          .typeString(strings[2])
          .pauseFor(1500)
          .start();
      }}
    />
  );
};

export default TypewriterText;
