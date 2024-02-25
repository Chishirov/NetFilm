import { Router } from "express";
import {
  postLoginController,
  postLogoutController,
  postRegisterUser,
  getValidateUser,
} from "../controller/userController.js";
import { postMovieId } from "../controller/moviesController.js";

export const router = Router();
// Middleware to set ETag header for routes involving tokens and cookies
function setETag(req, res, next) {
  res.set("etag", "strong");
  next();
}
router
  .post("/register", postRegisterUser)
  .post("/login", setETag, postLoginController) // Apply the middleware to the login route
  .get("/validate", setETag, getValidateUser) // Apply the middleware to the validate route
  .post("/signout", setETag, postLogoutController) // Apply the middleware to the signout route
  .post("/movie/:id", postMovieId);
