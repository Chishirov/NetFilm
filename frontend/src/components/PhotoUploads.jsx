 import React, { useContext, useState } from "react";
import { UploadContext } from "../context/UploadContext";
 import { UserContext } from "../context/UserContext";
 import axios from "axios";
 import { useEffect } from "react";
import { deleteImageById } from "../../../backend/controller/imageController";


export const PhotoUpload = ({onImageUpload}) => {
    const { photo, setPhoto } = useContext(UploadContext);
    const { user } = useContext(UserContext);
   
  
  
    function convertToBase64(e) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        console.log("READER.RESULT",reader.result)
        setPhoto(reader.result);
      };
      reader.onerror = error => {
        console.log(error);
      };
    }
  
    async function uploadImage() {
      if (photo !== "") {
       // const imageData = { base64: JSON.stringify(photo), userId: user._id };
       const imageData = JSON.stringify({ base64: photo }); 
        console.log("USERID FROM PHOTOUPLOAD", user._id);
        try {
          const response = await axios.post(`http://localhost:3000/upload/${user._id}`, imageData, {
            headers: {
              'Content-Type': 'application/json'
            },
          });
          console.log("Image uploaded successfully:", response.data);
          alert("Image uploaded successfully");
          onImageUpload();
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      } else {
        console.error("Image data missing.");
      }
      setPhoto("")
    }

    async function deleteImageById(){
      try {
        const response = await axios.delete(`http://localhost:3000/delete/${user._id}`)
        console.log(response.data)
        alert("Image deleted successfully");
        onImageUpload()
      } catch (error) {
        console.log(error)
      }
    }

    const cancel = () => {
      setPhoto("");
    }

 return (
      <>
        <div>
          <input
            className="flex-grow p-3 sm:p-2 border rounded-md"
            accept="image/*"
            type="file"
            onChange={convertToBase64}
          />
         {photo && <img src={photo} width={200} height={200} style={{ borderRadius: "10px" }} alt="" />}

          <button className="px-8 py-3 rounded-lg size-xxl bg-gray-900 text-white cursor-pointer" onClick={uploadImage}>UPLOAD FOTO</button>
          <button className="px-8 py-3 rounded-lg size-xxl bg-gray-900 text-white cursor-pointer" onClick={cancel}>CANCEL</button>
          <button className="px-8 py-3 rounded-lg size-xxl bg-gray-900 text-white cursor-pointer" onClick={deleteImageById}>DELETE</button>


        </div>
      </>
    );
  };
  
