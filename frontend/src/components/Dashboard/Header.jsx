/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import AnimatedButton from "./AnimatedButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Header = ({ onLogout }) => {
  const navigate = useNavigate();
  const logoutUser = async (e) => {
    e.preventDefault();
    console.log("logout");
    try {
      const response = await axios.post(
        `http://localhost:10000/api/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("User logged out successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const userName = "Alice Johnson";
  return (
    <nav className=" shadow-md fixed top-0 z-50 px-4 py-3 w-full bg-white">
      <Toaster />
      <div className="w-full flex items-center justify-between">
        <div className="text-xl font-medium text-gray-800">
          Hii, {userName}!
        </div>
        <Search />
        <span onClick={logoutUser}>
          <AnimatedButton
            icon={FaSignOutAlt}
            name="Logout"
            onLogout={onLogout}
          />
        </span>
      </div>
    </nav>
  );
};

const Search = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div
      className="flex items-center w-80 bg-gray-200 rounded-full overflow-hidden"
      style={{ height: "42px" }}
    >
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="bg-transparent text-gray-800 placeholder-gray-500 px-4 w-full focus:outline-none"
        placeholder="Search here..."
      />
      <div className="p-3">
        <FaSearch className="text-gray-600 cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
