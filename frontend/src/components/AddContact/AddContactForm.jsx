/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const AddContactForm = ({ userId, onContactAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to the backend
      const response = await axios.post(
        `/api/users/${userId}/contacts`,
        formData
      );

      // Notify parent component about the new contact
      onContactAdded(response.data);

      // Reset the form
      setFormData({ name: "", phone: "", email: "" });
      alert("Contact added successfully!");
    } catch (error) {
      console.error("Error adding contact:", error);
      alert(error.response?.data?.message || "Failed to add contact.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="border p-2 w-full rounded"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Mobile Number"
        value={formData.phone}
        onChange={handleChange}
        required
        className="border p-2 w-full rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Contact
      </button>
    </form>
  );
};

export default AddContactForm;
