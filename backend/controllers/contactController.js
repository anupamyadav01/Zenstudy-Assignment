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

export const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $pull: { contacts: { _id: id } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Contact deleted successfully",
      contacts: updatedUser.contacts,
    });
  } catch (error) {
    console.error("Error in delete contact:", error);
    res.status(500).json({ error: "Unable to delete contact, try again." });
  }
};

export const updateContactById = async (req, res) => {
  const { name, email, phone, image } = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { "contacts._id": id },
      {
        $set: {
          "contacts.$.name": name,
          "contacts.$.email": email,
          "contacts.$.phone": phone,
          "contacts.$.image": image || "",
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json({
      message: "Contact updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error in update contact:", error);
    res.status(500).json({ error: "Unable to update contact, try again." });
  }
};

export const searchContact = async (req, res) => {
  const name = req.query;
  try {
    console.log(name);
  } catch (error) {
    console.log("Error in search contact:", error);
    res.status(500).json({ error: "Unable to search contact, try again." });
  }
};
