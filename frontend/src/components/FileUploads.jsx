import React, { useContext, useState } from "react";
import { UploadContext } from "../context/UploadContext";
import { UserContext } from "../context/UserContext";

const FileUploads = () => {
  const { file, setFile, imageUrl, setImageUrl } = useContext(UploadContext);
  const {user, setUser} = useContext(UserContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
   

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      const uploadedImageUrl = `http://localhost:3000/image/${result.imageName}`;
      setImageUrl(uploadedImageUrl);
      localStorage.setItem("uploadedImageUrl", uploadedImageUrl);

      console.log(result.imageName);
    } catch (error) {
      console.error("Fehler beim Senden der Anfrage", error);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <input
          className="flex-grow p-3 sm:p-2 border rounded-md "
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="px-8 py-3 rounded-lg size-xxl bg-gray-900 text-white cursor-pointer">
          UPLOAD
        </button>
      </form>

      {/* {imageUrl && <img style={{width:"50px", height:"50px", borderRadius:"50%"}} src={imageUrl} alt="img" />} */}
    </>
  );
};

export default FileUploads;
