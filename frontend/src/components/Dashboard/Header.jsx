/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { LoggedInUserContext } from "../../App";
import axiosInstance from "../../../axiosConfig";

const Header = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const navigate = useNavigate();

  const logoutUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/user/logout`, {});
      if (response.status === 200) {
        toast.success("User logged out successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="shadow-md fixed top-0 z-50 px-4 py-3 w-full bg-white">
      <Toaster />
      <div className="w-full flex items-center justify-between gap-4">
        {/* User Greeting */}
        <div className="text-gray-800 font-medium text-sm sm:text-xl">
          Hii, <span className="capitalize">{loggedInUser?.name}</span>!
        </div>

        {/* Search Bar */}

        {/* User Profile & Logout */}
        <div className="flex items-center gap-2 sm:gap-6">
          {/* User Avatar */}
          <div className="flex-grow">
            <Search />
          </div>
          <img
            src={
              loggedInUser?.image ||
              "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
            }
            alt={loggedInUser?.name}
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover hover:scale-105 duration-200 ease-out"
          />

          {/* Logout Button */}
          <button
            className="flex items-center justify-center p-2 bg-gray-200 rounded-full text-gray-800 hover:bg-gray-300 sm:px-3 sm:py-2 sm:gap-2"
            onClick={logoutUser}
          >
            <FaSignOutAlt />
            <span className="hidden sm:block font-medium">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

const Search = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div
      className={`relative flex items-center w-full sm:w-full max-w-80 transition-all duration-300 ease-in-out bg-gray-200 rounded-full overflow-hidden`}
      style={{ height: "42px" }}
    >
      {/* Search Input */}
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="bg-transparent text-gray-800 placeholder-gray-500 px-4 w-full focus:outline-none"
        placeholder="Search here..."
      />

      {/* Search Icon */}
      <div className="p-3 cursor-pointer absolute right-0">
        <FaSearch className="text-gray-600" />
      </div>
    </div>
  );
};

export default Header;
