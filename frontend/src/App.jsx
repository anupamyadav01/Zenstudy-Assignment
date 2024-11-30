import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/user/Login";
import Dashboard from "./pages/Dashboard";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const LoggedInUserContext = createContext(null);
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:10000/api/user/getLoggedInUser",
          {
            withCredentials: true,
          }
        );
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
