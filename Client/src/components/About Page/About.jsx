import React from "react";
import { STRINGS } from "../../utils/Strings";
import { AiFillGithub, AiOutlineMail } from "react-icons/ai";
import { Card, CardContent, CardHeader } from "../ui/card";

const AboutPage = () => {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-4">{STRINGS.aboutUs}</h1>
      <Card>
        <CardContent>
          <p className="text-lg">{STRINGS.aboutDescription}</p>
        </CardContent>
      </Card>
      <h2 className="text-2xl font-bold mt-8 mb-4">{STRINGS.ourMission}</h2>
      <Card>
        <CardContent>
          <p className="text-lg">{STRINGS.missionDescription}</p>
        </CardContent>
      </Card>
      <h2 className="text-2xl font-bold mt-8 mb-4">{STRINGS.Team}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Sample team member cards */}
        <Card className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center">
          <CardHeader>
            <h3 className="text-xl font-semibold mb-2">Abhishek Naik</h3>
            <p className="text-gray-600 mb-4">Full Stack Developer</p>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <a
                href="https://github.com/abhisheknaik1112"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub className="h-6 w-6 text-gray-600 hover:text-black" />
              </a>
              <a href="mailto:abhisheknaik11122gmail.com">
                <AiOutlineMail className="h-6 w-6 text-gray-600 hover:text-red-500" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
