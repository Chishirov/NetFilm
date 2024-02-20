import { Router } from "express";
import { getValidateUser, postLoginUser, postSignoutUser, postRegisterUser } from "../controller/userController.js";

export const router = Router()

router
    .post("/register", postRegisterUser)
    .post("/login", postLoginUser)
    .get("/validate", getValidateUser)
    .post("/signout", postSignoutUser)