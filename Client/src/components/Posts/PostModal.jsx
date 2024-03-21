import React, { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import axios from "axios";

const PostModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");

  const handlePost = () => {
    axios
      .post(
        "http://localhost:3000/post",
        {
          title: title,
          description: description,
          mediaUrl: mediaUrl,
        },
        {
          withCredentials: true,
        },
      )
      // .then((response) => {
      //   console.log(response);
      // })
      .catch((error) => {
        console.error(error);
      });
    onClose();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <form className="w-full">
                <Card className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <CardHeader>
                    <CardTitle className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Create a Post
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="mt-2">
                    <Textarea
                      placeholder="Title"
                      className="w-full border rounded-md p-2 mb-2"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <Textarea
                      placeholder="Description"
                      className="w-full border rounded-md p-2 mb-2"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input
                      type="file"
                      className="w-full border rounded-md p-2 mb-2"
                      value={mediaUrl}
                      onChange={(e) => setMediaUrl(e.target.value)}
                    />
                  </CardContent>
                </Card>
              </form>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button
              variant="ghost"
              type="button"
              onClick={handlePost}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Post
            </Button>
            <Button
              variant="ghost"
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
