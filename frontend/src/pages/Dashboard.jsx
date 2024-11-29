/* eslint-disable react/prop-types */
import { useState } from "react";
import AnimatedButton from "../components/Dashboard/AnimatedButton";
import Header from "../components/Dashboard/Header";
import { FaPlus } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import AddContact from "../components/Dashboard/AddContact";

const Dashboard = ({ onLogout }) => {
  const [showAddContact, setShowAddContact] = useState(false);
  const user = {
    name: "Alice Johnson",
    image: "https://via.placeholder.com/150",
  };
  const toggleAddContact = () => {
    setShowAddContact(!showAddContact);
  };
  const contacts = [
    {
      name: "John Doe",
      phone: "123-456-7890",
      email: "john.doe@example.com",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3V1q5gFJ-WTRCi5SVm7tOR8Pyg1eq83DpAA&s",
    },
    {
      name: "Jane Smith",
      phone: "987-654-3210",
      email: "jane.smith@example.com",
      image:
        "https://preview.redd.it/k9szmyteayr61.jpg?width=640&crop=smart&auto=webp&s=8a6ccad4a242a6d6b1b358c4df4bf3ca22bc35ed",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} onLogout={onLogout} />

      <main className="p-6 mt-16 z-10 relative">
        {showAddContact && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <AddContact setShowAddContact={setShowAddContact} />
          </div>
        )}
        {/* Welcome Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-gray-700">
            Welcome, {user.name}!
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Manage your contacts efficiently with our dashboard.
          </p>
        </section>

        {/* Add Contact Button */}
        <section className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Your Contacts</h2>
          <div onClick={toggleAddContact}>
            <AnimatedButton icon={FaPlus} name="Add Contact" />
          </div>
        </section>

        {/* Contacts List */}
        <section className="space-y-6">
          {/* Table Header */}
          <div className="grid grid-cols-5 items-center text-center justify-center bg-gray-200 p-4 px-10 rounded-t-lg text-gray-700 font-semibold">
            <span>Profile Picture</span>
            <span>Name</span>
            <span>Email</span>
            <span>Phone</span>
            <span>Actions</span>
          </div>

          {/* Table Rows */}
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="grid grid-cols-5 items-center bg-white shadow p-4 rounded-lg border-b border-gray-200"
            >
              {/* Profile Picture */}
              <div className="flex justify-center">
                <img
                  src={contact.image}
                  alt={contact.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
              </div>

              {/* Contact Name */}
              <p className="text-center text-lg font-medium text-gray-800">
                {contact.name}
              </p>

              {/* Contact Email */}
              <p className="text-center text-gray-600">{contact.email}</p>

              {/* Contact Phone */}
              <p className="text-center text-gray-600">{contact.phone}</p>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <AnimatedButton icon={FiEdit} name="Edit" />
                <AnimatedButton icon={FiTrash} name="Delete" />
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
