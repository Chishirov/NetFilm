import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const updatePassword = async (req, res) => {
  try {
    const { id, password, newPassword } = await req.body;
    const user = await userModel.findById(id);
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(500).send("Invalid password")
    }
    const salt = bcrypt.genSaltSync(10);
    const newPasswordHashed = bcrypt.hashSync(newPassword, salt);
    user.password = newPasswordHashed;
    user.save();
    res.status(201).send("Password was updated");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateMissingPassword = async (req, res) => {
  try {
    const { email, newPassword } = await req.body;
    const user = await userModel.findOne({ email });
    const salt = bcrypt.genSaltSync(10);
    const newPasswordHashed = bcrypt.hashSync(newPassword, salt);
    user.password = newPasswordHashed;
    user.save();
    res.status(201).send("A new password was created successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUsername = async (req, res) => {
  try {
    const { id, username } = await req.body;
    const user = await userModel.findById(id);
    user.username = username;
    user.save();
    res.status(200).send("Username updated");
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateEmail = async (req, res) => {
  try {
    const { id, email } = await req.body;
    const checkEmail = await userModel.findOne({ email });
    if (checkEmail) {
      return res.status(200).send("Email already in use");
    }
    const user = await userModel.findById(id);
    user.email = email;
    user.save();
    res.status(200).send("Email updated");
  } catch (error) {
    res.status(400).send(error);
  }
};
