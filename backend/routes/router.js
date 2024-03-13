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
  deleteCommentFromMovie,
  deleteMovie,
  getAllMovies,
  postFavoriteMovie,
} from "../controller/movieController.js";


import { updateEmail, updateMissingPassword, updatePassword, updateUsername } from "../controller/settingsController.js";
import { deleteImageById, getImageById, uploadImage } from "../controller/imageController.js";

export const router = Router();

// User Controller
router
  .post("/register", postRegisterUser)
  .post("/login", postLoginUser)
  .get("/validate", getValidateUser)
  .post("/signout", postSignoutUser)
  .get("/get-all", getAllUsers);

// Movie Controller
router
  .post("/favorite-movie", postFavoriteMovie)
  .post("/update-movie/:userId/:movieId", addCommentToMovie)
  .delete("/delete-comment/:userId/:movieId/:commentId", deleteCommentFromMovie)
  .delete("/delete-movie/:movieId/:userId", deleteMovie)
  .get("/get-movies/:id", getAllMovies);

// Settings Controller
router
  .put("/update-password", updatePassword)
  .put("/update-username", updateUsername)
  .put("/update-email", updateEmail)

  .put("/missing-password", updateMissingPassword);

// Image Controller
router
  .post("/upload/:userId", uploadImage)
  .get("/get-image/:id", getImageById)
  .delete("/delete/:id", deleteImageById)