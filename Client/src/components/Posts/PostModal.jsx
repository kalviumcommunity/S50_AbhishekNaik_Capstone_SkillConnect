import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import axios from "axios";
import { Storage } from "./FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  videoUrl: Yup.string().url("Invalid video URL"),
});

const PostModal = ({ onClose }) => {
  const [images, setImages] = useState([]);

  const handleImageChange = (selectedImages) => {
    setImages(selectedImages);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const uploadImagePromises = images.map((image) => {
      const timestamp = Date.now();
      const imgRef = ref(Storage, `images/${timestamp}_${image.name}`);
      return uploadBytes(imgRef, image).then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      });
    });

    Promise.all(uploadImagePromises)
      .then((imageUrls) => {
        return axios.post(
          "http://localhost:3000/post",
          {
            title: values.title,
            description: values.description,
            imageUrl: imageUrls,
            videoUrl: values.videoUrl,
          },
          {
            withCredentials: true,
          }
        );
      })
      .then(() => {
        onClose();
        window.location.reload();
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
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
              <Formik
                initialValues={{
                  title: "",
                  description: "",
                  videoUrl: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="w-full">
                    <Card className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <CardHeader>
                        <CardTitle className="text-lg leading-6 font-medium text-gray-900 mb-4">
                          Create a Post
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="mt-2">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Title
                          <Field
                            as={Textarea}
                            name="title"
                            className="w-full border rounded-md p-2 mb-2"
                          />
                          <ErrorMessage
                            name="title"
                            component="div"
                            className="text-red-500"
                          />
                        </label>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                          <Field
                            as={Textarea}
                            name="description"
                            className="w-full border rounded-md p-2 mb-2"
                          />
                          <ErrorMessage
                            name="description"
                            component="div"
                            className="text-red-500"
                          />
                        </label>
                        <div className="mb-2">
                          <label
                            htmlFor="imageUpload"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Images
                          </label>
                          <ImageUpload
                            onChange={handleImageChange}
                          />
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="videoUrl"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Video URL
                          </label>
                          <Field
                            as={Input}
                            type="text"
                            id="videoUrl"
                            name="videoUrl"
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="videoUrl"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </CardContent>
                    </Card>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <Button
                        variant="ghost"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        {isSubmitting ? "Posting..." : "Post"}
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
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageUpload = ({ onChange }) => {
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    onChange(selectedImages);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} multiple />
    </div>
  );
};

export default PostModal;
