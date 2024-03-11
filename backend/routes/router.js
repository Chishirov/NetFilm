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


import { deleteImageById, getImageById, uploadImage } from "../controller/imageController.js";

import {
  updateMissingPassword,
  updatePassword,
  updateUsername,
} from "../controller/settingsController.js";

export const router = Router();

router
  .post("/register", postRegisterUser)
  .post("/login", postLoginUser)
  .get("/validate", getValidateUser)
  .post("/signout", postSignoutUser)
  .get("/getAllUser", getAllUsers);

router
  .post("/favorite-movie", postFavoriteMovie)
  .post("/update-movie/:userId/:movieId", addCommentToMovie)
  .delete("/delete-movie/:movieId/:userId", deleteMovie)
  .get("/get-movies/:id", getAllMovies);

router
  .put("/update-password", updatePassword)
  .put("/update-username", updateUsername)

  .put("/missing-password", updateMissingPassword)

router
  .post("/upload/:userId", uploadImage)
  .get("/get-image/:id", getImageById)
  .delete("/delete/:id", deleteImageById)
  


  


  .put("/missing-password", updateMissingPassword);

