/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import AnimatedButton from "./AnimatedButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { LoggedInUserContext } from "../../App";

const Header = ({ onLogout }) => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const navigate = useNavigate();
  const logoutUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:10000/api/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("User logged out successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className=" shadow-md fixed top-0 z-50 px-4 py-3 w-full bg-white">
      <Toaster />
      <div className="w-full flex items-center justify-between">
        <div className="text-xl font-medium text-gray-800">
          Hii, {loggedInUser?.name}!
        </div>
        <Search />
        <div className="flex items-center justify-center gap-4">
          <img
            src={loggedInUser?.image}
            alt={loggedInUser?.name}
            className="h-12 w-12 rounded-full object-cover hover:scale-105 duration-200 ease-out"
          />
          <span onClick={logoutUser}>
            <AnimatedButton
              icon={FaSignOutAlt}
              name="Logout"
              onLogout={onLogout}
            />
          </span>
        </div>
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
