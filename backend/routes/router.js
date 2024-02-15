import { Router } from "express";
import { postLoginUser, postRegisterUser } from "../controller/userController.js";

export const router = Router()

router
    .post("/register", postRegisterUser)
    .post("/login", postLoginUser)