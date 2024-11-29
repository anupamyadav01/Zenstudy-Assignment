/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { FiX } from "react-icons/fi";

const AddContact = ({ setShowAddContact }) => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setContact({ ...contact, image: file ? URL.createObjectURL(file) : "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Contact:", contact);
    setContact({ name: "", email: "", phone: "", image: "" }); // Reset the form
  };

  const handleClose = () => {
    setShowAddContact(false);
  };

  // Animation Variants
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
        Add New Contact
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Enter email"
            required
          />
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
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Enter phone number"
            required
          />
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

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-violet-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 transition duration-200"
          >
            Add Contact
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddContact;
