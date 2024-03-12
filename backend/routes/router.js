import { Router } from "express";

import {
  postLoginUser,
  postSignoutUser,
  postRegisterUser,
  getValidateUser,
  getAllUsers,
} from "../controller/userController.js";
import {
  addCommentToMovie,
  deleteMovie,
  getAllMovies,
  postFavoriteMovie,
} from "../controller/movieController.js";
import { updateEmail, updateMissingPassword, updatePassword, updateUsername } from "../controller/settingsController.js";
import { deleteImageById, getImageById, uploadImage } from "../controller/imageController.js";


export const router = Router();

// User routes
router.route("/user")
  .post("/register", postRegisterUser)
  .post("/login", postLoginUser)
  .get("/validate", getValidateUser)
  .post("/signout", postSignoutUser)
  .get("/all", getAllUsers);

// Movie routes 
router.route("/movie")
  .post("/favorite", postFavoriteMovie)
  .post("/comment/:userId/:movieId", addCommentToMovie)
  .delete("/delete/:movieId/:userId", deleteMovie)
  .get("/all/:id", getAllMovies);

// Settings routes
router.route("/setting")
  .put("/username", updateUsername)
  .put("email", updateEmail)
  .put("/password", updatePassword)
  .put("/missing-password", updateMissingPassword)

// Image routes
router.route("/image")
  .get("/:id", getImageById)
  .post("/upload/:userId", uploadImage)
  .delete("/delete/:id", deleteImageById)






  .put("/missing-password", updateMissingPassword);

