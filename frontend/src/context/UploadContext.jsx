import { createContext,  useState } from "react";


export const UploadContext = createContext();

export const UploadContextProvider = ({ children }) => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState( localStorage.getItem("uploadedImageUrl") || "");

 



 

  return (
    <UploadContext.Provider value={{ file, setFile, imageUrl, setImageUrl }}>
      {children}
    </UploadContext.Provider>
  );
};
