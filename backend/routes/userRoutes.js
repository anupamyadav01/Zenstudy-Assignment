import express from "express";
import {
  getLoggedInUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import { getUserDetails } from "../middleware/getUserDetails.js";
import cloudinaryUpload from "../middleware/cloudinaryUpload.js";

export const userRoutes = express.Router();

userRoutes.post("/register", cloudinaryUpload, registerUser);

userRoutes.post("/login", loginUser);

userRoutes.post("/logout", logoutUser);

userRoutes.get("/getLoggedInUser", getUserDetails, getLoggedInUser);
