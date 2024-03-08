import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const uploadPath = "./uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    callback(null, uploadPath);
  },
  filename: function (req, file, callback) {
    callback(null, `my-Imag-${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const uploadController = async (req, res) => {
  const path = req.file.path;
  const splitPath = path.split("/");

  const imageName = splitPath[splitPath.length - 1]; //
  res.json({ imageName });
};

export default [upload.single("file"), uploadController];


