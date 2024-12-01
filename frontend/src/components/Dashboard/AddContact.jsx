/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import axiosInstance from "../../../axiosConfig";
import toast from "react-hot-toast";

const AddContact = ({
  setShowAddContact,
  selectedContact,
  setSelectedContact,
}) => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (selectedContact) {
      setContact(selectedContact);
    }
  }, [selectedContact]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate email
    if (name === "email") {
      if (!validateEmail(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Please enter a valid email address.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
      }
    }

    // Validate phone
    if (name === "phone") {
      if (!validatePhone(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "Phone number must be 10 digits.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
      }
    }

    setContact({ ...contact, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setContact({ ...contact, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addContact = async (e) => {
    e.preventDefault();
    if (errors.email || errors.phone) {
      toast.error("Please fix validation errors before submitting.");
      return;
    }

    try {
      const response = await axiosInstance.post(`/contact/addContact`, contact);
      if (response.status === 201) {
        toast.success("Contact added successfully");
        setShowAddContact(false);
        setContact({ name: "", email: "", phone: "", image: "" });
      }
    } catch (error) {
      console.error("Error adding contact:", error);
      toast.error(error?.response?.data?.error || "An error occurred.");
    }
  };

  const updateContact = async (e) => {
    e.preventDefault();
    if (errors.email || errors.phone) {
      toast.error("Please fix validation errors before submitting.");
      return;
    }

    try {
      const response = await axiosInstance.put(
        `/contact/updateContact/${selectedContact._id}`,
        contact
      );
      setContact({ name: "", email: "", phone: "", image: "" });
      setSelectedContact(null);
      setShowAddContact(false);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleClose = () => {
    setShowAddContact(false);
    setContact({
      name: "",
      email: "",
      phone: "",
      image: "",
    });
    setSelectedContact(null);
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.9, y: -50, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="relative max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Close Icon */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 p-2 rounded-full text-gray-600 transition-all duration-200 hover:rotate-90"
        title="Close"
      >
        <FiX className="h-5 w-5" />
      </button>

      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        {selectedContact ? "Edit Contact" : "Add New Contact"}
      </h2>
      <form className="space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-gray-600 font-medium mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={contact.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Enter name"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-gray-600 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={contact.email}
            onChange={handleInputChange}
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-violet-500"
            }`}
            placeholder="Enter email"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-gray-600 font-medium mb-1"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={contact.phone}
            onChange={handleInputChange}
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.phone
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-violet-500"
            }`}
            placeholder="Enter phone number"
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image"
            className="block text-gray-600 font-medium mb-1"
          >
            Profile Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          {contact.image && (
            <img
              src={contact.image}
              alt="Preview"
              className="mt-4 h-20 w-20 rounded-full object-cover mx-auto"
            />
          )}
        </div>

        <div className="text-center">
          {selectedContact ? (
            <button
              onClick={updateContact}
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Contact
            </button>
          ) : (
            <button
              onClick={addContact}
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Contact
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default AddContact;
