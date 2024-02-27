import { Router } from "express";
import { postLoginUser, postSignoutUser, postRegisterUser, getValidateUser } from "../controller/userController.js";
import { postFavoriteMovie } from "../controller/movieController.js";

export const router = Router()

router
    .post("/register", postRegisterUser)
    .post("/login", postLoginUser)
    .get("/validate", getValidateUser)
    .post("/signout", postSignoutUser)

router
    .post("/favorite-movie", postFavoriteMovie)