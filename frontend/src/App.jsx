import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/user/Login";
import Dashboard from "./pages/Dashboard";
import { createContext, useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";

export const LoggedInUserContext = createContext(null);
export const ContactsContext = createContext(null);

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axiosInstance.get("/contact/getAllContact");
        setContacts(response?.data);
      } catch (error) {
        console.log("Error getting contacts", error);
      }
    };
    fetchContacts();
  }, []);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const response = await axiosInstance.get("/user/getLoggedInUser");
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setLoggedInUser(response.data.user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (!loggedInUser) {
      getLoggedInUser();
    } else {
      setLoading(false);
    }
  }, [loggedInUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <ContactsContext.Provider value={{ contacts, setContacts }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                loggedInUser ? (
                  <Dashboard contacts={contacts} setContacts={setContacts} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </ContactsContext.Provider>
      </LoggedInUserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
