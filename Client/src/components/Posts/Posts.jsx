import React from "react";

const Post = ({ title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        {/* {imageUrl && (
          <img src={imageUrl} alt="Post Image" className="w-full mb-4" />
        )}
        {videoUrl && (
          <div className="w-full mb-4">
            <iframe
              title="Post Video"
              src={videoUrl}
              frameBorder="0"
              allowFullScreen
              className="w-full"
            ></iframe>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Post;
