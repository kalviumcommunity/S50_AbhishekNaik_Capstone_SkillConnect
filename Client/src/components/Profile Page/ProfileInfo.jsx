import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import Select from "react-select";
import { skills as skillOptions } from "../../utils/Skills"; 
import makeAnimated from "react-select/animated";
import axios from "axios";

const animatedComponents = makeAnimated();

const formatSkills = skillOptions.map(skill => ({
  value: skill,
  label: skill,
}));

const ProfileInfo = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleEditClick = () => {
    setIsModalOpen(true);
    setEditedUser(user);
  };

  const cookie = document.cookie;
  console.log("cookie", cookie);
  const cookieArray = cookie.split(";");
  let uid = null;
  for (let i = 0; i < cookieArray.length; i++) {
    const cookiePart = cookieArray[i].trim();
    if (cookiePart.startsWith("uid=")) {
      uid = cookiePart.substring(4);
      break;
    }
  }

  const handleSave = async () => {
    {console.log("editedUser", editedUser)}
    try {
      const url = `http://localhost:3000/user/${uid}`;
      const response = await axios.put(url, editedUser, {
        withCredentials: true,
      });

      // Update cookies with new token
      document.cookie = `name=${response.data.token}; path=/; max-age=3600;`;

      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error saving edited user data:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col items-center">
          <img
            src={user.picture}
            alt="User"
            className="w-32 h-32 rounded-full mb-2"
          />
          <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-sm text-gray-600">{user.email}</p>
          <FiEdit2
            className="text-black mt-2 mr-2 cursor-pointer"
            onClick={handleEditClick}
          />
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Bio</h2>
          <p className="mt-2 text-gray-600">{user.bio || "No bio available"}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">About</h2>
          <p className="mt-2 text-gray-600">
            {user.description || "No description available"}
          </p>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Tech Stack/Skills
          </h2>
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

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 modal-overlay z-10">
          <div className="bg-white p-8 rounded-lg w-1/2 modal-content">
            <h2 className="text-lg font-semibold mb-2">Edit Profile</h2>
            <div className="mb-2">
              <h2 className="text-m font-semibold">NAME</h2>
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, name: e.target.value })
                }
                className="border rounded-lg p-2 w-full"
                placeholder="Name"
              />
            </div>
            <div className="mb-2">
              <h2 className="text-m font-semibold">EMAIL</h2>
              <input
                type="email"
                value={editedUser.email}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
                className="border rounded-lg p-2 w-full"
                placeholder="Email"
              />
            </div>
            <div className="mb-2">
              <h2 className="text-m font-semibold">BIO</h2>
              <textarea
                value={editedUser.bio}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, bio: e.target.value })
                }
                className="border rounded-lg p-2 w-full"
                placeholder="Bio"
              />
            </div>
            <div className="mb-2">
              <h2 className="text-m font-semibold">ABOUT</h2>
              <textarea
                value={editedUser.description}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, description: e.target.value })
                }
                className="border rounded-lg p-2 w-full"
                placeholder="About"
              />
            </div>
            <div className="mb-2">
              <h2 className="text-m font-semibold">TECH STACK/SKILLS</h2>
              <Select
                options={formatSkills}
                isMulti
                components={animatedComponents}
                value={editedUser.skills.map((skill) => ({
                  value: skill,
                  label: skill,
                }))}
                onChange={(selectedOptions) =>
                  setEditedUser({
                    ...editedUser,
                    skills: selectedOptions.map((option) => option.value),
                  })
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
