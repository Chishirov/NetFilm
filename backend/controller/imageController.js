import userModel from "../models/userModel.js";

export const uploadImage = async (req, res) => {
  const { base64 } = req.body;
  const { userId } = req.params;

  try {
    if (!userId) {
      return res
        .status(400)
        .json({ status: "error", message: "User ID is required" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    user.image = base64;
    await user.save();

    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const getImageById = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("userId", userId)
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send("user not found");
    } else {
      res.status(200).json({ status: "success", data: user.image });
    }
  } catch (error) {
    res.status(404).json("error get all movies");
  }
};

export const deleteImageById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send("Benutzer nicht gefunden");
    }

    user.image = "";

    await user.save();

    res.status(200).send("Bild erfolgreich gelöscht");
  } catch (error) {
    console.error(error);
    res.status(500).json("Fehler beim Löschen des Bildes");
  }
};
