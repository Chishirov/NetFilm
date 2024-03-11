import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../context/UserContext";
import { useEffect } from "react";
import axios from "axios";
import { UploadContext } from "../context/UploadContext";
import { PhotoUpload } from "./PhotoUploads";



export const Images = () => {
    const { user } = useContext(UserContext);


  const {images, setImages} = useContext(UploadContext)
    
  const getAllImages = async () => {
      try {
          const response = await axios.get(`http://localhost:3000/get-image/${user._id}`, {withCredentials:true}); // Anpassen der URL an deine Serveradresse
          console.log("response.data.data", response.data.data)
          setImages(response.data.data);

      } catch (error) {
          console.error('Error fetching images:', error);
      }
    };
    const handleImageUpload = () => {
        getAllImages();
    };
    
   
    useEffect(() => {
      getAllImages();
    }, [user]);
    


    return (
        <div>
            {/* <h2>Image Gallery</h2> */}
            <div className="image-container">
               
                   {/* {images &&  <img width={200} height={200} src={images} /> } */}

             
            </div>
            <PhotoUpload onImageUpload={handleImageUpload} />
        </div>
    );

}







