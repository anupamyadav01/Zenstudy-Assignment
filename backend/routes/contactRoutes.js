import express from "express";
import {
  addContact,
  getAllContacts,
} from "../controllers/contactController.js";
import { getUserDetails } from "../middleware/getUserDetails.js";

export const contactRoutes = express.Router();

contactRoutes.post("/addContact", getUserDetails, addContact);

contactRoutes.get("/getAllContact", getUserDetails, getAllContacts);
