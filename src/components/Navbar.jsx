"use client";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  LogOut,
  User,
  ChevronDown,
  ShoppingCart,
  Tractor,
  Settings,
  UserCircle,
} from "lucide-react";

function Navbar({ currentUser, scrolled = false }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled
          ? "bg-white text-gray-800 shadow-md"
          : "bg-gradient-to-r from-green-700 to-emerald-800 text-white"
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold group"
        >
          <Leaf
            className={`h-6 w-6 ${
              scrolled ? "text-green-600" : "text-white"
            } group-hover:text-green-400 transition-colors duration-200`}
          />
          <span
            className={`${
              scrolled ? "text-gray-800" : "text-white"
            } group-hover:text-green-300 transition-colors duration-200`}
          >
            AgriKonnect
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <div className="flex items-center">
              {/* Welcome message with user name */}
              <div
                className={`hidden md:flex items-center mr-4 ${
                  scrolled ? "text-gray-700" : "text-white"
                }`}
              >
                <span className="font-medium">Welcome: </span>
                <span className="ml-1 font-bold">
                  {currentUser.name || "User"}
                </span>
              </div>

              {/* Role badge */}
              <div className="hidden md:flex items-center mr-4">
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
                    currentUser.role === "farmer"
                      ? scrolled
                        ? "bg-green-100 text-green-800"
                        : "bg-green-800 text-green-100"
                      : scrolled
                      ? "bg-blue-100 text-blue-800"
                      : "bg-blue-800 text-blue-100"
                  }`}
                >
                  {currentUser.role === "farmer" ? (
                    <Tractor className="h-3 w-3 mr-1" />
                  ) : (
                    <ShoppingCart className="h-3 w-3 mr-1" />
                  )}
                  {currentUser.role === "farmer" ? "Farmer" : "Consumer"}
                </div>
              </div>

              {/* User dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className={`flex items-center space-x-1 py-2 px-3 rounded-lg ${
                    scrolled
                      ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      : "bg-white/10 text-white hover:bg-white/20"
                  } transition-all duration-200`}
                >
                  <UserCircle className="h-5 w-5" />
                  <span className="hidden sm:inline">My Account</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-xl overflow-hidden z-20 transition-all duration-200 transform origin-top-right">
                    <div className="py-2">
                      {/* User info section */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {currentUser.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {currentUser.email}
                        </p>
                      </div>

                      {/* Navigation links */}
                      <Link
                        to={
                          currentUser.role === "farmer"
                            ? "/farmer-dashboard"
                            : "/consumer-dashboard"
                        }
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {currentUser.role === "farmer" ? (
                          <Tractor className="h-4 w-4 mr-2 text-green-600" />
                        ) : (
                          <ShoppingCart className="h-4 w-4 mr-2 text-blue-600" />
                        )}
                        Dashboard
                      </Link>

                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2 text-gray-600" />
                        My Profile
                      </Link>

                      <div className="border-t border-gray-100 mt-1"></div>

                      <button
                        onClick={() => {
                          handleLogout();
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className={`py-2 px-4 ${
                  scrolled
                    ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    : "bg-white/10 text-white hover:bg-white/20"
                } rounded-lg transition-all duration-200 flex items-center`}
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Link>
              <Link
                to="/signup"
                className={`py-2 px-4 ${
                  scrolled
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-green-500 hover:bg-green-600"
                } text-white rounded-lg transition-colors`}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
