import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getImage = async (req, res) => {
  const imagePath = `./uploads/${req.params.imageName}`;
  const absolutePath = path.join(__dirname, "/..", imagePath);

  return res.sendFile(absolutePath);
};
