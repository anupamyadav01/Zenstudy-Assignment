import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/user/Login";
import Dashboard from "./pages/Dashboard";
import { createContext, useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";

export const LoggedInUserContext = createContext(null);
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const response = await axiosInstance.get("/user/getLoggedInUser");
        if (response.status === 200) {
          setLoggedInUser(response.data.user);
        } else {
          setLoggedInUser(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
      <LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </LoggedInUserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
