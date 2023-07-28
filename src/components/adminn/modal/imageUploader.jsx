import React, { useState, useEffect } from "react";
import { uploadBytes, ref, getDownloadURL, auth, storage } from "../../../config/firebase";

const ImageUploader = ({ onImageChange, imageURL }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageURLState, setImageURLState] = useState(""); // Initialize with an empty string
  const [uploadingMessage, setUploadingMessage] = useState(""); // State to display uploading message

  useEffect(() => {
    if (imageURL) {
      setImageURLState(imageURL); // Update the state with imageURL only if it's available
    } else {
      setImageURLState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
    }
  }, [imageURL]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleClick = async () => {
    if (!image) {
      console.error("No image selected");
      return;
    }

    setLoading(true);
    setUploadingMessage("Uploading...");

    try {
      const imageURL = await handleImageUpload(image);
      setImageURLState(imageURL); // Use setImageURLState instead of setImageURL
      onImageChange(image, imageURL); // Pass the new image URL to the onImageChange function
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setLoading(false);
  };

  const handleImageUpload = async (imageFile) => {
    try {
      const user = auth.currentUser;
      const storageRef = ref(
        storage,
        `articleimages/${user.uid}/${imageFile.name}`
      );
      await uploadBytes(storageRef, imageFile);

      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  return (
    <div className="fields">
      <input type="file" onChange={handleChange} />
      <button disabled={loading || !image} onClick={handleClick}>
        Upload
      </button>
      {loading && <p>{uploadingMessage}</p>}
      <img src={imageURLState} alt="Article Avatar" className="w-60 h-40 mt-2 object-cover" />
    </div>
  );
};

export default ImageUploader;
