import React, { useContext, useState } from "react";
import { UploadContext } from "../context/UploadContext";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { GoTrash } from "react-icons/go";
import { useEffect } from "react";
export const PhotoUpload = ({ onImageUpload }) => {
  const { photo, setPhoto } = useContext(UploadContext);
  const { user } = useContext(UserContext);
  function convertToBase64(e) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPhoto(reader.result);
    };
    reader.onerror = (error) => {
      console.log(error);
    };
  }
  async function uploadImage() {
    console.time("Upload");
    if (photo !== "") {
      const imageData = JSON.stringify({ base64: photo });
      console.log("USERID FROM PHOTOUPLOAD", user._id);
      try {
        const response = await axios.post(`/upload/${user._id}`, imageData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        alert("Image uploaded successfully");
        onImageUpload();
        console.timeEnd("Upload");
        setPhoto("");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.error("Image data missing.");
    }
  }
  async function deleteImage() {
    try {
      const response = await axios.delete(`/delete/${user._id}`);
      console.log(response.data);
      alert("Image deleted successfully");
      onImageUpload();
    } catch (error) {
      console.log(error);
    }
  }
  const cancel = () => {
    setPhoto("");
  };
  return (
    <>
      <div className="flex justify-center my-4">
        {user?.image ? (
          <img className="h-24 items-center" src={user.image} />
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-col gap-2 items-center">
        <input
          className=" p-3 sm:p-2 border rounded-md"
          accept="image/*"
          type="file"
          onChange={convertToBase64}
        />
        {photo && (
          <img
            src={photo}
            width={200}
            height={200}
            style={{ borderRadius: "10px" }}
            alt=""
          />
        )}
        <button
          className="flex justify-center gap-1 px-24 py-3 rounded-lg size-xxl text-white cursor-pointer"
          onClick={uploadImage}
          style={{
            backgroundColor: "#da2f68",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
            />
          </svg>
          UPLOAD
        </button>
        <button
          style={{
            backgroundColor: "#da2f68",
          }}
          className="flex justify-center gap-2 px-24 py-3 rounded-lg size-xxl text-white cursor-pointer"
          onClick={deleteImage}
        >
          <GoTrash className="w-5 h-5" />
          DELETE
        </button>
        <button
          style={{
            backgroundColor: "#da2f68",
          }}
          className="flex justify-center gap-1 px-24 py-3 rounded-lg size-xxl text-white cursor-pointer"
          onClick={cancel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
          CANCEL
        </button>
      </div>
    </>
  );
};
