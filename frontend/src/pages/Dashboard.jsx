import { useEffect, useState } from "react";

import { PropTypes } from "prop-types";
import AnimatedButton from "../components/Dashboard/AnimatedButton";
import Header from "../components/Dashboard/Header";
import { FaPlus } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import AddContact from "../components/Dashboard/AddContact";
import axios from "axios";

const Dashboard = ({ onLogout }) => {
  const [showAddContact, setShowAddContact] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const user = {
    name: "Alice Johnson",
    image: "https://via.placeholder.com/150",
  };

  const toggleAddContact = () => {
    setShowAddContact(!showAddContact);
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:10000/api/contact/getAllContact",
          {
            withCredentials: true,
          }
        );
        setContacts(response?.data);
      } catch (error) {
        console.log("Error getting contacts", error);
      }
    };
    fetchContacts();
  }, [contacts]);

  const deleteContact = async (id) => {
    try {
      await axios.delete(
        `http://localhost:10000/api/contact/deleteContact/${id}`,
        {
          withCredentials: true,
        }
      );
      setContacts(contacts.filter((contact) => contact._id !== id)); // Update state
      setShowDeletePopup(false);
    } catch (error) {
      console.log("Error deleting contact", error);
    }
  };

  const editContact = (contact) => {
    setSelectedContact(contact);
    setShowAddContact(true);
  };

  const handleDeleteClick = (id) => {
    setContactToDelete(id);
    setShowDeletePopup(true);
  };

  const handleCancelDelete = () => {
    setContactToDelete(null);
    setShowDeletePopup(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} onLogout={onLogout} />

      <main className="p-6 mt-16 z-10 relative">
        {showAddContact && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <AddContact
              setShowAddContact={setShowAddContact}
              selectedContact={selectedContact}
              setSelectedContact={setSelectedContact}
            />
          </div>
        )}

        {showDeletePopup && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Are you sure you want to delete this contact?
              </h2>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCancelDelete}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteContact(contactToDelete)}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        <section className="mb-8">
          <h1 className="text-3xl font-bold text-gray-700">
            Welcome, {user.name}!
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Manage your contacts efficiently with our dashboard.
          </p>
        </section>

        <section className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Your Contacts</h2>
          <div onClick={toggleAddContact}>
            <AnimatedButton icon={FaPlus} name="Add Contact" />
          </div>
        </section>

        <section className="space-y-6">
          <div className="grid grid-cols-5 items-center text-center justify-center bg-gray-200 p-4 px-10 rounded-t-lg text-gray-700 font-semibold">
            <span>Profile Picture</span>
            <span>Name</span>
            <span>Email</span>
            <span>Phone</span>
            <span>Actions</span>
          </div>

          {contacts.map((contact, index) => (
            <div
              key={index}
              className="grid grid-cols-5 items-center bg-white shadow p-4 rounded-lg border-b border-gray-200"
            >
              <div className="flex justify-center">
                <img
                  src={contact.image}
                  alt={contact.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              </div>

              <p className="text-center text-lg font-medium text-gray-800">
                {contact.name}
              </p>

              <p className="text-center text-gray-600">{contact.email}</p>

              <p className="text-center text-gray-600">{contact.phone}</p>

              <div className="flex justify-center space-x-4">
                <span onClick={() => editContact(contact)}>
                  <AnimatedButton icon={FiEdit} name="Edit" />
                </span>
                <span onClick={() => handleDeleteClick(contact?._id)}>
                  <AnimatedButton icon={FiTrash} name="Delete" />
                </span>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

Dashboard.propTypes = {
  onLogout: PropTypes.func,
};

export default Dashboard;
