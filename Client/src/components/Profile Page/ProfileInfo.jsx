import React from "react";

const ProfileInfo = ({ user }) => {
  if (!user) {
    return null;
  }

  // Dummy profile image URL
  const dummyProfileImage = "https://via.placeholder.com/150";

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-6 sm:p-6">
        <div className="flex items-center justify-center">
          <img
            src={user.avatar || dummyProfileImage}
            alt="User Avatar"
            className="w-32 h-32 rounded-full"
          />
        </div>
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
          <p className="mt-2 text-sm text-gray-600">{user.email}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Bio</h2>
          <p className="mt-2 text-gray-600">{user.bio}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
          <ul className="mt-2">
            {user.skills &&
              user.skills.map((skill, index) => (
                <li key={index} className="text-gray-600">
                  {skill}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
