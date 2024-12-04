/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { PropTypes } from "prop-types";
import AnimatedButton from "../components/Dashboard/AnimatedButton";
import Header from "../components/Dashboard/Header";
import { FaPlus } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import AddContact from "../components/Dashboard/AddContact";
import axiosInstance from "../../axiosConfig";
import { ContactsContext, LoggedInUserContext } from "../App";

const Dashboard = ({ onLogout }) => {
  const [showAddContact, setShowAddContact] = useState(false);
  const { contacts, setContacts } = useContext(ContactsContext);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const toggleAddContact = () => {
    setShowAddContact(!showAddContact);
  };

  const deleteContact = async (id) => {
    try {
      await axiosInstance.delete(`/contact/deleteContact/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
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
      <Header onLogout={onLogout} />

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
            Welcome, {loggedInUser?.name}!
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Manage your contacts efficiently with our dashboard.
          </p>
        </section>

        <section className="flex justify-between items-center mb-6">
          <h2 className="text-xl   sm:text-3xl font-semibold text-gray-700 text-center">
            Your Contacts
          </h2>
          <div onClick={toggleAddContact}>
            <AnimatedButton icon={FaPlus} name="Add Contact" />
          </div>
        </section>

        <section className="space-y-6">
          {contacts.length > 0 && (
            <div className="hidden sm:grid grid-cols-5 items-center text-center bg-gray-200 p-4 px-10 rounded-t-lg text-gray-700 font-semibold">
              <span>Profile Picture</span>
              <span>Name</span>
              <span>Email</span>
              <span>Phone</span>
              <span>Actions</span>
            </div>
          )}

          {contacts?.length > 0 ? (
            contacts?.map((contact, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-5 items-center bg-white shadow p-4 rounded-lg border-b border-gray-200"
              >
                <div className="flex justify-center">
                  <img
                    src={
                      contact?.image ||
                      "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
                    }
                    alt={contact.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </div>

                {/* Name */}
                <p className="text-center text-lg font-medium text-gray-800 hidden sm:block">
                  {contact.name}
                </p>
                <p className="text-sm text-gray-600 sm:hidden font-medium text-center py-2">
                  <span className="flex gap-3 items-center justify-center flex-col">
                    <span>{contact.name}</span>
                    <span className="flex gap-4 mb-2">
                      <span>{contact.email}</span>
                      <span>{contact.phone}</span>
                    </span>
                  </span>
                </p>

                {/* Email */}
                <p className="text-center text-gray-600 hidden sm:block">
                  {contact.email}
                </p>

                {/* Phone */}
                <p className="text-center text-gray-600 hidden sm:block">
                  {contact.phone}
                </p>

                {/* Actions */}
                <div className="flex justify-center space-x-4">
                  <span onClick={() => editContact(contact)}>
                    <FiEdit className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl" />
                  </span>
                  <span onClick={() => handleDeleteClick(contact?._id)}>
                    <FiTrash className="text-red-500 hover:text-red-700 cursor-pointer text-xl" />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center">
              <img
                src="https://img.freepik.com/premium-vector/flat-vector-no-data-search-error-landing-concept-illustration_939213-964.jpg"
                alt={"No data found"}
                className="h-auto w-96 object-cover"
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

Dashboard.propTypes = {
  onLogout: PropTypes.func,
};

export default Dashboard;
