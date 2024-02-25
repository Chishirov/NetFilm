import { Router } from "express";
import {
  postLoginUser,
  postSignoutUser,
  postRegisterUser,
  getValidateUser,
} from "../controller/userController.js";
import { postMovieId } from "../controller/moviesController.js";

export const router = Router();

router
  .post("/register", postRegisterUser)
  .post("/login", postLoginUser)
  .get("/validate", getValidateUser)
  .post("/signout", postSignoutUser)
  .post("/movie/:id", postMovieId);
