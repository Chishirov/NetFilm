import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
const jwtSecret = "movie";
export const postRegisterUser = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  try {
    const user = await userModel.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(user);
    console.log("registration successful");
  } catch (error) {
    console.error(error);
    res.status(422).json(error);
  }
};
export const postLoginUser = async (req, res) => {
  const { email, password } = await req.body;
  try {
    if (!email && !password) throw new Error("Please enter a valid email");
    const user = await userModel.findOne({ email });
    if (user) {
      console.log("user found");
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        console.log("password correct");
        jwt.sign({ id: user._id }, jwtSecret, {}, (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, { maxAge: 90000000, httpOnly: true })
            .json({ _id: user._id });
        });
        console.log("token created");
      } else {
        res.status(401).json("wrong password");
      }
    }
  } catch (error) {
    res.status(401).json("user not found");
  }
};
export const postSignoutUser = async (req, res) => {
  res.clearCookie("token");
  res.send("signout user");
};
export const getValidateUser = async (req, res) => {
  const { token } = await req.cookies;
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;
      const user = await userModel.findById(tokenData.id);
      const { _id, username, email, movies, image} = user;
      res.status(200).json({ _id, username, email, movies, image});
      console.log("token überprüft");
    });
  } catch (error) {
    res.status(400).json("error invalid token");
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ message: "Keine Benutzer gefunden" });
    }

    const usersInfo = allUsers.map((user) => ({
      _id: user._id,
      username: user.username,
      email: user.email,
      movies: user.movies,
    }));

    res.json(usersInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
