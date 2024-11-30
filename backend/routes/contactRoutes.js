import express from "express";
import {
  addContact,
  getAllContacts,
} from "../controllers/contactController.js";
import { getUserDetails } from "../middleware/getUserDetails.js";
import cloudinaryUpload from "../middleware/cloudinaryUpload.js";

export const contactRoutes = express.Router();

contactRoutes.post("/addContact", getUserDetails, cloudinaryUpload, addContact);

contactRoutes.get("/getAllContact", getUserDetails, getAllContacts);
