/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AnimatedButton from "../components/Dashboard/AnimatedButton";
import Header from "../components/Dashboard/Header";
import { FaPlus } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import AddContact from "../components/Dashboard/AddContact";
import axios from "axios";

const Dashboard = ({ onLogout }) => {
  const [showAddContact, setShowAddContact] = useState(false);
  const [contacts, setContacts] = useState([]);
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
        console.log(response);
        setContacts(response?.data);
      } catch (error) {
        console.log("Error getting contacts", error);
      }
    };
    fetchContacts();
  }, []);

  console.log(contacts);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} onLogout={onLogout} />

      <main className="p-6 mt-16 z-10 relative">
        {showAddContact && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <AddContact setShowAddContact={setShowAddContact} />
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
                  className="h-20 w-20 rounded-full object-cover"
                />
              </div>

              <p className="text-center text-lg font-medium text-gray-800">
                {contact.name}
              </p>

              <p className="text-center text-gray-600">{contact.email}</p>

              <p className="text-center text-gray-600">{contact.phone}</p>

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
