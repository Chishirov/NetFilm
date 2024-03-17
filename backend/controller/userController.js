import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const jwtSecret = "movie";

export const postRegisterUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const saltRounds = 10; // Anzahl der Runden für das Salz
    const salt = await bcrypt.genSalt(saltRounds); // Generierung des Salzes
    const hashedPassword = await bcrypt.hash(password, salt); // Hashen des Passworts
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword, // Verwenden des gehashten Passworts
    });
    res.status(201).json(user);
    console.log("registration successful");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const postLoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw new Error("Please enter a valid email and password");
    
    const user = await userModel.findOne({ email });
    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Wrong password");

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, jwtSecret);
    res.cookie("token", token, { maxAge: 90000000, httpOnly: true }).json({ _id: user._id, isAdmin: user.isAdmin });
    console.log("Token created");
  } catch (error) {
    console.error(error.message);
    res.status(401).json(error.message);
  }
};

export const postSignoutUser = async (req, res) => {
  res.clearCookie("token");
  res.send("Signout successful");
};

export const getValidateUser = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const tokenData = jwt.verify(token, jwtSecret);
    const user = await userModel.findById(tokenData.id);
    if (!user) throw new Error("User not found");
    
    const { _id, username, email, movies, image, isAdmin } = user;
    res.status(200).json({ _id, username, email, movies, image, isAdmin });
    console.log("Token verified");
  } catch (error) {
    console.error(error.message);
    res.status(400).json("Error: Invalid token");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find({ isAdmin: false });
    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    const usersInfo = allUsers.map((user) => ({
      _id: user._id,
      username: user.username,
      email: user.email,
      movies: user.movies,
      image: user.image,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    }));

    res.status(200).json(usersInfo);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
