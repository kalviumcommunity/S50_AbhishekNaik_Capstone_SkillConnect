import React from "react";
import { FiEdit2 } from "react-icons/fi";

const ProfileInfo = ({ user }) => {
  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }
  // console.log(user);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col items-center">
          <img
            src={user.picture}
            alt="User"
            className="w-32 h-32 rounded-full mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-sm text-gray-600">{user.email}</p>
          <FiEdit2 className="text-black mt-2 mr-2 cursor-pointer " />
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Bio</h2>
          <p className="mt-2 text-gray-600">{user.bio || "No bio available"}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Description</h2>
          <p className="mt-2 text-gray-600">
            {user.description || "No description available"}
          </p>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">My TechStack</h2>
          <ul className="mt-2 grid grid-cols-2 gap-4">
            {user.skills && user.skills.length > 0 ? (
              user.skills.map((skill, index) => (
                <li key={index} className="text-gray-600">
                  {skill}
                </li>
              ))
            ) : (
              <li className="text-gray-600">No skills listed</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
