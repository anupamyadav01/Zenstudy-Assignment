import express from "express";
import {
  addContact,
  deleteContactById,
  getAllContacts,
  searchContact,
  updateContactById,
} from "../controllers/contactController.js";
import { getUserDetails } from "../middleware/getUserDetails.js";
import cloudinaryUpload from "../middleware/cloudinaryUpload.js";

export const contactRoutes = express.Router();

contactRoutes.post("/addContact", getUserDetails, cloudinaryUpload, addContact);

contactRoutes.get("/getAllContact", getUserDetails, getAllContacts);

contactRoutes.delete("/deleteContact/:id", getUserDetails, deleteContactById);

contactRoutes.put("/updateContact/:id", getUserDetails, updateContactById);

contactRoutes.get("/searchContact/:name", getUserDetails, searchContact);
