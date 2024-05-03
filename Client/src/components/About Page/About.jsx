import React from "react";
import { motion } from "framer-motion";
import { STRINGS } from "../../utils/Strings";
import { AiFillGithub, AiOutlineMail } from "react-icons/ai";
import { Card, CardContent, CardHeader } from "../ui/card";

const AboutPage = () => {
  return (
    <motion.div
      className="container mx-auto py-8 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {STRINGS.aboutUs}
      </motion.h1>
      <Card>
        <CardContent className="pt-4">
          <p className="text-lg">{STRINGS.aboutDescription}</p>
        </CardContent>
      </Card>
      <motion.h2
        className="text-2xl font-bold mt-8 mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {STRINGS.ourMission}
      </motion.h2>
      <Card>
        <CardContent className="pt-4">
          <p className="text-lg">{STRINGS.missionDescription}</p>
        </CardContent>
      </Card>
      <motion.h2
        className="text-2xl font-bold mt-8 mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {STRINGS.Team}
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {/* Sample team member cards */}
        <Card className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center">
          <CardHeader>
            <h3 className="text-xl font-semibold mb-2">Abhishek Naik</h3>
            <p className="text-gray-600 mb-4">Full Stack Developer</p>
          </CardHeader>
          <CardContent className="flex justify-center gap-4">
            <motion.div
              className="flex space-x-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <a
                href="https://github.com/abhisheknaik1112"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <AiFillGithub className="h-8 w-8 text-gray-600 hover:text-black" />
              </a>
            </motion.div>
            <motion.div
              className="flex space-x-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <a
                href="mailto:abhisheknaik11122@gmail.com"
                aria-label="Send Email"
              >
                <AiOutlineMail className="h-8 w-8 text-gray-600 hover:text-red-500" />
              </a>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;
