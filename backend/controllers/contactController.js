import { UserModel } from "../models/userModel.js";

export const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const user = req.user;
  const imgURL = req.secure_url;

  try {
    // validate inputs
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newContact = await UserModel.findByIdAndUpdate(
      user._id,
      { $push: { contacts: { name, email, phone, image: imgURL || "" } } },
      { new: true }
    );
    res.status(201).json({ message: "Contact added successfully" });
  } catch (error) {
    console.log("Error in add contact", error);
    res.status(500).json({ error: "Unable to add contact, try again." });
  }
};

export const getAllContacts = async (req, res) => {
  const user = req.user;
  try {
    const contacts = await UserModel.findById(user._id).select("contacts");
    res.status(200).json(contacts?.contacts);
  } catch (error) {
    console.log("Error in get all contacts", error);
    res.status(500).json({ error: "Unable to get all contacts, try again." });
  }
};
