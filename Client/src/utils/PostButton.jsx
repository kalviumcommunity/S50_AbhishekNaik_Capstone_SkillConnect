import React, { useState } from "react";
import { Button } from "../components/ui/button";
import PostModal from "../components/Posts/PostModal";

const PostButton = ({ onClick }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="lg"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-half shadow-lg"
        onClick={handleButtonClick}
      >
        Post
      </Button>

      {showModal && <PostModal onClose={handleModalClose} />}
    </>
  );
};

export default PostButton;
