import { Router } from "express";
import {
  postLoginUser,
  postSignoutUser,
  postRegisterUser,
  getValidateUser,
} from "../controller/userController.js";

export const router = Router();

router
  .post("/register", postRegisterUser)
  .post("/login", postLoginUser)
  .get("/validate", getValidateUser)
  .post("/signout", postSignoutUser);
