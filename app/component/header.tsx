import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { MdPerson4 } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Ref for dropdown
  const router = useRouter();

  useEffect(() => {
    const emailCookie = Cookies.get("email");
    setIsLoggedIn(!!emailCookie);
  }, []);

  const handleLogout = () => {
    Cookies.remove("email");
    Cookies.remove("Name");
    setIsLoggedIn(false);
    alert("You have successfully logged out.");
    router.push("/component/homepage");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} />
      <header className="flex items-center justify-between p-4 bg-white shadow-md fixed top-0 left-0 w-full z-50 h-20">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Sadaksewa Logo" width={150} height={60} />
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="/component/LoggedIn"
            className="text-gray-700 hover:text-orange-600 text-lg"
          >
            Home
          </a>
          <Link
            href="/component/services"
            className="text-gray-700 hover:text-orange-600 text-lg"
          >
            Services
          </Link>

          <Link
            href="/component/about"
            className="text-gray-700 hover:text-orange-600 text-lg"
          >
            About
          </Link>

          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="text-gray-700 hover:text-orange-600 text-lg flex items-center"
              >
                <MdPerson4 className="h-8 w-8" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Link href={"/component/profile"}>
                    <button
                      onClick={() => router.push("/profile")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                  </Link>
                  <button
                    onClick={() => router.push("/component/history")}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    History
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/component/login"
              className="px-5 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-lg"
            >
              Login
            </Link>
          )}
        </nav>

        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-md py-4 z-50">
            <nav className="flex flex-col items-center space-y-4">
              <a
                href="/component/homepage/HomeNotLoggedIn"
                className="text-gray-700 hover:text-orange-600 text-lg"
              >
                Home
              </a>
              <Link
                href="/component/services"
                className="text-gray-700 hover:text-orange-600 text-lg"
              >
                Services
              </Link>
              <Link
                href="/component/about"
                className="text-gray-700 hover:text-orange-600 text-lg"
              >
                About
              </Link>

              {isLoggedIn ? (
                <button
                  onClick={() => router.push("/profile")}
                  className="text-gray-700 hover:text-orange-600 text-lg"
                >
                  Profile
                </button>
              ) : (
                <Link
                  href="/component/login"
                  className="px-5 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-lg"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
